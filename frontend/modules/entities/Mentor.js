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
    console.log(course);
    const request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(course),
    };

    fetch("/api/mentor/courses/create", request)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  }
}

export default new Mentor();
