import { createBrowserClient } from "@supabase/ssr";

/**
 * Buat satu instance Supabase client untuk digunakan di Browser (Client Components).
 *
 * Cara pakai:
 *   import { createClient } from '@/lib/supabase/client';
 *   const supabase = createClient();
 *   const { data } = await supabase.from('produk').select('*');
 *
 * Pastikan variabel berikut sudah diisi di file .env.local:
 *   NEXT_PUBLIC_SUPABASE_URL=https://<your-project-ref>.supabase.co
 *   NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
