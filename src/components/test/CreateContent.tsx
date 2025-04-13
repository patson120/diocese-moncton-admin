// pages/create-content.js
import { FormEventHandler, useState } from 'react';
import RichTextEditor from './RichTextEditor';

export default function CreateContent() {
  const [content, setContent] = useState('<p>Commencez à écrire ici...</p>');
  const [title, setTitle] = useState('');

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // Envoyer le contenu à votre API
    console.log({ title, content });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Créer un nouveau contenu</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2">Titre</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Contenu</label>
          <RichTextEditor value={content} onChange={setContent} />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Enregistrer
        </button>
      </form>
    </div>
  );
}