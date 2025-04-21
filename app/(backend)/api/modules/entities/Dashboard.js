/**
 * Dasboard object in backend
 */

import { createClient } from "./Supabase";

class Dasboard {
  constructor() {
    if (!Dasboard.instance) {
      Dasboard.instance = this;
    }
    return Dasboard.instance;
  }

  async getLearnerDashboardData(learner_id) {
    try {
      const Supabase = await createClient();
      const enrollmentsData = await 
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

export default new Dasboard();

/**
 * Get classroom data 
 *  enrolled classrooms, course details of each enrolled classrooms
 */