/**
 * Enrollments object in backend
 */

import { createClient } from "./Supabase";

class Enrollments {
  constructor() {
    if (!Enrollments.instance) {
      Enrollments.instance = this;
    }
    return Enrollments.instance;
  }

  async getEnrollmentsOfLearner(learner_id) {
    try {
      const Supabase = await createClient();
      await Supabase.auth.getSession();
      const { data, error } = await Supabase.from("courses")
        .select(`*`)
        .match({ learner_id: learner_id });
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

export default new Enrollments();

/**
 * Get classroom data
 *  enrolled classrooms, course details of each enrolled classrooms
 */
