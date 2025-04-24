"use client";

import Course from "@/frontend/modules/entities/Course";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import DisplayCourses from "../../frontend/components/courses/display-courses";
import NavBar from "@/frontend/components/common/nav-bar";

function AllCourses() {
  const [courses, setCourses] = useState(null);

  const router = useRouter();

  useEffect(() => {
    (async () => {
      console.log("Fetching Courses");
      const getCourseStatus = await Course.fetchCourses();

      // console.log(getCourseStatus);

      if (getCourseStatus.success) {
        console.log("Successfully fetched courses");
        setCourses(getCourseStatus.courses);
      } else {
        window.confirm("Error Fetching Course...");
      }
    })();
  }, []);

  return (
    <>
      <NavBar />
      {(!courses && <div>Fetching Courses...</div>) ||
        (courses.length == 0 && <div>0 Published Courses Found</div>) || (
          <DisplayCourses courses={courses} />
        )}
    </>
  );
}

export default AllCourses;
