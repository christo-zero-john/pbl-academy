"use client";

import TaskDayWise from "@/app/courses/[id]/task-day-wise";
import Course from "@/frontend/modules/entities/Course";
import Tasks from "@/frontend/modules/entities/Tasks";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AddTaskForm from "./add-task-form";

export default function ManageTasksOfCourse() {
  const params = useParams();
  const router = useRouter();
  /**comment
   * The @var course state stores the title and description of course to which task is added.
   * The @var tasks state stores all the tasks of the course as a matrix / 2D array.
   * The @var newTasks state stores a record of which tasks have been added newly to the @var tasks matrix. The @var newTasks is also a matrix. Each element of the @var newTasks is an array of 2 integers. First integer stores index of day of the modified task and the second integer represents index of that task in that particular day. for example [1,4] means 4th task of day 1 and [5,9] means 9th task of day 5
   * @var showTaskForm is used to show and hide task form
   */
  const [course, setCourse] = useState(null);
  const [tasks, setTasks] = useState(null);
  const [newTasks, setNewtasks] = useState([]);
  const [showTaskForm, setShowTaskForm] = useState(false);

  // This useEffect fetches the course and sets course item (course state)
  useEffect(() => {
    /**comment
     *  The below is a Immediately Invoked Function Expression which is an async function to fetch course from supabase. It is used as we can't directly use await statement inside  useEffect.
     */
    (async () => {
      console.log("Fetching getCourseStatus");
      const getCourseStatus = await Course.fetchCourses({
        id: params.id,
      });

      if (getCourseStatus.success) {
        console.log("Successfully fetched course");
        if (getCourseStatus.courses.length == 0) {
          {
            router.push("/courses/404");
          }
        } else if (getCourseStatus.courses.length > 1) {
          window.confirm(
            "Something unexpected happened while fetching course. Instead of one, we found multiple courses! Contact Support to resolve this problem"
          );
        } else {
          setCourse({
            title: getCourseStatus.courses[0].title,
            id: getCourseStatus.courses[0].id,
          });
          setTasks([...getCourseStatus.courses[0].tasks]);
          // console.log(getCourseStatus.courses[0]);
        }
      } else if (getCourseStatus.error) {
        if (getCourseStatus.error.includes("fetch failed")) {
          window.confirm(
            "Failed to connect with database. Check your network connection and try again later..."
          );
        } else {
          window.confirm(
            "Some Unexpected error while fetching course." +
              getCourseStatus.error
          );
        }
      }
    })();
  }, []);

  useEffect(() => {
    console.log("New Tasks: ", newTasks);
  }, [newTasks]);

  const [readyToRender, setReadyToRender] = useState(false);

  // Below condition false && false => true
  if (tasks && !readyToRender) {
    // console.log(tasks);
    const tasks2D = Tasks.groupAndSortTasks([...tasks]);
    setCourse({
      ...course,
      totalDays: tasks2D.length,
      totalTasks: tasks.length,
    });
    setTasks([...tasks2D]);
    setReadyToRender(true);
  }

  if (!readyToRender) {
    return (
      <>
        <p className="">Loading Tasks...</p>
      </>
    );
  }

  function addNewDayHandler() {
    let lastDayIndex = tasks.length - 1;
    if (tasks[lastDayIndex].length == 0) {
      window.confirm(
        `New day cannot be added, as day ${
          lastDayIndex + 1
        } does not have any tasks. Add tasks to ${lastDayIndex + 1} first.`
      );
    } else {
      console.log("Adding new day to course");
      setTasks([...tasks, []]);
    }
  }

  function addNewTaskHandler(day) {
    console.log("Adding new task to day: ", day);
    setShowTaskForm(true);
  }

  function pushNewTaskHandler(task) {
    console.log(`Pushing new task to day ${task.day}: `, task);
    console.log(tasks);
    /** Comment
     * Index of this task is equal to the length of total tasks in the tasks[day] array, as index of last element of tasks[day] = length-1.
     * task.day stores the day as integer, original index 'i' of that day in the tasks matrix is task.day-1
     */
    let taskIndex = tasks[task.day - 1].length;
    if (taskIndex == 0) {
      taskIndex = 1;
    }
    task.index = taskIndex;
    const tempTasks = [...tasks];
    tempTasks[task.day - 1].push(task);
    setTasks([...tempTasks]);
    if (!newTasks.includes([task.day, task.index])) {
      setNewtasks([...newTasks, [task.day, task.index]]);
    }
    setShowTaskForm(false);
  }

  return (
    <>
      <h2 className="text-center">Tasks</h2>
      <div className="accordion accordion-flush" id="accordion-tasks-daywise">
        {tasks &&
          tasks.map((dayTasks, index) => (
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
                  <TaskDayWise
                    tasks={[...dayTasks]}
                    day={index + 1}
                    addNewTaskHandler={addNewTaskHandler}
                  />
                  <AddTaskForm
                    show={showTaskForm}
                    setShow={setShowTaskForm}
                    day={index + 1}
                    submitHandler={pushNewTaskHandler}
                  />
                </div>
              </div>
            </div>
          ))}
      </div>
      <button
        className="border border-3 text-center py-3 col-12"
        onClick={addNewDayHandler}
      >
        Add New Day
      </button>
    </>
  );
}

/**
 * tasks is a 2D array.
 * When new day is created, push a new array to the 'tasks' array.
 * When a new task is added to a day, push an object of task to the corresponding array of that day in the 'tasks' array.
 * Use another array to track which tasks are edited.
 * This array is also a 2D array.
 *  Each array(element) in this 2D array has 2 integers stored, which are used to track which task is newly added.
 * If it stores[[1, 2], [1, 3], [2,2]], then it means Day 1 task 2, Day 1 task 3, and Day 2, task 2 are newly added.
 */
