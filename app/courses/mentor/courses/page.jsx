"use client";

import Course from "@/frontend/modules/entities/Course";
import User from "@/frontend/modules/entities/User";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";

function AllCoursesOfMentor() {
  const [courses, setCourses] = useState(null);

  useEffect(() => {
    (async () => {
      console.log("Fetching getCourseStatus");
      const getCourseStatus = await Course.fetchCourses({
        created_by: User.user.id,
      });

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
    redirect(`/courses/${event.target.id}`);
  }

  if (courses == null) {
    return <div>Fetching Courses...</div>;
  } else {
    if (courses.length == 0) {
      return <div>No Courses Found</div>;
    } else {
      return (
        <div>
          {courses.map((course) => (
            <div
              key={course.id}
              className="border border-3 border-secondary p-3 m-2 w-fit"
            >
              <h1 className="fs-5 fw- d-inline-block mx-2">{course.title}</h1>
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

export default AllCoursesOfMentor;
