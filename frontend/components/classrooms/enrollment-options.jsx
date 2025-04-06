import Course from "@/frontend/modules/entities/Course";
import Classroom from "@/frontend/modules/entities/Classroom";
import { useState, useEffect } from "react";
import { Offcanvas } from "react-bootstrap";
import EnrollToClassroom from "./enroll-to-classroom";
import ManageClassroomItem__Mentor from "../mentor/manage-classroom-item";
import User from "@/frontend/modules/entities/User";

export default function EnrollmentOptions({ course, mentor = false }) {
  console.log("Rendering Classrroms of course ", course.id);
  console.log("Viewed by mentor. Rendering mentor actions");
  const [classrooms, setClassrooms] = useState(null);
  const [show, setShow] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState([false, null]);

  // This useEffect fetches the classrooms and sets classrooms state
  useEffect(() => {
    /**
     *  The below is a Immediately Invoked Function Expression which is an async function to fetch classrooms from supabase. It is used as we can't directly use await statement inside  useEffect.
     */

    (async () => {
      console.log(User.user.id);
      console.log("Fetching classrooms");
      const getClassroomStatus = await Course.fetchClassrooms(course.id);

      if (getClassroomStatus.success) {
        console.log("Successfully fetched course classrooms");
        // We should optimize classrooms to be used in the component
        console.log(
          "Before Optimization. Classrooms: ",
          getClassroomStatus.classrooms,
          "course: ",
          course
        );
        const optimizedClassrooms = Classroom.optimizeClassroomItems(
          getClassroomStatus.classrooms,
          course
        );
        console.log(optimizedClassrooms);

        // check whether enrolled or not and set the isEnrolled state
        setIsEnrolled(Classroom.checkEnrollment(optimizedClassrooms));

        // Finally set the classrooms state
        setClassrooms(optimizedClassrooms);
      } else {
        console.log("Error fetching course classrooms");
        window.confirm(
          `Could'nt fetch classrooms: ${getClassroomStatus.error.message}`
        );
      }
    })();
  }, []);

  console.log(isEnrolled);

  if (!classrooms) {
    return <p className="btn btn-primary d-inline-block">Loading....</p>;
  } else {
    if (classrooms.length == 0) {
      return <p className="">No classrooms for this course</p>;
    }
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
          {!show &&
            (isEnrolled[0] ? (
              <button
                className="btn btn-primary"
                onClick={() =>
                  (window.location.href = `/learn/${isEnrolled[1]}`)
                }
              >
                Goto Classroom
              </button>
            ) : (
              <button className="btn btn-primary" onClick={() => setShow(true)}>
                Enrollment Options
              </button>
            ))}
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
