import Link from "next/link";
import React from "react";

export default function DisplayCourses({ courses }) {
  return (
    <div>
      <p className="text-center">{courses.length} courses</p>
      {courses.map((course) => (
        <div
          key={course.id}
          className="border border-3 border-secondary p-3 m-2 w-fit d-inline-block m-2"
        >
          <div className="">
            <h1 className="fs-5 fw- d-inline-block mx-2">{course.title}</h1>
            <p className="small">
              <span className="fw-bold">By: </span>
              {course.created_by.id}
            </p>
          </div>
          <Link
            href={`/courses/${course.id}`}
            className="btn btn-primary d-inline-block mx-2"
          >
            View
          </Link>
        </div>
      ))}
    </div>
  );
}
