import Classroom from "@/frontend/modules/entities/Classroom";

export default function ClassroomTasks({ classroomID, courseID }) {
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
  return <div>ClassroomTasks</div>;
}
