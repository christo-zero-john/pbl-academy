import { Mentor } from "./Mentor";
import { Supabase } from "./Supabase";
import { User } from "./User";

export class Admin extends Mentor {
  static async checkAdmin() {
    const loginStatus = await User.checkLogin();
    if (loginStatus.status == 0) {
      console.log("User Not Logged In");
      return { status: 0, error: loginStatus.error };
    } else {
      console.log("User Logged In");
      const userData = loginStatus.user.user_metadata;
      if (userData.role.includes("admin")) {
        console.log("User is an admin");
        return { status: 1, data: null };
      } else {
        console.log("User is not an admin");
        return { status: 2, data: null };
      }
    }
  }

  static async getAllUsers() {
    const supabase = new Supabase();
    const { data: users, error } = await supabase.client
      .from("users")
      .select(`*`);

    if (error) {
      console.error("Error getting users:", error.message);
      return { status: 0, error: error };
    } else {
      return { status: 1, data: users };
    }
  }
}
