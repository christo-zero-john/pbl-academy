import TaskDayWise from "@/frontend/components/courses/task-day-wise";
import { useState } from "react";
import {
  Offcanvas,
  OffcanvasBody,
  OffcanvasHeader,
  OffcanvasTitle,
} from "react-bootstrap";
import MarkAsDoneBtn from "./classrooms/btn__mark-as-done";

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
  setCompletedTasks = null,
}) {
  console.log("Completed Tasks: ", completedTasks);

  const [show, setShow] = useState(false);
  const [offCanvasContent, setOffCanvasContent] = useState({
    title: "Failed to load",
    description: "Failed to load!",
  });
  const [currentTask, setCurrentTask] = useState(null);

  /**
   * Used to display a particular task item.
   * The day and taskindex can be used to access particular task in the task array.
   */

  function viewTaskItem(day, taskIndex) {
    const [d, t] = [day - 1, taskIndex];
    setOffCanvasContent({
      title: tasks[d][t].title,
      description: tasks[d][t].description,
    });
    setShow(true);
    setCurrentTask(tasks[d][t].id);
  }

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
                    classroom={classroom}
                    viewTaskItem={viewTaskItem}
                  />
                </div>
              </div>
            </div>
          ))}
      </div>

      <Offcanvas show={show} onHide={() => setShow(false)} className="w-100">
        <OffcanvasHeader
          closeButton
          className="border-bottom border-3 border-warning"
        >
          <OffcanvasTitle>{offCanvasContent.title}</OffcanvasTitle>
        </OffcanvasHeader>
        <OffcanvasBody>
          <div
            className=""
            dangerouslySetInnerHTML={{ __html: offCanvasContent.description }}
          ></div>

          <MarkAsDoneBtn
            currentTask={currentTask}
            completedTasks={completedTasks}
            setCompletedTasks={setCompletedTasks}
          />
        </OffcanvasBody>
      </Offcanvas>
    </>
  );
}
