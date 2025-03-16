import Mentor from "@/frontend/modules/entities/Mentor";
import User from "@/frontend/modules/entities/User";
import { useEffect, useState } from "react";
import { Offcanvas } from "react-bootstrap/esm";

export default function CreateClassroomForm({ course, show, setShow }) {
  const [formData, setFormData] = useState({
    created_by: User.user.id,
    main_mentor: User.user.id,
    start_date: null,
    course_id: course.id,
    enrollment_price: 1,
    total_seats: 0,
  });

  useEffect(() => {
    console.log("Form Data: ", formData);
  }, [formData]);

  async function createClassroomHandler(event) {
    event.preventDefault();
    console.log(
      `Creating New Classroom for course '${course.title}' with data:`,
      formData
    );
    const createStatus = await Mentor.createClassroom(formData);
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
        >
          <label className="d-block mb-4">
            Start Date
            <input
              type="date"
              required
              className="d-block"
              onChange={(event) =>
                setFormData({
                  ...formData,
                  start_date: event.target.value,
                })
              }
            />
          </label>
          <label className="d-block mb-4">
            Enrollment Price
            <input
              type="number"
              required
              min={50}
              className="d-block"
              onChange={(event) =>
                setFormData({
                  ...formData,
                  enrollment_price: +event.target.value,
                })
              }
            />
          </label>
          <label className="d-block mb-4">
            Total Seats
            <input
              type="number"
              required
              min={5}
              className="d-block"
              onChange={(event) =>
                setFormData({
                  ...formData,
                  total_seats: +event.target.value,
                })
              }
            />
          </label>
          <button className="btn btn-success" type="submit">
            Create Classroom
          </button>
        </form>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
