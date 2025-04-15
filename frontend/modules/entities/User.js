import { createClient } from "./Supabase";

// User in frontend

class User {
  constructor() {
    (async () => {
      await this.setUser();
      if (!User.instance) {
        this.instance = this;
      }
      if (this.user) {
        console.log("User session found");
      } else {
        console.log("User session not found");
      }
      return User.instance;
    })();
  }

  async getUser() {
    /** comment
     * setTimeout only returns a timeout ID, so we should wrap it inside and resolve as a promise to get a desired outcome of delaying.
     */
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.user);
      }, 200);
    });
  }

  async login(formData) {
    const Supabase = createClient();
    try {
      const request = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      };

      const response = await fetch("/api/auth/login", request);
      const data = await response.json();
      console.log(data);

      if (!data.success) {
        return {
          success: false,
          error: data.error,
        };
      } else {
        if (data.session) {
          console.log("Login success. Setting session");
          await Supabase.auth.setSession(data.session);
          console.log("user data: ", data.userData);
          console.log("Updating user");
          await Supabase.auth.updateUser({
            data: data.userData,
          });
          console.log("Refreshing user session");
          await Supabase.auth.refreshSession();
          this.setUser();
          return {
            success: true,
            data: "User logged in successfully",
          };
        } else {
          return {
            success: false,
            error: new Error(
              "Failed to fetch user session. Try again or contact support if this issue persists"
            ),
          };
        }
      }
    } catch (error) {
      return {
        success: false,
        error: error,
      };
    }
  }

  /**
   * Check whether user is loggedin or not
   * @returns Boolean
   */
  isLoggedIn() {
    if (this.user) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Check whether user is a mentor or not
   * @returns Boolean
   */
  isMentor() {
    if (this.isLoggedIn && this.user.roles.includes("mentor")) {
      return true;
    } else {
      return false;
    }
  }

  async setSession(session) {
    const Supabase = createClient();
    try {
      const { data, error } = await Supabase.auth.setSession(session);
      if (error) {
        return {
          success: false,
          error: error,
        };
      }
      return {
        success: true,
        session: data,
      };
    } catch (error) {
      return {
        success: false,
        error: error,
      };
    }
  }

  async getSession() {
    console.log("Searching session");
    const Supabase = createClient();
    try {
      const { data, error } = await Supabase.auth.getSession();
      // console.log("get session: ", data, error);
      if (error) {
        console.log("Error while fetching user session");
        return {
          success: false,
          error: error,
        };
      } else {
        this.user = data.session.user;
        this.user.session_token = data.session.access_token;

        return {
          success: true,
          session: data.session,
        };
      }
    } catch (error) {
      console.log(
        "Internal client (Frontend) error while fetching user session"
      );
      return {
        success: false,
        error: error,
      };
    }
  }

  async setUser() {
    console.log("Searching for user...");
    if (!this.user) {
      await this.getSession();
      // this.user is set in this.getSession()
      if (!this.user) {
        console.log(
          "Either no user found in session or failed to set user in user.getSession"
        );
        this.user = null;
      }
    }
  }

  async logout() {
    const Supabase = createClient();
    try {
      const { data, error } = await Supabase.auth.signOut();
      if (error) {
        return {
          success: false,
          error: error,
        };
      }
      return {
        success: true,
        data: data,
      };
    } catch (error) {
      return {
        success: false,
        error: error,
      };
    }
  }
}

export default new User();
// User object in frontend
