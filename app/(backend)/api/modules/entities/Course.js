import { createClient } from "./Supabase";

/**
 * Class to handle course related functionalities in backend
 */
class Course {
  constructor() {
    if (!Course.instance) {
      Course.instance = this;
    }
    return Course.instance;
  }

  async fetchCourses(filters) {
    // If the filter has an id, it will return the course with that id using fetchCourseById method
    if (filters.id) {
      return this.fetchCourseById(filters.id);
    }

    try {
      const Supabase = await createClient();
      if (!filters.created_by) {
        filters.published = true;
      }
      await Supabase.auth.getSession();
      const { data, error } = await Supabase.from("courses")
        .select(
          `
            id,
            title,
            published,
            created_by (
              id,
              first_name,
              last_name
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
      // Catch unexpected errors
      console.log("Internal Server Error: ", error);
      return {
        success: false,
        error: {
          message:
            `Internal Server Error: ${error.message}` ||
            "Something went wrong. Internal Server Error. Please Contact Support",
        },
      };
    }
  }

  async fetchCourseById(id) {
    try {
      const Supabase = await createClient();
      const userSession = await Supabase.auth.getSession();
      const { data, error } = await Supabase.from("courses")
        .select(
          `
        id,
        title,
        published,
        description,
        created_by (*),
        tasks (*)`
        )
        .match({
          id: id,
        });
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
      // Catch unexpected errors
      console.log("Internal Server Error: ", error);
      return {
        success: false,
        error: {
          message:
            `Internal Server Error: ${error.message}` ||
            "Something went wrong. Internal Server Error. Please Contact Support",
        },
      };
    }
  }

  async fetchClassrooms(courseID) {
    try {
      const Supabase = await createClient();
      await Supabase.auth.getSession();
      const { data, error } = await Supabase.from("classrooms")
        .select(`*`)
        .eq("course_id", courseID);
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
      // Catch unexpected errors
      console.log("Internal Server Error: ", error);
      return {
        success: false,
        error: {
          message:
            `Internal Server Error: ${error.message}` ||
            "Something went wrong. Internal Server Error. Please Contact Support",
        },
      };
    }
  }

  async enrollToClassroom(enrollmentData) {
    try {
      const Supabase = await createClient();
      const userSession = await Supabase.auth.getSession();
      const { data, error } = await Supabase.from("enrollments")
        .insert(enrollmentData)
        .select("*");
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
      // Catch unexpected errors
      console.log("Internal Server Error: ", error);
      return {
        success: false,
        error: {
          message:
            `Internal Server Error: ${error.message}` ||
            "Something went wrong. Internal Server Error. Please Contact Support",
        },
      };
    }
  }
}

export default new Course();
// Course in backend
