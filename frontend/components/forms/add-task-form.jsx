import TextEditor from "@/frontend/components/text-editor/text-editor";
import User from "@/frontend/modules/entities/User";
import { useState, useEffect } from "react";
import AddResourceLinksForm from "../mentor/add-resource-links-form";
import { Offcanvas} from "react-bootstrap";

export default function AddTaskForm({
  show = false,
  setShow,
  day,
  submitHandler,
}) {
  // console.log("day in AddTaskForm: ", day);
  const [task, setTask] = useState({
    course_id: "",
    description: "",
    day: day || 1,
    index: null,
    created_by: User.user.id,
    duration: 1,
    title: "",
  });

  useEffect(() => {
    // console.log("Day prop changed to:", day);
    // Always update the task state when the form is shown, using a default of 1 if day is undefined
    setTask((prevTask) => ({
      ...prevTask,
      day: day || prevTask.day || 1,
    }));
  }, [day, show]); // React to both day and show changes

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
      const submitSuccess = submitHandler({ ...task });
      if (submitSuccess) {
        console.log("Successfully created new task");
        event.target.reset();
        setTask({
          course_id: "",
          description: "",
          day: day,
          index: null,
          created_by: User.user.id,
          duration: 1,
          title: "",
        });
      }
      setShow(false);
    }
  }

  return (
    <Offcanvas
      show={show}
      onHide={() => setShow(false)}
      backdrop="static"
      className="w-100"
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Add new task to day {day}</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
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
          <label htmlFor="duration">
            Task Duration{" "}
            <p className="p-0 m-2">
              <input
                type="number"
                min={1}
                max={60}
                className=""
                required
                placeholder="1 - 60"
                onChange={(event) =>
                  setTask({
                    ...task,
                    duration: +event.target.value, // + operator to cast string value to number
                  })
                }
              />{" "}
              minutes
            </p>
          </label>
          <AddResourceLinksForm />
          <button type="submit">Add New Task</button>
        </form>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
