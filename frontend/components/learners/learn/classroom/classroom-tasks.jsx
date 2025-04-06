import Classroom from "@/frontend/modules/entities/Classroom";

export default async function ClassroomTasks({ classroomID, courseID }) {
  const [tasks, setTasks] = useState([]);

  console.log(classroomID, courseID, courseTitle);
  const getTasksStatus = await Classroom.getClassroomTasks(
    classroomID,
    courseID
  );
  console.log(getTasksStatus);

  return <div>ClassroomTasks</div>;
}
