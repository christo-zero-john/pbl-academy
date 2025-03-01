/**
 * Mentor object in Backend
 */

import { createClient } from "./Supabase";

class Mentor {
  constructor() {
    if (!Mentor.instance) {
      Mentor.instance = this;
    }
    return Mentor.instance;
  }

  async createCourse(course) {
    const Supabase = await createClient();
    const userSession = await Supabase.auth.getSession();
    console.log(userSession.data.session.user);
    const { data, error } = await Supabase.from("courses")
      .insert([
        {
          ...course,
        },
      ])
      .select("*");

    if (error) {
      return {
        success: false,
        error: error,
      };
    } else {
      return {
        success: true,
        data: data[0],
      };
    }
  }
}

export default new Mentor();
