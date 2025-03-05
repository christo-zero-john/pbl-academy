import TaskDayWise from "@/app/courses/[id]/task-day-wise";
import AddTaskForm from "./add-task-form";

/**comment 
 * This componsnt is used in course-item and edit-tasks pages.
 * @var props with @default null value means thay are optional props passed only from edit-task page.
 * @param tasks It is a 2D array of tasks related to a course.
 * @param pushNewTaskHandler It is a function to handle adding new task to the 2D tasks array in the edit-task page. It pushes new task to the @var tasks[day] array and stores an a reference of this new modification in another 2D array named @var newTasks in edit-tasks page
 * @param showTaskForm and @param setShowTaskForm is used to handle a boolean state of whether to show or hide edit-task form in the edit-task page.
 * In reality, edit-task form is inserted in this component
*/
export default function RenderTasks({
  tasks,
  pushNewTaskHandler = null,
  showTaskForm = null,
  setShowTaskForm = null,
}) {
  function addNewTaskHandler(day) {
    console.log("Adding new task to day: ", day);
    setShowTaskForm(true);
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
                  {
                    /**
                     * This component is used in edit-task and course pages. Only edit-task page @function pushNewTaskHandler.
                     * If @function pushNewTaskHandler is present it means this is an edit page. Then we can show the 'Add Task Form' offcanvas.
                     */
                    pushNewTaskHandler && (
                      <AddTaskForm
                        show={showTaskForm}
                        setShow={setShowTaskForm}
                        day={index + 1}
                        submitHandler={pushNewTaskHandler}
                      />
                    )
                  }
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
