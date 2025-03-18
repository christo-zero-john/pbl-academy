export default function EnrollToClassroom({ classroom }) {
  async function enrollTOClassroomHandler() {
    console.log("Enrolling to classroom");
    const confirmAction = window.confirm(
      "Are you sure you want to enroll to this classroom??"
    );
    if (confirmAction) {
      console.log("User ready to enroll to classroom");
    }
  }

  return (
    <button className="btn btn-primary m-2" onClick={enrollTOClassroomHandler}>
      Enroll <span className="">₹{classroom.enrollment_price}</span>{" "}
    </button>
  );
}
