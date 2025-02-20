import Supabase from "@/app/api/modules/entities/Supabase";

// User in frontend

class User {
  constructor() {}

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
      const { data, error } = await Supabase.auth.getSession(session);
      if (error) {
        return { success: false, error: error };
      }
      return { success: true, session: data };
    } catch (error) {
      return { success: false, error: error };
    }
  }

  async getUser() {
    try {
      const { data, error } = await Supabase.auth.getUser();
      if (error) {
        return { success: false, error: error };
      }
      return { success: true, user: data };
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
