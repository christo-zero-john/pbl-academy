"use client";

import Course from "@/frontend/modules/entities/Course";
import User from "@/frontend/modules/entities/User";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * Edit a particular course with a course id
 */
export default function EditCoursePage() {
  const params = useParams();
  const router = useRouter();
  const [course, setCourse] = useState(null);

  const [formData, setFormData] = useState({
    title: course?.title,
    description: course?.description,
  });

  useEffect(() => {
    console.log(formData);
  }, [formData]);

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

      console.log(getCourseStatus);

      if (getCourseStatus.success) {
        console.log("Successfully fetched course");
        if (getCourseStatus.courses.length > 1) {
          window.confirm(
            "Something unexpected happened while fetching course. Instead of one, we got multiple courses!!!"
          );
        } else {
          setCourse(getCourseStatus.courses[0]);
          console.log(getCourseStatus.courses[0]);
        }
      } else {
        router.push("/courses/404");
      }
    })();
  }, []);

  if (course == null) {
    return <div>Fetching Course...</div>;
  }

  return (
    <div className="">
      <div className="header">
        <h1 className="fs-3 text-center">Edit Course: {course.title}</h1>
      </div>
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
