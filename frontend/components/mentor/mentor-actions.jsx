import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Offcanvas } from "react-bootstrap";
import PublishedCourse__Mentor from "./actions__published-course";
import UnPublishedCourse__Mentor from "./actions__unpublished-course";

export default function MentorActions({ course, setCourse }) {
  const [show, setShow] = useState(false);
  const [offcanvasBody, setOffcanvasBody] = useState(<></>);

  useEffect(() => {
    setDefaultOffcanvasBody();
  }, []);

  // Default Offcanvas body
  function setDefaultOffcanvasBody() {
    setOffcanvasBody(
      <>
        <Link
          href={`/courses/mentor/edit-course/${course.id}`}
          className="btn btn-primary mx-2"
        >
          Edit Course Details
        </Link>

        <Link
          href={`/courses/mentor/edit-course/${course.id}/tasks`}
          className="btn btn-primary mx-2"
        >
          Manage Tasks
        </Link>

        {course.published ? (
          <PublishedCourse__Mentor
            course={course}
            setCourse={setCourse}
            offcanvasBody={offcanvasBody}
            setOffcanvasBody={setOffcanvasBody}
          />
        ) : (
          <UnPublishedCourse__Mentor
            course={course}
            setCourse={setCourse}
            offcanvasBody={offcanvasBody}
            setOffcanvasBody={setOffcanvasBody}
            setPreviousOffCanvasBody={setDefaultOffcanvasBody}
          />
        )}
      </>
    );
  }

  return (
    <div className="">
      <button className="btn btn-primary m-2" onClick={() => setShow(true)}>
        Manage Course
      </button>
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
            <span className="fs-4 text-success d-block">{course.title}</span>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {
            // A useState variable used to set offcanvas bofy as it requires to frequently update offcanvas body in other components
            offcanvasBody
          }
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}
