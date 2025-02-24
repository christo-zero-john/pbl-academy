"use client";

import Course from "@/frontend/modules/entities/Course";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

/**
 *
 * @returns Display a particular course
 */
export default function CourseItemPage() {
  const params = useParams();
  const [course, setCourse] = useState(null);

  // This useEffect fetches the course and sets course item (course state)
  useEffect(() => {
    /**
     *  The below is a Immediately Invoked Function Expression which is an async function to fetch course from supabase. It is used as we can't directly use await statement inside  useEffect.
     */

    (async () => {
      console.log("Fetching getCourseStatus");
      const getCourseStatus = await Course.fetchCourses({
        id: params.id,
      });

      if (getCourseStatus.success) {
        if (getCourseStatus.courses.length > 1) {
          window.confirm(
            "Something unexpected happened while fetching course. Instead of one, we got multiple courses!!!"
          );
        } else {
          setCourse(getCourseStatus.courses[0]);
          console.log(getCourseStatus.courses[0]);
        }
      }
    })();
  }, []);

  if (course == null) {
    return <div>Fetching Course...</div>;
  }

  return (
    <div className="">
      <h1 className="">{course.title}</h1>
      <div>
        <p
          className=""
          dangerouslySetInnerHTML={{ __html: course.description }}
        />
      </div>
      <div>
        <p className="">
          Created By: &nbsp;
          {course.created_by.first_name} {course.created_by.last_name}
        </p>
      </div>
      <div>{course.created_at}</div>
      <div>
        <p className="fw-bold">
          {(course.published && "Published") || "In Drafts"}
        </p>
      </div>
      <div></div>
    </div>
  );
}
