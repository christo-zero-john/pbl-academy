/**
 * User in backend
 */

import Supabase from "./Supabase";

class User {
  constructor() {
    if (!User.instance) {
      User.instance = this;
    }
    return User.instance;
  }

  async signup(email, password) {
    const { data, error } = await Supabase.auth.signUp({ email, password });

    return { data, error };
  }

  async login(email, password) {
    try {
      const { data, error } = await Supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (!error) {
        console.log("Login success", data.user.id);

        if (!data.user.user_metadata.role) {
          const registerStatus = await this.registerUserToDb();
        }
      }

      return { data, error };
    } catch (error) {
      console.log("Internal Server Error: ", error);
      throw new Error(error.message);
    }
  }

  async getUserData(userId) {
    console.log("Fetching from database, User data of user with Id: ", userId);

    const { data, error } = await Supabase.from("users")
      .select("*")
      .eq("id", userId);
    if (error) {
      return { success: false, error: error };
    } else {
      return { success: true, data: data };
    }
  }

  async registerUserToDb() {
    console.log("User yet to be registered. Registering/Saving User to DB...");
    const { data, error } = await Supabase.auth.getUser();

    console.log(data);
    if (error) {
      return { succes: false, error: error };
    } else {
      const userId = data.user.id;
      const { data, error } = await Supabase.from("users").insert([
        {
          id: userId,
          role: "user",
        },
      ]);
    }
  }
}

export default new User();
