import { useState } from "react";
import {
  Offcanvas,
  OffcanvasBody,
  OffcanvasHeader,
  OffcanvasTitle,
} from "react-bootstrap";

export default function TaskDayWise({
  tasks,
  day,
  addNewTaskHandler = null,
  completedTasks = [],
}) {
  // The below check is needed as tasks needed to be grouped, sorted and converted into a 2D array. If it is not a 2D array, it will cause error in the task.map method below in the return statement.

  // console.log("Tasks of Day: ", tasks);
  console.log("Completed Tasks: ", completedTasks);

  const [show, setShow] = useState(false);
  const [offCanvasContent, setOffCanvasContent] = useState({
    title: "",
    description: "",
  });

  function viewTaskItem(index) {
    console.log(index);
    console.log(tasks[index]);
    setOffCanvasContent({
      title: tasks[index].title,
      description: tasks[index].description,
    });
    setShow(true);
  }

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
          <div className="d-block" key={`${index}-${day}`}>
            {" "}
            <p
              className="link-primary d-inline-block"
              onClick={() => viewTaskItem(index)}
            >
              {" "}
              {task.index || index + 1}. {task.title}
            </p>
            <input
              type="checkbox"
              checked={completedTasks.includes(task.id)}
              className="float-end"
              id={`${index}-${day}`}
            />
          </div>
        ))}

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
          </OffcanvasBody>
        </Offcanvas>
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
