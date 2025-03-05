export default function TaskDayWise({ tasks, day, addNewTaskHandler = null }) {
  // The below check is needed as tasks needed to be grouped, sorted and converted into a 2D array. If it is not a 2D array, it will cause error in the task.map method below in the return statement.
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
          <div className="accordion-item" key={index}>
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={
                  "#flush-collapse-day-" + day + "-task-" + (index + 1)
                }
                aria-expanded="false"
                aria-controls={
                  "flush-collapse-day-" + day + "-task-" + (index + 1)
                }
              >
                Task {index + 1}
              </button>
            </h2>
            <div
              id={"flush-collapse-day-" + day + "-task-" + (index + 1)}
              className="accordion-collapse collapse"
              data-bs-parent={"#accordion-tasks-of-day-" + day}
            >
              <div
                className="accordion-body"
                dangerouslySetInnerHTML={{ __html: task.description }}
              ></div>
            </div>
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
