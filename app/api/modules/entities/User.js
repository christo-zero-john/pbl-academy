/**
 * User in backend
 */

import Supabase from "./Supabase";

class User {
  constructor() {}

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
        console.log(data);
        const userData = await this.getUserData(data.user.id);
      }

      return { data, error };
    } catch (error) {
      console.log("Internal Server Error: ", error);
      throw new Error(error.message);
    }
  }

  async getUserData(userId) {
    console.log("Fetching from database, User data of user with Id: ", id);
  }
}

export default new User();
