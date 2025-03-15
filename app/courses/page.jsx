"use client";

import Course from "@/frontend/modules/entities/Course";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import DisplayCourses from "../../frontend/components/courses/display-courses";

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

  if (courses == null) {
    return <div>Fetching Courses...</div>;
  } else {
    if (courses.length == 0) {
      return <div>0 Published Courses Found</div>;
    } else {
      return <DisplayCourses courses={courses} />;
    }
  }
}

export default AllCourses;
