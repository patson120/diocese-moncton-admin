"use client"

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import Highlight from '@tiptap/extension-highlight';
import Placeholder from '@tiptap/extension-placeholder';
import React from 'react';
import { EditorToolbar } from './EditorToolbar';

export const Tiptap = () => {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        openOnClick: false,
      }),
      Image.configure({
        inline: true,
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Highlight,
      Placeholder.configure({
        placeholder: 'Commencez à écrire ou tapez "/" pour plus d\'options...',
      }),
    ],
    content: '',
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="w-full prose prose-sm max-w-none">
      <EditorToolbar editor={editor} />
      <EditorContent 
        editor={editor} 
        className="min-h-[200px] border rounded-lg p-4 focus:outline-none"
      />
      <div dangerouslySetInnerHTML={{ __html: editor.getHTML() }}></div>
    </div>
  );
};