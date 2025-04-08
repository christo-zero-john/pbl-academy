import Classroom from "@/frontend/modules/entities/Classroom";
import Tasks from "@/frontend/modules/entities/Tasks";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import DisplayTasks from "@/frontend/components/courses/display-tasks";

export default function ClassroomTasks({ classroomID, courseID }) {
  const router = useRouter();
  const [tasks, setTasks] = useState(null);
  const [completedTasks, setCompletedTasks] = useState([]);

  useEffect(() => {
    (async () => {
      const getTasksStatus = await Classroom.getClassroomTasks(
        classroomID,
        courseID
      );
      console.log(getTasksStatus);

      if (getTasksStatus.success) {
        // console.log("Response recieved");
        if (getTasksStatus.course.length == 0) {
          console.log(
            "Invalid Course. Either course is deleted or course does not exists"
          );
          {
            router.push("/courses/404");
          }
        } else if (getTasksStatus.course.length > 1) {
          window.confirm(
            "Something unexpected happened while fetching course. Instead of one, we found multiple courses! Contact Support to resolve this problem"
          );
        } else {
          // console.log("Course fetched Successfully");
          let tempCourse = getTasksStatus.course[0];
          tempCourse.tasks = Tasks.groupAndSortTasks(tempCourse.tasks);
          setTasks(tempCourse.tasks);
        }
      } else if (getTasksStatus.error) {
        if (getTasksStatus.error.includes("fetch failed")) {
          window.confirm(
            "Failed to connect with database. Check your network connection and try again later..."
          );
        } else {
          window.confirm(
            "Some Unexpected error while fetching course." +
              getTasksStatus.error
          );
        }
      }
    })();
  }, []);

  if (!tasks) {
    return <p className="content-loading-full">Loading...</p>;
  }

  return (
    <DisplayTasks
      tasks={tasks}
      classroom={true}
      completedTasks={completedTasks}
    />
  );
}
