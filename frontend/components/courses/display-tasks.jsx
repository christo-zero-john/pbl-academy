import TaskDayWise from "@/frontend/components/courses/task-day-wise";

/**comment
 * This componsnt is used in course-item and edit-tasks pages.
 * @var props with @default null value means thay are optional props passed only from edit-task page.
 * @param tasks It is a 2D array of tasks related to a course.
 * @param classroom It is a boolean value. If true, then it means this component is used in classroom page.
 * @param addNewTaskHandler It is a function which is used to add new task. It is passed from edit-task page. It is passed only if the user is mentor of the course.
 */

export default function DisplayTasks({
  tasks,
  addNewTaskHandler = null,
  classroom = false,
  completedTasks = [],
}) {
  console.log("Displaying Course tasks");
  if (tasks.length === 0) {
    return <p>No tasks added yet.</p>;
  }

  if (tasks.length === 1 && tasks[0].length === 0) {
    return <p>No tasks found for existing day.</p>;
  }

  return (
    <>
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
                  Day {dayTasks[0]?.day || index + 1}
                </button>
              </h2>
              <div
                id={"flush-collapse-day-" + (index + 1)}
                className="accordion-collapse collapse"
                data-bs-parent="#accordion-tasks-daywise"
              >
                <div className="accordion-body">
                  <TaskDayWise
                    tasks={dayTasks}
                    day={dayTasks[0]?.day || index + 1}
                    addNewTaskHandler={addNewTaskHandler}
                    completedTasks={completedTasks}
                  />
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
