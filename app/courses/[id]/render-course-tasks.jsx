import { useEffect, useState } from "react";
import TaskDayWise from "./task-day-wise";
import Tasks from "@/frontend/modules/entities/Tasks";

export default function RenderCourseTasks({ course, setCourse }) {
  const [readyToRender, setReadyToRender] = useState(false);

  useEffect(() => {
    console.log(course);
    if (!readyToRender) {
      const tasks2D = Tasks.groupAndSortTasks([...course.tasks]);
      setCourse({
        ...course,
        tasks: [...tasks2D],
        totalDays: tasks2D.length,
        totalTasks: course.tasks.length,
      });
      setReadyToRender(true);
    }
  }, [course]);

  if (!readyToRender) {
    return (
      <>
        <p className="">Loading Tasks...</p>
      </>
    );
  }

  // console.log(course.tasks);

  if (course.tasks.length == 0) {
    return (
      <>
        <h2 className="text-center">Tasks</h2>
        <p className="">No Tasks added to this course yet...</p>
      </>
    );
  }

  return (
    <>
      <h2 className="text-center">Tasks</h2>
      <div className="accordion accordion-flush" id="accordion-tasks-daywise">
        {course.tasks.map((dayTasks, index) => (
          <div className="accordion-item" key={index}>
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={"#flush-collapse-day-" + (index + 1)}
                aria-expanded="false"
                aria-controls={"flush-collapse-day-" + (index + 1)}
              >
                Day {index + 1}
              </button>
            </h2>
            <div
              id={"flush-collapse-day-" + (index + 1)}
              className="accordion-collapse collapse"
              data-bs-parent="#accordion-tasks-daywise"
            >
              <div className="accordion-body">
                <TaskDayWise tasks={dayTasks} day={index + 1} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
