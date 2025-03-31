import { Offcanvas } from "react-bootstrap";
import AllCourseClassrooms from "../classrooms/all-course-classrooms";
import ManageClassroomItem__Mentor from "./manage-classroom-item";

export default function ManageClassrooms__Mentor({ course }) {
  return (
    <AllCourseClassrooms
      course={course}
      mentor={true}
    />
  );
}
