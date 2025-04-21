import { useEffect, useState } from "react";
import ClassroomItem from "../../courses/classrooms/classroom-item";
import Enrollments from "@/frontend/modules/entities/Enrollments";
import User from "@/frontend/modules/entities/User";

export default function LearnerDashboard() {
  const [classrooms, setClassrooms] = useState([]);

  useEffect(() => {
    (async () => {
      console.log("Fetching Classrooms of learner");
      const getClassroomsStatus = await Enrollments.getEnrollmentsOfLearner(
        User.user.id
      );

      if (getClassroomsStatus.success) {
        console.log(
          "Successfully fetched courses",
          getClassroomsStatus.classrooms
        );
        setClassrooms(getClassroomsStatus.classrooms);
      } else {
        if (getClassroomsStatus.error.message.includes("fetch failed")) {
          window.confirm("Check your network connection");
        } else {
          window.confirm("Some unexpected Error while Fetching Classrooms...");
        }
      }
    })();
  }, []);

  useEffect(() => console.log(classrooms, [classrooms]));

  return (
    <div>
      <h1 className="text-center">Welcome Learner</h1>
      <p className="fw-600 fs-3">Classrooms</p>
      {classrooms.length > 0 ? (
        <div className="row mx-0">
          {classrooms.map((classroom) => {
            return <ClassroomItem key={classroom.id} classroom={classroom} />;
          })}
        </div>
      ) : (
        <div className="text-center">Your classrooms appears here</div>
      )}
    </div>
  );
}
