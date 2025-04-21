/**
 * Enrollments object in frontend
 */

class Enrollments {
  constructor() {
    if (!Enrollments.instance) {
      Enrollments.instance = this;
    }
    return Enrollments.instance;
  }

  async getEnrollmentsOfLearner(learner_id) {
    console.log(
      "Sending request to  get all classrooms of learner: ",
      learner_id
    );
    const request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ learner_id: learner_id }),
    };

    console.log("Request: ", request);

    return fetch("/api/courses/classrooms/my-classrooms", request)
      .then((res) => res.json())
      .then((response) => {
        console.log("Request sent successfully and response recieved.");
        console.log(response);
        if (response.error) {
          return {
            success: false,
            error: response.error,
          };
        } else {
          return {
            success: true,
            data: response?.data,
          };
        }
      });
  }
}

export default new Enrollments();
// Enrollments object in frontend
