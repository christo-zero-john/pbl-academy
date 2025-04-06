"use client";
import Classroom from "@/frontend/modules/entities/Classroom";
import { useParams } from "next/navigation";
import { useEffect } from "react";

/**
 * Displays course classroom
 */
export default function ClassroomPage() {
  const params = useParams();
  const [classroomID, courseID, courseTitle] = params.id.split("-");
  const [tasks, setTasks] = useState([]);

  console.log(classroomID, courseID, courseTitle);

  useEffect(() => {
    (async () => {
      const getTasksStatus = await Classroom.getClassroomTasks(
        classroomID,
        courseID
      );
      console.log(getTasksStatus);
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
