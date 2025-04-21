import ClassroomItem from "../../courses/classrooms/classroom-item";

export default function LearnerDashboard() {
  return (
    <div>
      <h1 className="text-center">Welcome Learner</h1>
      <p className="fw-600 fs-3">Classrooms</p>
      <ClassroomItem />
    </div>
  );
}
