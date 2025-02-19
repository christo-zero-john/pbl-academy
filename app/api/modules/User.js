

import { Supabase } from "./Supabase";

export class User {
  static async signUp(formData) {
    // This method is used to create a new user account with email and password
    try {
      console.log("Creating New User Account with: ", formData);
      const email = formData.email;
      const password = formData.password;
      const supabase = new Supabase();

      const { data, error } = await supabase.client.auth.signUp({
        email,
        password,
      });

      if (error) {
        return { status: 0, error: error };
      } else {
        return { status: 1, data: data };
      }
    } catch (error) {
      return { status: 0, error: error };
    }
  }
}
