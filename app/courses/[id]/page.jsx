"use client";

import Course from "@/frontend/modules/entities/Course";
import User from "@/frontend/modules/entities/User";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import DisplayTasks from "../../../frontend/components/courses/display-tasks";
import Tasks from "@/frontend/modules/entities/Tasks";
import MentorSettings from "../../../frontend/components/mentor/mentor-settings";
import AllCourseClassrooms from "@/frontend/components/classrooms/all-course-classrooms";

/** comment
 *
 * @returns Display a particular course with a course id
 */
export default function CourseItemPage() {
  const params = useParams();
  const router = useRouter();
  const [course, setCourse] = useState(null);
  const [showClassrooms, setShowClassrooms] = useState(false);

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
        console.log("Response recieved");
        if (getCourseStatus.courses.length == 0) {
          console.log(
            "Invalid Course. Either course is deleted or course does not exists"
          );
          {
            router.push("/courses/404");
          }
        } else if (getCourseStatus.courses.length > 1) {
          window.confirm(
            "Something unexpected happened while fetching course. Instead of one, we found multiple courses! Contact Support to resolve this problem"
          );
        } else {
          console.log("Course fetched Successfully");
          let tempCourse = getCourseStatus.courses[0];
          tempCourse.tasks = Tasks.groupAndSortTasks(tempCourse.tasks);
          setCourse(tempCourse);
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

        <p className="">
          Created By: &nbsp;
          <span className="text-success">
            {course.created_by.first_name} {course.created_by.last_name}
          </span>
        </p>
        <p className="">{course.created_at}</p>

        <div className="duration">
          <p className="d-inline-block mx-2">
            Days: {course.tasks.length || "calculating..."}
          </p>
          <p className="d-inline-block mx-2">
            Tasks: {Tasks.getCount(course.tasks) || "calculating..."}
          </p>

          <button
            className="btn btn-primary"
            onClick={() => setShowClassrooms(true)}
          >
            Enroll For Free
          </button>
        </div>

        {
          // Display mentor settings if the course is being viewed by the course creator.
          User.user.id == course.created_by.id && (
            <MentorSettings course={course} setCourse={setCourse} />
          )
        }
      </div>

      <div
        className=""
        dangerouslySetInnerHTML={{ __html: course.description }}
      ></div>
      <h3 className="text-center">Course Activities</h3>
      <DisplayTasks tasks={course.tasks} setCourse={setCourse} />

      <AllCourseClassrooms
        course={course}
        show={showClassrooms}
        setShow={setShowClassrooms}
      />
    </div>
  );
}
