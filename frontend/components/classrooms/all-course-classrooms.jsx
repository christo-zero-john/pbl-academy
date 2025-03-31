import Course from "@/frontend/modules/entities/Course";
import Classroom from "@/frontend/modules/entities/Classroom";
import { useState, useEffect } from "react";
import { Offcanvas } from "react-bootstrap";
import EnrollToClassroom from "./enroll-to-classroom";
import ManageClassroomItem__Mentor from "../mentor/manage-classroom-item";

export default function AllCourseClassrooms({
  course,
  show,
  setShow,
  mentor = false,
  mentorActions = <></>,
}) {
  console.log("Rendering Classrroms of course ", course.id);
  console.log("Viewed by mentor. Rendering mentor actions");
  const [classrooms, setClassrooms] = useState(null);

  // This useEffect fetches the classrooms and sets classrooms state
  useEffect(() => {
    /**
     *  The below is a Immediately Invoked Function Expression which is an async function to fetch classrooms from supabase. It is used as we can't directly use await statement inside  useEffect.
     */

    (async () => {
      console.log("Fetching classrooms");
      const getClassroomStatus = await Course.fetchClassrooms(course.id);

      if (getClassroomStatus.success) {
        console.log("Successfully fetched course classrooms");
        // We should optimize classrooms to be used in the component
        const optimizedClassrooms = Classroom.optimizeClassroomItems(
          getClassroomStatus.classrooms,
          course
        );
        setClassrooms(optimizedClassrooms);
      } else {
        console.log("Error fetching course classrooms");
        window.confirm(
          `Could'nt fetch classrooms: ${getClassroomStatus.error.message}`
        );
      }
    })();
  }, []);

  if (!classrooms) {
    return (
      <Offcanvas
        show={show}
        onHide={() => setShow(false)}
        backdrop="static"
        className="w-100"
      >
        Fetching Classrooms...
      </Offcanvas>
    );
  } else {
    // Displaying classrom items of course
    const offCanvasBody = classrooms.map((classroom, index) => (
      <div
        className="card p-2 m-2 d-flex flex-row justify-content-between align-items-center"
        key={index}
      >
        <div className="w-fit">
          <span className="d-block  fs-6">Cohort from</span>
          <span className="d-block text-success fw-600">
            {classroom.start_date.split("-").reverse().join("-")} to{" "}
            {classroom.end_date.split("-").reverse().join("-")}
          </span>
          <span className="fw-700">Seats: {classroom.total_seats}</span>
          <span className="d-block">
            Led By{" "}
            <span className="text-success fw-500">{classroom.created_by}</span>
          </span>
        </div>
        <EnrollToClassroom classroom={classroom} courseTitle={course.title} />
        {mentor && <ManageClassroomItem__Mentor classroom={classroom} />}
      </div>
    ));
    if (mentor == true) {
      return offCanvasBody;
    } else {
      return (
        <>
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
                <span className="fs-6 d-block">All Classrooms of</span>
                <span className="fs-4 text-success d-block">
                  {course.title}
                </span>
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>{offCanvasBody}</Offcanvas.Body>
          </Offcanvas>
        </>
      );
    }
  }
}
