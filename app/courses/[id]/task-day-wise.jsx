export default function TaskDayWise({ tasks, day }) {
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
              <div className="accordion-body">{task.description}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
