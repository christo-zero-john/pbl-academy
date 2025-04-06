"use client";
import ClassroomTasks from "@/frontend/components/learners/learn/classroom/classroom-tasks";
import Classroom from "@/frontend/modules/entities/Classroom";
import { useParams } from "next/navigation";
import { useEffect } from "react";

/**
 * Displays course classroom
 */
export default function ClassroomPage() {
  const params = useParams();
  const [classroomID, courseID, courseTitle] = params.id.split("-");

  return (
    <div>
      <h1 className="">
        Classroom <span className="text-success">Course Name</span>
      </h1>
      <ClassroomTasks classroomID={classroomID} courseID={courseID} />
    </div>
  );
}

/**
 * Fetch classroom and course details
 * Extract, group and sort tasks
 * Display tasks daywise along with mark as completed buton.
 * When clicked on a task, display task details in an offcanvas
 */
