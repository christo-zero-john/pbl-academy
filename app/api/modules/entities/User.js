import Supabase from "./Supabase";

class User {
  constructor() {}

  async signup(email, password) {
    const { data, error } = await Supabase.auth.signUp({ email, password });

    return { data, error };
  }
}

export default new User();
