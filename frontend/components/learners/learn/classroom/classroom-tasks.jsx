import Classroom from "@/frontend/modules/entities/Classroom";
import { useEffect, useState } from "react";

export default function ClassroomTasks({ classroomID, courseID, }) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    (async () => {
      const getTasksStatus = await Classroom.getClassroomTasks(
        classroomID,
        courseID
      );
      console.log(getTasksStatus);

      if(!getTasksStatus.success) {
        
      }
    })();
  });
  return <div>ClassroomTasks</div>;
}
