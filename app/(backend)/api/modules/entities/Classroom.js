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

  async fetchClassroomTasks(requestData) {
    try {
      const Supabase = await createClient();
      const { data, error } = await Supabase.from("courses")
        .select(
          `
            id,
            title,
            description,
            tasks (*)`
        )
        .match({
          id: requestData.course_id,
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

  async fecthCompletedTasks(classroomID, learnerID) {
    try {
      const Supabase = await createClient();
      const { data, error } = await Supabase.from("completed_tasks")
        .select("completed_tasks")
        .match({
          classroom_id: classroomID,
          learner_id: learnerID,
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

  async markAsDone(completed_tasks, classroom_id, learner_id) {
    try {
      const Supabase = await createClient();
      const { data, error } = await Supabase.from("completed_tasks")
        .upsert([
          {
            completed_tasks: completed_tasks,
            classroom_id: classroom_id,
            learner_id: learner_id,
          },
        ])
        .select("completed_tasks");
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

export default new Classroom();
