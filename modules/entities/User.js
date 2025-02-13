import { Supabase } from "@/modules/entities/Supabase";

export class User {
  constructor() {}

  static async signUp(email, password) {
    const supabase = new Supabase();
    let { data, error } = await supabase.client.auth.signUp({
      email,
      password,
    });
    return { data, error };
  }

  static async login(email, password) {
    const supabase = new Supabase();
    try {
      let { data, error } = await supabase.client.auth.signInWithPassword({
        email: email,
        password: password,
      });
      return { data, error };
    } catch (error) {
      return { data, error };
    }
  }

  static async checkLogin(ctx) {
    const supabase = new Supabase();
    const {
      data: { session },
      error,
    } = await supabase.client.auth.getSession();

    if (error) {
      console.error("Error checking login status:", error.message);
      return { status: 0, error };
    }

    if (session) {
      console.log("User logged in");
      if (ctx === 0) {
        return { status: 1, user: session.user };
      }
      return { status: 1, user: session.user };
    }

    console.log("User not logged in");
    if (ctx != 0) {
      window.location.href = "/auth/login";
    }
    
    return { status: 0, user: null };
  }
}

