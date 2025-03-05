import TextEditor from "@/frontend/components/text-editor/text-editor";
import User from "@/frontend/modules/entities/User";
import { useState } from "react";
import AddResourceLinksForm from "./add-resource-links-form";

export default function AddTaskForm({
  show = false,
  setShow,
  day,
  submitHandler,
}) {
  console.log("day: ", day);
  const [task, setTask] = useState({
    course_id: "",
    description: "",
    day: day,
    index: null,
    created_by: User.user.id,
    duration: [0, 0],
    title: "",
  });

  function setDescription(description) {
    description = description.trim();
    setTask({
      ...task,
      description: description,
    });
  }

  function formSubmitHandler(event) {
    event.preventDefault();
    if (task.description.length <= 100) {
      window.confirm("Task Description must contain atleast 100 letters.");
    } else {
      submitHandler(task);
      setShow(false);
    }
  }
  return (
    <div
      class={`offcanvas col-12 wd-100 fixed-top ${show && "show"}`}
      data-bs-backdrop="static"
      tabindex="-1"
      id="staticBackdrop"
      aria-labelledby="add-task-form"
    >
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="add-task-form">
          Add new task to day {day}
        </h5>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
          onClick={() => setShow(false)}
        ></button>
      </div>
      <div class="offcanvas-body">
        <form method="POST" className="col-12" onSubmit={formSubmitHandler}>
          <input
            type="text"
            name="title"
            className="d-block col-12 col-md-6"
            required
            onChange={(event) =>
              setTask({
                ...task,
                title: event.target.value,
              })
            }
            max={100}
            placeholder="Task Title"
          />
          <label htmlFor="" className="d-block">
            Description
            <TextEditor initialContent="" onChange={setDescription} />
          </label>
          <AddResourceLinksForm />
          <button type="submit">Add New Task</button>
        </form>
      </div>
    </div>
  );
}
