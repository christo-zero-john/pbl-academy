import User from "./User";

/**
 * Mentor in frontend
 */
class Mentor {
  constructor() {
    if (!Mentor.instance) {
      Mentor.instance = this;
    }
    return Mentor.instance;
  }

  async createCourse(course) {
    console.log("Sending request to create new course");
    course.created_by = User.user.id;
    course.published = false;
    const request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(course),
    };

    // console.log("Request: ", request);

    return fetch("/api/courses/create", request)
      .then((res) => res.json())
      .then((response) => {
        console.log("Request sent successfully and response recieved.");
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

  async updateCourse(course) {
    console.log("Sending request to update course");
    course.created_by = course.created_by.id;
    const request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(course),
    };

    console.log("Request: ", request);

    return fetch("/api/courses/update", request)
      .then((res) => res.json())
      .then((response) => {
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

  async saveTasksToDB(tasks) {
    console.log("Sending request to save tasks to database");
    const request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tasks),
    };

    console.log("Request: ", request);

    return fetch("/api/courses/update/tasks", request)
      .then((res) => res.json())
      .then((response) => {
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

export default new Mentor();
// Mentor in frontend
