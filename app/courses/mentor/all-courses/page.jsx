"use client";

import Course from "@/frontend/modules/entities/Course";
import User from "@/frontend/modules/entities/User";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import DisplayCourses from "../../../../frontend/components/courses/display-courses";

function AllCoursesOfMentor() {
  const router = useRouter();
  const [courses, setCourses] = useState(null);

  useEffect(() => {
    (async () => {
      console.log("Fetching Courses");
      const getCourseStatus = await Course.fetchCourses({
        created_by: User.user.id,
      });

      // console.log(getCourseStatus);

      if (getCourseStatus.success) {
        console.log("Successfully fetched courses");
        setCourses(getCourseStatus.courses);
      } else {
        window.confirm("Some unexpected Error while Fetching Course...");
      }
    })();
  }, []);

  if (courses == null) {
    return <div>Fetching Courses...</div>;
  } else {
    if (courses.length == 0) {
      return <div>No Courses Found</div>;
    } else {
      return <DisplayCourses courses={courses} />;
    }
  }
}

export default AllCoursesOfMentor;
