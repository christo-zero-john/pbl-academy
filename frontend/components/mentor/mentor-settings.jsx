import Mentor from "@/frontend/modules/entities/Mentor";
import Link from "next/link";
import React from "react";

export default function MentorSettings({ course, setCourse }) {
  async function publishCourseHandler() {
    const publishStatus = await Mentor.togglePublishCourse(course.id, true);
    if (publishStatus.success) {
      console.log("Successfully Published course");
      setCourse({
        ...course,
        published: true,
      });
    } else {
      window.confirm(
        "Error while Publishing Course " + publishStatus.error.message
      );
    }
  }

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
    
  }

  return (
    <div className="">
      <Link
        href={`/courses/mentor/edit-course/${course.id}`}
        className="btn btn-primary mx-2"
      >
        Edit Course Details
      </Link>

      <Link
        href={`/courses/mentor/edit-course/${course.id}/tasks`}
        className="btn btn-primary mx-2"
      >
        Manage Tasks
      </Link>

      {course.published ? (
        <div className="m-3">
          <p className="fw-bold text-success p-0 m-0">Published</p>
          <button
            className="btn btn-danger d-inline-block ms-2"
            onClick={moveCourseToDraftsHandler}
          >
            Move Course to Drafts
          </button>
          <Link
            href={`/courses/${course.id}/classrooms/new`}
            className="btn btn-primary ms-2 d-inline-block"
            onClick={createClassroomHandler}
          >
            Create New Classroom
          </Link>
        </div>
      ) : (
        <div className="m-3">
          <p className="fw-bold text-danger d-inline-block p-0 m-0">
            Not Published
          </p>

          <p className="p-0 m-0">
            Publish Course to create classroom and start enrolling students
          </p>
          <button
            className="btn btn-success d-inline-block"
            onClick={publishCourseHandler}
          >
            Publish Course
          </button>
        </div>
      )}
    </div>
  );
}
