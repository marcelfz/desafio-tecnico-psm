// components/NewsForm.tsx
'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import RichTextEditor from './RichTextEditor';
import { News } from '@/types/news';
import { MdOutlineDriveFolderUpload } from "react-icons/md";

interface NewsFormProps {
  initialData?: News;
}

function getCookie(name: string): string | null {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
  return null;
}

export default function NewsForm({ initialData }: NewsFormProps) {
  const router = useRouter();
  const isEditing = !!initialData;

  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [content, setContent] = useState(initialData?.content || '');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(
    initialData?.image || null
  );
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [saving, setSaving] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    setErrors({});

    try {
      const token = getCookie('token');
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('content', content);
      if (imageFile) formData.append('image', imageFile);

      const url = isEditing
        ? `${process.env.NEXT_PUBLIC_API_URL}/news/${initialData!.uuid}`
        : `${process.env.NEXT_PUBLIC_API_URL}/news`;

      if (isEditing) formData.append('_method', 'PUT');

      const res = await fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        setErrors(errorData.errors || {});
        setSaving(false);
        return;
      }

      router.push('/admin');
    } catch (err) {
      console.error(err);
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-5">
      <div>
        <label className="block text-sm font-medium text-stone-700 mb-1">
          Título
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full px-3 py-2 border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
        />
        {errors.title && (
          <p className="text-sm text-red-600 mt-1">{errors.title[0]}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-stone-700 mb-1">
          Descrição
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          rows={3}
          className="w-full px-3 py-2 border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 resize-none"
        />
        {errors.description && (
          <p className="text-sm text-red-600 mt-1">{errors.description[0]}</p>
        )}
      </div>

      <div>
          <label className="block text-sm font-medium text-stone-700 mb-2">
            Imagem de capa
          </label>

          {imagePreview && (
            <img
              src={imagePreview}
              alt="Pré-visualização"
              className="w-full h-48 object-cover rounded-lg mb-3 border border-stone-200"
            />
          )}

          <label
            htmlFor="file-upload"
            className="inline-flex items-center gap-2 px-4 py-2.5 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 hover:border-slate-400 cursor-pointer active:scale-[0.98] transition-all"
          >
            <MdOutlineDriveFolderUpload className='size-5' />
            <span>Escolher imagem</span>
          </label>

          <input
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="sr-only"
          />

          {errors.image && (
            <p className="text-sm text-red-600 mt-2">{errors.image[0]}</p>
          )}
        </div>

      <div>
        <label className="block text-sm font-medium text-stone-700 mb-1">
          Conteúdo
        </label>
        <RichTextEditor content={content} onChange={setContent} />
        {errors.content && (
          <p className="text-sm text-red-600 mt-1">{errors.content[0]}</p>
        )}
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={() => router.push('/admin')}
          className="px-4 py-2 text-sm rounded-lg border border-stone-300 hover:bg-stone-50 transition text-gray-500"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={saving}
          className="px-5 py-2 text-sm rounded-lg bg-emerald-700 text-white hover:bg-emerald-800 transition disabled:opacity-50"
        >
          {saving ? 'Salvando...' : isEditing ? 'Salvar alterações' : 'Publicar notícia'}
        </button>
      </div>
    </form>
  );
}