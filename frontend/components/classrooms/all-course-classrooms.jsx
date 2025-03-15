import { Offcanvas, Accordion } from "react-bootstrap";

export default function AllCourseClassrooms({ courseID, show, setShow }) {
  return (
    <>
      <Offcanvas
        show={show}
        onHide={() => setShow(false)}
        backdrop="static"
        className="w-100"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>All Classrooms</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Accordion defaultActiveKey="null" flush>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Accordion 1</Accordion.Header>
              <Accordion.Body>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eum,
                maxime! Animi sed laborum nihil harum quibusdam magnam
                cupiditate officia nesciunt dolorem molestiae optio consectetur
                rem veritatis quaerat adipisci debitis fuga sit blanditiis unde,
                expedita accusantium?
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
