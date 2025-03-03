import { useEffect, useState } from "react";
import TaskDayWise from "./task-day-wise";

export default function RenderCourseTasks({ course, setCourse }) {
  const [readyToRender, setReadyToRender] = useState(false);

  useEffect(() => {
    console.log(course);
    if (!readyToRender) {
      groupAndSortTasks();
    }
  }, [course]);

  /**
   * Initially tasks is an array of tasks. We need to convert it into a 2D array of tasks grouped by day, then sort each day's task by 'task.index'. The converted tasks is a 2D array. Each row in the 2D array is a day, and each column in the 2D array is a task of that day.
   */
  function groupAndSortTasks() {
    console.log("Grouping Tasks into days");
    // Group tasks by day using an object
    const tasksByDay = course.tasks.reduce((groups, task) => {
      if (!groups[task.day]) {
        groups[task.day] = [];
      }
      groups[task.day].push(task);
      return groups;
    }, {});

    // Sort each day's tasks by their index
    Object.values(tasksByDay).forEach((dayTasks) => {
      dayTasks.sort((a, b) => a.index - b.index);
    });

    // Convert the grouped tasks into a sorted 2D array by day (sorted numerically)
    const tasks2D = Object.keys(tasksByDay)
      .sort((a, b) => a - b) // sort day keys numerically
      .map((day) => tasksByDay[day]);

    setCourse({
      ...course,
      tasks: [...tasks2D],
      totalDays: tasks2D.length,
      totalTasks: course.tasks.length,
    });
    setReadyToRender(true);
  }

  if (!readyToRender) {
    return (
      <>
        <p className="">Loading Tasks...</p>
      </>
    );
  }

  console.log(course.tasks);

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
      <div class="accordion accordion-flush" id="accordion-tasks-daywise">
        {course.tasks.map((dayTasks, index) => (
          <div class="accordion-item" key={index}>
            <h2 class="accordion-header">
              <button
                class="accordion-button collapsed"
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
              class="accordion-collapse collapse"
              data-bs-parent="#accordion-tasks-daywise"
            >
              <div class="accordion-body">
                <TaskDayWise tasks={dayTasks} day={index + 1} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
