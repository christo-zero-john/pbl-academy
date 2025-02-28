import Supabase from "./Supabase";

// User in frontend

class User {
  constructor() {
    (async () => {
      this.user = (await this.getUser()).user || null;
      if (this.user) {
        this.user.session_token = (
          await this.getSession()
        ).session.access_token;
      }
      if (!User.instance) {
        this.instance = this;
      }
      return User.instance;
    })();
  }

  async login(formData) {
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
          await Supabase.auth.updateUser({
            data: data.userData,
          });
          await Supabase.auth.refreshSession();
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

  async setSession(session) {
    try {
      const { data, error } = await Supabase.auth.setSession(session);
      if (error) {
        return { success: false, error: error };
      }
      return { success: true, session: data };
    } catch (error) {
      return { success: false, error: error };
    }
  }

  async getSession() {
    try {
      const { data, error } = await Supabase.auth.getSession();
      console.log("get session: ", data, error);
      if (error) {
        return {
          success: false,
          error: error,
        };
      } else {
        if (!this.user) {
          this.user = data.session.user;
          this.user.session_token = data.session.access_token;
        }
        return {
          success: true,
          session: data.session,
        };
      }
    } catch (error) {
      return {
        success: false,
        error: error,
      };
    }
  }

  async getUser() {
    try {
      const { data, error } = await Supabase.auth.getUser();
      if (error) {
        return { success: false, error: error };
      }
      return { success: true, user: data.user };
    } catch (error) {
      return { success: false, error: error };
    }
  }

  async logout() {
    try {
      const { data, error } = await Supabase.auth.signOut();
      if (error) {
        return { success: false, error: error };
      }
      return { success: true, data: data };
    } catch (error) {
      return { success: false, error: error };
    }
  }
}

export default new User();
// User object in frontend
