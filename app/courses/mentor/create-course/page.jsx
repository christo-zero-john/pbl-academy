"use client";

import NavBar from "@/frontend/components/common/nav-bar";
import TextEditor from "@/frontend/components/text-editor/text-editor";
import Mentor from "@/frontend/modules/entities/Mentor";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

/**
 *
 * @description Display course creation form if the user is a mentor
 */
export default function CreateCourse() {
  const router = useRouter();
  const [description, setDescription] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: description,
  });

  /**
   * Update course description in formData when user enters description in text editor.
   */
  useEffect(() => {
    setFormData({
      ...formData,
      description: description,
    });
  }, [description]);

  async function createCourceHandler(event) {
    event.preventDefault();
    // console.log(formData);
    const createCourseStatus = await Mentor.createCourse(formData);
    if (!createCourseStatus.success) {
      window.confirm(
        "Error Creating Course: ",
        createCourseStatus.error.message
      );
    } else {
      console.log("Succesfully created new course");
      router.push(`/courses/${createCourseStatus.data.id}`);
    }
  }

  return (
    <div>
      <NavBar />
      <h1 className="text-center">Create New Course</h1>
      <form className="p-3" onSubmit={createCourceHandler}>
        <label htmlFor="title" className="d-block">
          Course Title
          <input
            type="text"
            id="title"
            className="d-block"
            name="title"
            required
            minLength={3}
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
          <TextEditor onChange={setDescription} />
        </label>

        <button
          className="d-block btn btn-success col-11 col-md-6 mx-auto my-2"
          type="submit"
        >
          Create Course
        </button>
      </form>
    </div>
  );
}
