"use client";
import { useParams } from "next/navigation";
import { useEffect } from "react";

/**
 * Displays course classroom
 */
export default function ClassroomPage() {
  const params = useParams();
  const [classroomID, courseID, courseTitle] = params.id.split("-");

  console.log(classroomID, courseID, courseTitle);

  useEffect(() => {
    (async () => {
      const response = await fetch("/api/classrooms/classroom-tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          classroom_id: classroomID,
        }),
      });
      const data = await response.json();
      console.log("Classroom Tasks: ", data);
    })();
  });

  return (
    <div>
      <h1 className="">
        Classroom <span className="text-success">Course Name</span>
      </h1>
    </div>
  );
}

/**
 * Fetch classroom and course details
 * Extract, group and sort tasks
 * Display tasks daywise along with mark as completed buton.
 * When clicked on a task, display task details in an offcanvas
 */
