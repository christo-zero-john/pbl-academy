import EnrollmentOptions from "../courses/classrooms/enrollment-options";

export default function ManageClassrooms__Mentor({ course }) {
  return <EnrollmentOptions course={course} mentor={true} />;
}
