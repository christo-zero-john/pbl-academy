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

  async fetchCourse(courseId) {
    console.log("Fetching Course with id: ", courseId);

    return {
      success: true,
      course: {
        id: "485e2dfb-5810-42d6-b711-c06e219f13f0",
        title: "Welcome Course",
        created_at: "2025-02-23T03:46:32.476439+00:00",
        description:
          "<p>Welcome Course is a Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque quo dolorum asperiores minus iusto qui totam esse libero, adipisci fuga pariatur facere voluptatem obcaecati, debitis temporibus excepturi dolor recusandae praesentium?<br>      Tenetur delectus eum fugit aspernatur, pariatur quo consequuntur eos rerum sequi alias optio ab illo nulla reiciendis? Error ipsum explicabo odio, facere saepe consectetur repellendus ea cumque quae debitis a.<br>      Facere maxime provident suscipit assumenda accusamus perspiciatis nisi unde, necessitatibus dignissimos aperiam voluptates blanditiis possimus, aliquid molestiae? Fugiat, sed. In debitis assumenda id modi beatae neque totam eveniet aperiam nisi!<br>      Ea laudantium atque non maxime reiciendis. Nemo, excepturi possimus sint voluptas vitae facilis impedit vero ipsum nihil, ratione nulla! Expedita similique, corporis incidunt iure ipsam quia numquam quibusdam nam placeat!<br>      Tenetur ullam velit maxime quis, iusto voluptatibus sit nulla, tempora optio facere beatae minus rerum exercitationem voluptatum autem possimus ipsa vel sint. Blanditiis vitae vero doloribus aliquam eaque in qui!</p>",
        created_by: "a39451a2-c393-4217-9e3f-604887222cbf",
        published: false,
      },
    };
  }
}

export default new Mentor();
