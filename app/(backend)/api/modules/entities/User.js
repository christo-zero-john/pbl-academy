/**
 * User object in backend
 */

import { createClient } from "./Supabase";

class User {
  constructor() {
    if (!User.instance) {
      User.instance = this;
    }
    return User.instance;
  }

  async signup(email, password) {
    const Supabase = await createClient();
    const { data, error } = await Supabase.auth.signUp({ email, password });

    return { data, error };
  }

  async login(email, password, request) {
    try {
      const Supabase = await createClient();
      const { data, error } = await Supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (!error) {
        console.log("Login success");

        const getUserStatus = await this.getUserFromDb(data.user.id);

        if (getUserStatus.success) {
          return {
            success: true,
            data: data,
            userData: getUserStatus.data,
          };
        } else {
          console.log("Some unexpected error occurred: ", getUserStatus.error);
          return {
            success: false,
            error: getUserStatus.error,
          };
        }
      } else {
        return {
          success: false,
          error: error,
        };
      }
    } catch (error) {
      console.log("500: Internal Server Error: ", error);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  /**
   * Method to fetch user form public.schemas table.
   * If user does not exists, registers the user and returns the data.
   * @param {*} userId ID of user to be fetched
   * @returns an object(row) of user data with the same user ID.
   */
  async getUserFromDb(userId) {
    console.log("Fetching from database, User data of user with Id: ", userId);

    const Supabase = await createClient();

    const { data, error } = await Supabase.from("users")
      .select("*")
      .eq("id", userId);
    if (error) {
      return { success: false, error: error };
    } else if (data.length == 1) {
      console.log("User Already Registered: ");
      return {
        success: true,
        data: data[0],
      };
    } else if (data.length == 0) {
      // User Not Registered yet
      let response = await this.registerUserToDb();
      if (response.success) {
        console.log("Registered User Successfully.");
        return {
          success: true,
          data: null,
        };
      }
    } else {
      // Unexpected error. Either multiple records returned or something else.
      console.log("Unexpected Error Occured: ", error);
      return {
        success: false,
        error: new Error("500: Unexpected Error occured."),
      };
    }
  }

  async registerUserToDb() {
    console.log("User yet to be registered. Registering/Saving User to DB...");

    const Supabase = await createClient();
    const { data, error } = await Supabase.auth.getUser();

    if (error) {
      return {
        succes: false,
        error: error,
      };
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
        return {
          success: false,
          error: response.error,
        };
      } else {
        console.log("Sucessfully registered user: ", data.user.email);

        return {
          success: true,
          data: response.data,
        };
      }
    }
  }
}

export default new User();
