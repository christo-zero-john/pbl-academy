"use client";

import TextEditor from "@/frontend/components/text-editor/text-editor";
import Mentor from "@/frontend/modules/entities/Mentor";
import React, { useEffect, useState } from "react";

export default function CreateCourse() {
  const [description, setDescription] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: description,
  });

  // Update course description in formData when user enters description in text editor.
  useEffect(() => {
    setFormData({
      ...formData,
      description: description,
    });
  }, [description]);

  async function createCourceHandler(event) {
    event.preventDefault();
    await Mentor.createCourse(formData);
  }

  return (
    <div>
      <h1 className="text-center">Create New Course</h1>
      <form className="p-3" onSubmit={createCourceHandler}>
        <label htmlFor="title" className="d-block">
          Course Title
          <input
            type="text"
            id="title"
            className="d-block"
            name="title"
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
