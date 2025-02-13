import { Supabase } from "@/modules/entities/Supabase";
import { redirect } from "next/navigation";

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

  static async checkLogin() {
    const supabase = new Supabase();
    const {
      data: { session },
      error,
    } = await supabase.client.auth.getSession();

    if (error) {
      console.error("Error checking login status:", error.message);
      return { status: null, error: error };
    }

    if (session) {
      console.log("User logged in");
      return { status: 1, user: session.user };
    }

    return { status: 0, user: null };
  }

  static async checkAuth() {
    const authStatus = await this.checkLogin();

    if (authStatus.error) {
      console.log("Error checking login status:", authStatus.error);
      window.confirm("Error checking login status:" + error.message);
    } else if (authStatus.status === 0) {
      redirect("/auth/login/");
    } else if (authStatus.status === 1) {
      console.log("User is logged in");
      return { status: authStatus.status, user: authStatus.user };
    }
  }
}
