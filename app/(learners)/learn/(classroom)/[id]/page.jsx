"use client";
import { useParams } from "next/navigation";
import { useEffect } from "react";

/**
 * Displays course classroom
 */
export default function ClassroomPage() {
  const params = useParams();
  const classroomID = params.id;
  console.log(classroomID);

  useEffect(() => {
    /**
     * Fetch classroom and course details
     * Extrac, group and sort tasks
     * Display tasks daywise along with mark as completed buton.
     * When clicked on a task, display task details in an offcanvas
     */
  });

  return (
    <div>
      <h1 className="">
        Classroom <span className="text-success">Course Name</span>
      </h1>
    </div>
  );
}
