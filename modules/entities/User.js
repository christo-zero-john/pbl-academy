import { Supabase } from "@/modules/entities/Supabase";
import { redirect } from "next/navigation";

export class User {
  // This class is used to handle all user related functionalities
  constructor() {
    let loginStatus = this.checkLogin();
    this.user = loginStatus.user;
  }

  static async signUp(email, password) {
    // This method is used to create a new user account with email and password
    const supabase = new Supabase();
    const { data, error } = await supabase.client.auth.signUp({
      email,
      password,
    });
    return { data, error };
  }

  static async saveUser() {
    // This method is used to save the user data to the user table
    const supabase = new Supabase();
    console.log("Saving userdata to user table");
    let loginStatus = await this.checkLogin();
    console.log(loginStatus);
    let user = null;
    if ((await loginStatus).status == 1) {
      user = loginStatus.user;
    }
    let { data, error } = await supabase.client
      .from("users")
      .insert({ id: user.id, role: "user", email: user.email });

    return { data, error };
  }

  static async login(email, password) {
    // This method is used to login a user with email and password
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
    // This method checks whether a user is logged in or not
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
    // This method checks for the login status of a user and if not logged in redirects to the login page
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
