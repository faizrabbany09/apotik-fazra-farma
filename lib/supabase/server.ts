import { createClient } from "@supabase/supabase-js";

/**
 * Buat Supabase client untuk digunakan di Server Components / Route Handlers.
 *
 * Menggunakan createClient langsung (bukan createBrowserClient dari @supabase/ssr)
 * karena konteks ini hanya berjalan di sisi server, tanpa perlu cookie management.
 *
 * Cara pakai:
 *   import { createServerClient } from '@/lib/supabase/server';
 *   const supabase = createServerClient();
 *   const { data } = await supabase.from('produk').select('*');
 */
export function createServerClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
