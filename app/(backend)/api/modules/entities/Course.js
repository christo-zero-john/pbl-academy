import { createClient } from "./Supabase";

class Course {
  constructor() {
    if (!Course.instance) {
      Course.instance = this;
    }
    return Course.instance;
  }

  async fetchCourses(filters) {
    const Supabase = await createClient();
    try {
      const { data, error } = await Supabase.from("courses")
        .select(
          `
            id,
            title,
            description,
            published,
            created_by (
              id,
              first_name,
              last_name,
              username,
              role
            )`
        )
        .match(filters);
      if (error) {
        return {
          success: false,
          error: error,
        };
      } else {
        return {
          success: true,
          data: data,
        };
      }
    } catch (error) {
      console.log("Internal Server Error: ", error);
      return {
        success: false,
        error:
          `Internal Server Error: ${error.message}` ||
          "Something went wrong. Internal Server Error. Please Contact Support",
      };
    }
  }
}

export default new Course();
