import { createClient } from "./Supabase";

// User in frontend

class User {
  constructor() {
    (async () => {
      await this.setUser();
      if (!User.instance) {
        this.instance = this;
      }
      return User.instance;
    })();
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
          await Supabase.auth.updateUser({
            data: data.userData,
          });
          await Supabase.auth.refreshSession();
          this.user = data.session.user;
          this.user.access_token = data.session.access_token;
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
    const Supabase = createClient();
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

  async setUser() {
    const getSessionStatus = await this.getSession();
    if (getSessionStatus.success) {
      this.user = getSessionStatus.session.user;
      this.user.session_token = getSessionStatus.session.access_token;
    } else {
      this.user = null;
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
