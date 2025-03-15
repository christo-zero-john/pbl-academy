import Link from "next/link";
import React from "react";

export default function MentorSettings({ course }) {
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
        <Link href={`/courses/${course.id}/classrooms/new`} className="">
          Create New Classroom
        </Link>
      ) : (
        <p className="">
          Publish Course to create classroom and start enrolling students
        </p>
      )}
    </div>
  );
}
