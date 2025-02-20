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
        console.log("Login success");

        if (!data.user.user_metadata.role) {
          const getUserStatus = await this.getUserFromDb(data.user.id);

          if (getUserStatus.success) {
            console.log("data", getUserStatus.data);
          }
        }
      } else {
        console.log(data.user);
      }

      return { data, error };
    } catch (error) {
      console.log("Internal Server Error: ", error);
      throw new Error(error.message);
    }
  }

  async getUserFromDb(userId) {
    console.log("Fetching from database, User data of user with Id: ", userId);

    const { data, error } = await Supabase.from("users")
      .select("*")
      .eq("id", userId);
    if (error) {
      return { success: false, error: error };
    } else if (data.length == 1) {
      console.log("User Already Registered");
      return { success: true, data: data };
    } else if (data.length == 0) {
      let response = await this.registerUserToDb();
      if (response.success) {
        console.log("Registered User: ", response.data);
      }
    } else {
      return {
        success: false,
        error: new Error("500: Unexpected Error occured."),
      };
    }
  }

  async registerUserToDb() {
    console.log("User yet to be registered. Registering/Saving User to DB...");
    const { data, error } = await Supabase.auth.getUser();

    if (error) {
      return { succes: false, error: error };
    } else {
      const userId = data.user.id;
      const response = await Supabase.from("users")
        .insert([
          {
            id: userId,
            role: "user",
          },
        ])
        .select("*");
      if (response.error) {
        console.log("Failed to insert record:", response.error.message);
        return { success: false, error: response.error };
      } else {
        console.log("Sucessfully registered user: ", data.user.email);
        let resData = {
          ...data,
          user: {
            ...data.user,
            user_metadata: {
              ...data.user.user_metadata,
              ...response.data[0],
            },
          },
        };
        return { success: true, data: resData };
      }
    }
  }
}

export default new User();
