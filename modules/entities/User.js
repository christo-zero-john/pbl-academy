/**
 * The @var User is used to handle all user related functions in the system. It contains various methods to handle different functionalities of normal users.
 */

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

  static async login(email, password) {
    // This method is used to login a user with email and password
    const supabase = new Supabase();

    const { data, error } = await supabase.client.auth.signInWithPassword({
      email: email,
      password: password,
    });
    return { data, error };
  }

  static async getUserData(user_id) {
    // This method is used to fetch the data of a user from the users table
    const supabase = new Supabase();
    console.log("Fetching user data from db for user with id: ", user_id);
    const { data, error } = await supabase.client
      .from("users")
      .select("*")
      .eq("id", user_id)
      .single();

    if (error) {
      if (error.code == "PGRST116") {
        return { status: 2, data: null };
      } else {
        return { status: 0, error: error };
      }
    } else {
      return { status: 1, data: data };
    }
  }

  static async checkSavedUser(user_id) {
    // This method checks whether the user data is saved in the user table or not

    const getUserDataStatus = await this.getUserData(user_id);
    console.log(getUserDataStatus);

    if (getUserDataStatus.status == 2) {
      console.log("User not saved yet... Saving user to Db");
      const saveUserStatus = await this.saveUserToDb();
      console.log(saveUserStatus);
      return { status: 1, data: saveUserStatus.data };
    } else if (getUserDataStatus.status == 1) {
      console.log("User already saved in the db");
      return { status: 1, data: getUserDataStatus.data };
    } else {
      console.log("Some error occurred");
      return { status: 0, error: getUserDataStatus.error };
    }
  }

  static async saveUserToDb() {
    // This method is used to save the user data to the user table
    const supabase = new Supabase();
    console.log("Saving userdata to user table");
    let loginStatus = await this.checkLogin();
    console.log(loginStatus);
    let user = null;
    if (loginStatus.status == 1) {
      user = loginStatus.user;
    }
    console.log(`Creating new user with: id:${user.id}, email: ${user.email}`);
    const { data, error } = await supabase.client
      .from("users")
      .insert({ id: user.id, role: "user" });

    console.log(data, error);
    if (error) {
      return { status: 0, error: error };
    } else {
      return { status: 1, data: data };
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

  /*
      static async getAllUsers() {
        // This method is used to fetch all users from database
        const supabase = new Supabase();
        console.log("Reading all users from users table");
        const { data, error } = await supabase.client.from("users").select("*");
        if (error) {
          return { status: 0, error: error };
        } else {
          return { status: 1, data: data };
        }
      }
  */
}
