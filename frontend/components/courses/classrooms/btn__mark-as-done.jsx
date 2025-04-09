import Classroom from "@/frontend/modules/entities/Classroom";
import { useParams } from "next/navigation";

export default function MarkAsDoneBtn({
  currentTask,
  completedTasks,
  setCompletedTasks,
}) {
  const params = useParams();
  // URL paramters has such a parameter. Refer file: /learn/(classroom)[id]

  const classroomID = params.id.split("-")[0];
  function markAsDoneHandler() {
    window.confirm("Are you sure you want to mark this task as done?");

    const markAsDoneStatus = Classroom.markTaskAsDone(currentTask, classroomID);
  }
  return (
    <button className="btn btn-success" onClick={markAsDoneHandler}>
      Mark as done
    </button>
  );
}
