import { Offcanvas } from "react-bootstrap";

export default function ManageClassrooms({ show, setShow, course }) {
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
        <Offcanvas.Title className="text-center w-100">
          Manage Classrooms
          <span className="fs-4 text-success d-block fs-5">{course.title}</span>
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        
      </Offcanvas.Body>
    </Offcanvas>
  );
}
