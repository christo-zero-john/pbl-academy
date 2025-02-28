import { redirect } from "next/navigation";
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
      },
      body: JSON.stringify(course),
    };

    console.log("Request: ", request);

    fetch("/api/courses/create", request)
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        if (response.error) {
          window.confirm("Error Creating Course: ", response.error.message);
        } else {
          console.log("Succesfully created new course");
          redirect(`/mentor/courses/${response.data.id}`);
        }
      });
  }

}

export default new Mentor();
