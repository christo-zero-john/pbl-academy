import { createClient } from "./Supabase";

/**
 * Class to handle course related functionalities in backend
 */
class Classroom {
  constructor() {
    if (!Classroom.instance) {
      Classroom.instance = this;
    }
    return Classroom.instance;
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
          data: data[0],
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

  async fetchClassroomTasks(classroom_id) {
    try {
      const Supabase = await createClient();
      await Supabase.auth.getSession();
      const { data, error } = await Supabase.from("classrooms")
        .select(`*, enrollments(*)`)
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
}

export default new Classroom();