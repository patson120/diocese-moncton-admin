"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import { MenuBar } from "./menu-bar";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";

export function TiptapEditor() {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      TextStyle,
      Color,
      Highlight,
      Link,
      Image.configure({
        HTMLAttributes: {
          class: 'mx-auto max-w-full',
        },
      }),
    ],
    content: "<p>Commencez à écrire...</p>",
    editorProps: {
      attributes: {
        class: "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[500px] p-4",
      },
    },
  });

  return (
    <div className="w-full max-w-4xl mx-auto">
      <MenuBar editor={editor} />
      <div className="border border-input bg-card rounded-b-md">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}