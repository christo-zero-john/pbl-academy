import Classroom from "@/frontend/modules/entities/Classroom";
import User from "@/frontend/modules/entities/User";

export default function EnrollToClassroom({ classroom }) {
  async function enrollTOClassroomHandler() {
    console.log("Enrolling to classroom");
    const confirmAction = window.confirm(
      "Are you sure you want to enroll to this classroom??"
    );
    if (confirmAction) {
      console.log("User ready to enroll in classroom");
      const enrollmentData = {
        learner_id: User.user.id,
        classroom_id: classroom.id,
      };
      Classroom.enrollToClassroom(enrollmentData);
    } else {
      console.log("User refused to enroll in classroom");
    }
  }

  return (
    <button className="btn btn-primary m-2" onClick={enrollTOClassroomHandler}>
      Enroll <span className="">₹{classroom.enrollment_price}</span>{" "}
    </button>
  );
}
