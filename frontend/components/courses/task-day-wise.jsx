export default function TaskDayWise({
  tasks,
  day,
  addNewTaskHandler = null,
  classroom = false,
  viewTaskItem = null,
  completedTasks = [],
}) {
  // The below check is needed as tasks needed to be grouped, sorted and converted into a 2D array. If it is not a 2D array, it will cause error in the task.map method below in the return statement.

  // console.log("Tasks of Day: ", tasks);

  if (!Array.isArray(tasks)) {
    return (
      <>
        <p className="">Loading Tasks of Day...</p>
      </>
    );
  }

  return (
    <>
      <div
        className="accordion accordion-flush"
        id={"accordion-tasks-of-day-" + day}
      >
        {tasks.map((task, index) => (
          <div
            className="alert alert-success border-0 rounded-0  m-0"
            key={`${index}-${day}`}
            onClick={() => viewTaskItem(day, index)}
          >
            {" "}
            <p className="link-primary d-inline-block p-0 m-0">
              {" "}
              {task.index || index + 1}. {task.title}
            </p>
            {
              // If the task is displayed in a classroom, then show the checkbox
              classroom && (
                <input
                  type="checkbox"
                  className="form-check-input float-end"
                  checked={completedTasks.includes(task.id)}
                  id={`${index}-${day}`}
                />
              )
            }
          </div>
        ))}
      </div>
      {
        /**
         * This component is used in edit-task and course pages. Only edit-task page @function addNewTaskhandler.
         * If @function addNewTaskhandler is present it means this is an edit page. Then we can show the 'Add New Task' button.
         */
        addNewTaskHandler && (
          <button
            className="border border-3 text-center py-3 col-12"
            onClick={() => addNewTaskHandler(day)}
          >
            Add New Task
          </button>
        )
      }
    </>
  );
}
{
  /* <div
                className="accordion-body"
                dangerouslySetInnerHTML={{ __html: task.description }}
              ></div> */
}
