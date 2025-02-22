/**
 * Mentor object in Backend
 */

import Supabase from "./Supabase";

class Mentor {
  constructor() {
    if (!Mentor.instance) {
      Mentor.instance = this;
    }
    return Mentor.instance;
  }

  async createCourse(course) {
    console.log(await Supabase.auth.getUser())
    const { data, error } = await Supabase.from("courses")
      .insert([
        {
          ...course,
        },
      ])
      .select("*");

    if (error) {
      return { success: false, error: error };
    } else {
      return { success: true, data: data };
    }
  }
}

export default new Mentor();
