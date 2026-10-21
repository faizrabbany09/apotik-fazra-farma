import { redirect } from 'next/navigation';

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolved = await searchParams;
  const q = resolved.q || resolved.search || '';
  if (q) {
    redirect(`/produk?q=${encodeURIComponent(String(q))}`);
  }
  redirect('/produk');
}
