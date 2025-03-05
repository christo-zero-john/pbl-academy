import { createBrowserClient } from "@supabase/ssr";

/**
 * Used to create anew supabase client in the frontend/browser
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}
