"use client";

import { useState, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Image from "@tiptap/extension-image";
import { MenuBar } from "./menu-bar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ImageDialog } from "./image-dialog";

interface NewsItem {
  id: string;
  title: string;
  content: string;
  coverImage: string;
  createdAt: string;
}

export function NewsEditor() {
  const [title, setTitle] = useState("");
  const [coverImage, setCoverImage] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Image.configure({
        HTMLAttributes: {
          class: "mx-auto max-w-full rounded-lg",
        },
      }),
    ],
    content: "",
    editorProps: {
      attributes: {
        class: "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[300px] p-4",
      },
    },
  });

  const handleImageUpload = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleCoverImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = await handleImageUpload(file);
      setCoverImage(imageUrl);
    }
  };

  const handleEditorImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && editor) {
      const imageUrl = await handleImageUpload(file);
      editor.chain().focus().setImage({ src: imageUrl }).run();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const newsData: NewsItem = {
        id: crypto.randomUUID(),
        title,
        content: editor?.getHTML() || "",
        coverImage,
        createdAt: new Date().toISOString(),
      };

      // Récupérer les actualités existantes
      const existingNews = JSON.parse(localStorage.getItem("news") || "[]");
      
      // Ajouter la nouvelle actualité
      localStorage.setItem("news", JSON.stringify([newsData, ...existingNews]));

      // Reset form
      setTitle("");
      setCoverImage("");
      editor?.commands.setContent("");

      alert("Actualité publiée avec succès !");
    } catch (error) {
      console.error("Error saving news:", error);
      alert("Erreur lors de la publication de l'actualité");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Titre de l'actualité</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Entrez le titre..."
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="coverImage">Image de couverture</Label>
        <Input
          id="coverImage"
          type="file"
          accept="image/*"
          onChange={handleCoverImageChange}
          className="cursor-pointer"
        />
        {/* {coverImage && (
          <div className="mt-2">
            <img
              src={coverImage}
              alt="Aperçu de l'image de couverture"
              className="max-h-48 rounded-lg"
            />
          </div>
        )} */}
      </div>

      <div className="space-y-2">
        <Label>Contenu</Label>
        <div className="border rounded-lg overflow-hidden">
          <MenuBar editor={editor} onImageUpload={handleEditorImageUpload} />
          <EditorContent editor={editor} className="min-h-[300px]" />
        </div>
      </div>

      <Button 
        type="submit" 
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Publication en cours..." : "Publier l'actualité"}
      </Button>
    </form>
  );
}