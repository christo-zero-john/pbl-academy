"use client";

import Course from "@/frontend/modules/entities/Course";
import User from "@/frontend/modules/entities/User";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

/**
 *
 * @returns Display a particular course with a course id
 */
export default function CourseItemPage() {
  const params = useParams();
  const router = useRouter();
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

      console.log(getCourseStatus);

      if (getCourseStatus.success) {
        console.log("Successfully fetched course");
        if (getCourseStatus.courses.length == 0) {
          {
            router.push("/courses/404");
          }
        } else if (getCourseStatus.courses.length > 1) {
          window.confirm(
            "Something unexpected happened while fetching course. Instead of one, we got multiple courses!!!"
          );
        } else {
          setCourse(getCourseStatus.courses[0]);
          console.log(getCourseStatus.courses[0]);
        }
      } else if (getCourseStatus.error) {
        if (getCourseStatus.error.includes("fetch failed")) {
          window.confirm(
            "Failed to connect with database. Check your network connection and try again later..."
          );
        } else {
          window.confirm(
            "Some Unexpected error while fetching course." +
              getCourseStatus.error
          );
        }
      }
    })();
  }, []);

  if (course == null) {
    return <div>Fetching Course...</div>;
  }

  return (
    <div className="">
      <div className="header">
        <h1 className="">{course.title}</h1>

        {
          // Display an edit button if the course is viewed by the course creator.
          User.user.id == course.created_by.id && (
            <button
              className=""
              onClick={(event) =>
                router.push(`/courses/mentor/edit-course/${course.id}`)
              }
            >
              Manage Course
            </button>
          )
        }
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
