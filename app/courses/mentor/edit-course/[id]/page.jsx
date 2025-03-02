"use client";

import TextEditor from "@/frontend/components/text-editor/text-editor";
import Course from "@/frontend/modules/entities/Course";
import Mentor from "@/frontend/modules/entities/Mentor";
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

  // useEffect(() => {
  //   console.log("Form Data: ", formData);
  // }, [formData]);

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
          setFormData(getCourseStatus.courses[0]);
          // console.log(getCourseStatus.courses[0]);
        }
      } else {
        router.push("/courses/404");
      }
    })();
  }, []);

  if (course == null) {
    return <div>Fetching Course...</div>;
  }

  if (course && course.created_by.id != User?.user.id) {
    return (
      <div className="">
        <p className="fs-3 fw-bold text-danger">
          You are not allowed to perform this operation for this course. Request
          access to be a mentor to be able to perform this operation...
        </p>
      </div>
    );
  }

  function setDescription(description) {
    setFormData({
      ...formData,
      description: description,
    });
  }

  async function updateCourseDetailsHandler(event) {
    event.preventDefault();
    console.log("Upadting Details of course with: ", formData);
    setFormData({
      ...formData,
      created_by: formData.created_by.id,
    });
    const updateCourseDeatilsStatus = await Mentor.updateCourse({
      ...formData,
    }); // using spread operator, otherwise only a reference is sent to the function, which will cause errors
  }

  if (!course) {
    return <div className="loading-text">Fetching Course...</div>;
  }

  return (
    <div className="">
      <h1 className="text-center">Edit Course Details</h1>

      <form className="p-3" onSubmit={updateCourseDetailsHandler}>
        <label htmlFor="published" className="">
          Publish
          <input
            type="checkbox"
            name="published"
            id="published"
            className=""
            onChange={(event) => {
              setFormData({
                ...formData,
                published: event.target.checked,
              });
            }}
          />
        </label>
        <label htmlFor="title" className="d-block">
          Course Title
          <input
            type="text"
            id="title"
            className="d-block"
            name="title"
            required
            minLength={3}
            value={formData.title || ""}
            onChange={(event) =>
              setFormData({
                ...formData,
                title: event.target.value,
              })
            }
          />
        </label>

        <label htmlFor="" className="d-block">
          Course Description
          <TextEditor
            onChange={setDescription}
            initialContent={formData.description || "Loading..."}
          />
        </label>

        <button
          className="d-block btn btn-success col-11 col-md-6 mx-auto my-2"
          type="submit"
        >
          Update Course
        </button>
      </form>
    </div>
  );
}
