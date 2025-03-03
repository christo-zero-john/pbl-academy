"use client";

import Course from "@/frontend/modules/entities/Course";
import User from "@/frontend/modules/entities/User";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import RenderCourseTasks from "./course-tasks";

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

      // console.log(getCourseStatus);

      if (getCourseStatus.success) {
        console.log("Successfully fetched course");
        if (getCourseStatus.courses.length == 0) {
          {
            router.push("/courses/404");
          }
        } else if (getCourseStatus.courses.length > 1) {
          window.confirm(
            "Something unexpected happened while fetching course. Instead of one, we found multiple courses! Contact Support to resolve this problem"
          );
        } else {
          setCourse(getCourseStatus.courses[0]);
          // console.log(getCourseStatus.courses[0]);
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
        <h1 className="text-center">{course.title}</h1>

        <div className="duration">
          <p className="d-inline-block mx-2">
            Days: {course.totalDays || "calculating..."}
          </p>
          <p className="d-inline-block mx-2">
            Tasks: {course.totalTasks || "calculating..."}
          </p>
        </div>

        {
          // Display an edit button if the course is viewed by the course creator.
          User.user.id == course.created_by.id && (
            <div className="">
              <button
                className="btn btn-primary"
                onClick={(event) =>
                  router.push(`/courses/mentor/edit-course/${course.id}`)
                }
              >
                Edit Course Details
              </button>

              <button
                className="btn btn-primary"
                onClick={(event) =>
                  router.push(`/courses/mentor/edit-course/${course.id}`)
                }
              >
                Manage Tasks
              </button>
            </div>
          )
        }
      </div>

      <p className="p-2">
        Created By: &nbsp;
        <span className="text-success">
          {course.created_by.first_name} {course.created_by.last_name}
        </span>
      </p>
      <p className="">{course.created_at}</p>
      <p className="fw-bold">
        {(course.published && "Published") || "In Drafts"}
      </p>
      <div
        className=""
        dangerouslySetInnerHTML={{ __html: course.description }}
      ></div>
      <RenderCourseTasks course={course} setCourse={setCourse} />
    </div>
  );
}
