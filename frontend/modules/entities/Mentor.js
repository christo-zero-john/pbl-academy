import User from "./User";

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
        Authorization: `Bearer ${User.user.session_token}`,
      },
      body: JSON.stringify(course),
    };

    console.log("Request: ", request);

    fetch("/api/mentor/courses/create", request)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  }
}

export default new Mentor();
