import Supabase from "./Supabase";

class Course {
  constructor() {
    if (!Course.instance) {
      Course.instance = this;
    }
    return Course.instance;
  }

  async fetchCourses(filters) {
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
        .eq("id", "485e2dfb-5810-42d6-b711-c06e219f13f0");
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
