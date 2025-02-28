import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

class Supabase {
  constructor() {
    if (!Supabase.instance) {
      this.supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        {
          cookies: {
            getAll() {
              return cookies().getAll();
            },
            setAll(cookiesToSet) {
              try {
                cookiesToSet.forEach(({ name, value, options }) =>
                  cookies().set(name, value, options)
                );
              } catch {
                // This error may occur when the method is called from a Server Component.
                // It can be safely ignored if you have middleware handling user sessions.
              }
            },
          },
        }
      );
      Supabase.instance = this;
    }
    return Supabase.instance;
  }

  getClient() {
    return this.supabase;
  }
}

export default new Supabase().getClient();
