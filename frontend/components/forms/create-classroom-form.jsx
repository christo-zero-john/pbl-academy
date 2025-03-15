import { useState } from "react";
import { Offcanvas } from "react-bootstrap/esm";

export default function CreateClassroomForm({ course, show, setShow }) {
  const [formData, setFormData] = useState({});

  async function createClassroomHandler(event) {
    event.preventDefault();
    console.log("Creating New Classroom for course: ", course.id);
  }

  return (
    <Offcanvas
      show={show}
      onHide={() => setShow(false)}
      backdrop="static"
      className="w-100"
    >
      <Offcanvas.Header
        closeButton
        className="border-bottom border-3 border-warning"
      >
        <Offcanvas.Title>
          <span className="fs-6 d-block">Create New Classroom for</span>{" "}
          <span className="d-block fs-2 text-success">{course.title}</span>
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <form
          method="POST"
          className="col-12"
          onSubmit={createClassroomHandler}
        ></form>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
