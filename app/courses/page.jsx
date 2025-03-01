"use client";

import Course from "@/frontend/modules/entities/Course";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function AllCourses() {
  const [courses, setCourses] = useState(null);

  const router = useRouter();

  useEffect(() => {
    (async () => {
      console.log("Fetching getCourseStatus");
      const getCourseStatus = await Course.fetchCourses();

      console.log(getCourseStatus);

      if (getCourseStatus.success) {
        console.log("Successfully fetched courses");
        setCourses(getCourseStatus.courses);
      } else {
        window.confirm("Error Fetching Course...");
      }
    })();
  }, []);

  function viewCourseHandler(event) {
    router.push(`/courses/${event.target.id}`);
  }

  if (courses == null) {
    return <div>Fetching Courses...</div>;
  } else {
    if (courses.length == 0) {
      return <div>No Courses Found</div>;
    } else {
      return (
        <div>
          <p className="text-center">Displaying {courses.length} courses</p>
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
              <button
                className="btn btn-primary d-inline-block mx-2"
                onClick={viewCourseHandler}
                id={course.id}
              >
                View
              </button>
            </div>
          ))}
        </div>
      );
    }
  }
}

export default AllCourses;
