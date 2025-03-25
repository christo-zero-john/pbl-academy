import { useState } from "react";
import CreateClassroomForm from "../forms/create-classroom-form";
import Mentor from "@/frontend/modules/entities/Mentor";

export default function PublishedCourse__Mentor({ course, setCourse }) {
  const [showClassroomForm, setShowClassroomForm] = useState(false);

  async function moveCourseToDraftsHandler() {
    const moveToDraftStatus = await Mentor.togglePublishCourse(
      course.id,
      false
    );
    console.log("Successfully moved course to drafts");
    if (moveToDraftStatus.success) {
      setCourse({
        ...course,
        published: false,
      });
    } else {
      window.confirm(
        "Error while moving course to drafts " + moveToDraftStatus.error.message
      );
    }
  }

  async function createClassroomHandler() {
    console.log("Displaying form to create course classroom");
    setShowClassroomForm(true);
  }

  function manageClassrooms() {}
  
  return (
    <div className="my-3">
      <p className="fw-bold text-success p-0 m-0">Course Already Published</p>
      <button
        className="btn btn-danger d-inline-block"
        onClick={moveCourseToDraftsHandler}
      >
        Move Course to Drafts
      </button>
      <button
        className="btn btn-primary ms-2 d-inline-block"
        onClick={createClassroomHandler}
      >
        Create New Classroom
      </button>

      <button
        className="btn btn-primary ms-2 d-inline-block"
        onClick={createClassroomHandler}
      >
        Manage Clasrooms
      </button>

      <CreateClassroomForm
        course={course}
        show={showClassroomForm}
        setShow={setShowClassroomForm}
      />
    </div>
  );
}
