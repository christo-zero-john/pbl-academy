export default function TaskDayWise({ tasks, day }) {
  return (
    <>
      <div
        class="accordion accordion-flush"
        id={"accordion-tasks-of-day-" + day}
      >
        {tasks.map((task, index) => (
          <div class="accordion-item" key={index}>
            <h2 class="accordion-header">
              <button
                class="accordion-button collapsed"
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
              class="accordion-collapse collapse"
              data-bs-parent={"#accordion-tasks-of-day-" + day}
            >
              <div class="accordion-body">{task.description}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
