import Classroom from "@/frontend/modules/entities/Classroom";
import { useParams } from "next/navigation";

export default function MarkAsDoneBtn({
  currentTaskID,
  completedTasks = [],
  setCompletedTasks,
}) {
  const params = useParams();
  // URL paramters has such a parameter. Refer file: /learn/(classroom)[id]
  console.log(completedTasks.includes(currentTaskID));

  const classroomID = params.id.split("-")[0];
  function markAsDoneHandler() {
    window.confirm("Are you sure you want to mark this task as done?");

    const updatedCompletedTasks = [...completedTasks, currentTaskID];

    const markAsDoneStatus = Classroom.markTaskAsDone(
      updatedCompletedTasks,
      classroomID
    );

    if (markAsDoneStatus.success) {
      console.log("Task marked as done successfully.");
      setCompletedTasks(markAsDoneStatus.data.completedTasks);
      window.confirm("Marked task as done successfully");
    }
  }
  return completedTasks.includes(currentTaskID) ? (
    <p className="alert alert-success">Task already completed</p>
  ) : (
    <button className="btn btn-success" onClick={markAsDoneHandler}>
      Mark as done
    </button>
  );
}
