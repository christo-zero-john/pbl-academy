import Link from "next/link";
import React from "react";

export default function DisplayCourses({ courses }) {
  console.log(courses);
  return (
    <div>
      <p className="text-center m-3 fs-4 fw-500 text-uppercase text-danger">
        {courses.length} courses
      </p>
      {courses.map((course) => (
        <div
          key={course.id}
          className="border border-3 border-success rounded p-3 m-2 col-12 col-md-3 d-inline-block m-2"
        >
          <div className="">
            <h1 className="fs-5 fw- d-inline-block mx-2">{course.title}</h1>
            <p className="small">
              <span className="fw-bold">By: </span>
              {course.created_by.first_name} {course.created_by.last_name}
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
