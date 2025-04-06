import Classroom from "@/frontend/modules/entities/Classroom";
import User from "@/frontend/modules/entities/User";
import { useRouter } from "next/navigation";

export default function EnrollToClassroom({ classroom, course }) {
  const router = useRouter();
  async function enrollToClassroomHandler() {
    console.log("Enrolling to classroom");
    const confirmAction = window.confirm(
      "Are you sure you want to enroll to this classroom?"
    );
    if (confirmAction) {
      console.log("User ready to enroll in classroom");
      const enrollmentData = {
        learner_id: User.user.id,
        classroom_id: classroom.id,
      };
      const enrollmentStatus = await Classroom.enrollToClassroom(
        enrollmentData
      );

      if (enrollmentStatus.success) {
        /**
         * After the user is enrolled then redirect to course classroom. Classroom link has 3 parts classroom_id, course_id, and course_title. coure title is splitted, joined and converted to lowercase
         */
        window.confirm("Successfully enrolled to classroom");
        router.push(
          `/learn/${enrollmentStatus.classrooms.classroom_id}-${
            course.id
          }-${course.title.split(" ").join("-").toLowerCase()}`
        );
      } else {
        window.confirm(
          `Some problem occurred while enrolling: ${enrollmentStatus.error.message} `
        );
      }
    } else {
      console.log("User refused to enroll in classroom");
    }
  }

  return (
    <button className="btn btn-primary m-2" onClick={enrollToClassroomHandler}>
      Enroll <span className="">₹{classroom.enrollment_price}</span>{" "}
    </button>
  );
}
