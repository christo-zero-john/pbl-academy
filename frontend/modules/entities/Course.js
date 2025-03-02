import User from "./User";

class Course {
  constructor() {
    if (!Course.instance) {
      Course.instance = this;
    }
    return Course.instance;
  }

  // Create Course in Mentor Class

  async fetchCourses(filters) {
    console.log("Fetching Courses with filters: ", filters);

    const request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${User.user.session_token}`,
      },
      body: JSON.stringify({
        ...filters,
      }),
    };

    try {
      return fetch("/api/courses/", request)
        .then((res) => res.json())
        .then((data) => {
          // The response returned from the server is sent to the course page. It contains success, error or courses fields.
          return { ...data };
        });
    } catch (error) {
      console.log("Error Fetching Courses: ", error);
      return {
        success: false,
        error: error,
      };
    }
  }
}

export default new Course();
