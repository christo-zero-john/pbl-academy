import { useEffect, useState } from "react";

export default function RenderCourseTasks({ course, setCourse }) {
  const [readyToRender, setReadyToRender] = useState(null);

  useEffect(() => {
    console.log(course);
    if (course.tasks.length > 0) {
      groupAndSortTasks();
    } else if (course.tasks.length == 1) {
      setCourse({
        ...course,
        tasks: [course.tasks],
      });
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
      tasks: { ...tasks2D },
      totalDays: tasks2D.length,
      totalTasks: course.tasks.length,
    });
  }

  return <div></div>;
}
