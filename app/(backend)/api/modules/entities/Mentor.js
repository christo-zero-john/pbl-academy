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
    try {
      const Supabase = await createClient();
      const userSession = await Supabase.auth.getSession();
      console.log(
        "user session fetched successfully. Current User: ",
        userSession.data.session.user.email
      );
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

  async updateCourse(course) {
    try {
      const Supabase = await createClient();
      const userSession = await Supabase.auth.getSession();
      console.log(
        "user session fetched successfully. Current User: ",
        userSession.data.session.user.email
      );
      const courseId = course.id;
      delete course.id;
      console.log("Course Data: ", course, "Course ID: ", courseId);

      const { data, error } = await Supabase.from("courses")
        .update({
          ...course,
        })
        .eq("id", courseId)
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

  async saveTasksToDB(tasks) {
    try {
      const Supabase = await createClient();
      const userSession = await Supabase.auth.getSession();
      console.log(
        "user session fetched successfully. Current User: ",
        userSession.data.session.user.email
      );

      const { data, error } = await Supabase.from("tasks").upsert(tasks);

      if (error) {
        return {
          success: false,
          error: error,
        };
      } else {
        return {
          success: true,
          data: "Successfully Inserted Tasks",
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

  async togglePublishCourse(courseID, publishedState) {
    try {
      const Supabase = await createClient();
      const userSession = await Supabase.auth.getSession();
      console.log(
        "User session fetched successfully. Current User: ",
        userSession.data.session.user.email
      );

      const { data, error } = await Supabase.from("courses")
        .update({
          published: publishedState,
        })
        .eq("id", courseID);

      if (error) {
        return {
          success: false,
          error: error,
        };
      } else {
        return {
          success: true,
          data: "Successfully Published",
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

  async createClassroom(classroomData) {
    try {
      const Supabase = await createClient();
      const userSession = await Supabase.auth.getSession();
      console.log(
        "user session fetched successfully. Current User: ",
        userSession.data.session.user.email
      );
      const { data, error } = await Supabase.from("classrooms")
        .insert([classroomData])
        .select("id");
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
}

export default new Mentor();
// Mentor in Backend
