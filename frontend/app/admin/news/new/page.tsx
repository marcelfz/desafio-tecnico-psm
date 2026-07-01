import NewsForm from '@/components/NewsForm';

export default function NewNewsPage() {
  return (
    <div>
      <h2 className="text-xl font-semibold text-stone-900 mb-6 max-w-3xl mx-auto">
        Nova notícia
      </h2>
      <NewsForm />
    </div>
  );
}