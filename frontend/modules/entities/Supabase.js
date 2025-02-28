import { createBrowserClient } from "@supabase/ssr";

class Supabase {
  constructor() {
    if (!Supabase.instance) {
      this.supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
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
