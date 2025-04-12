"use client";
import ClassroomTasks from "@/frontend/components/learners/learn/classroom/tasks/classroom-tasks";
import { useParams } from "next/navigation";
import { useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
/**
 * Displays course classroom
 */
export default function ClassroomPage() {
  // The url parameter has classroom id, course id and course title seprated with hyphens
  const params = useParams();
  const [classroomID, courseID, courseTitle] = params.id.split("-");
  const [classroomData, setClassroomData] = useState({
    totalTasks: 0,
    completionPercentage: 0,
    completedTasks: 0,
  });

  return (
    <div>
      <h1 className="text-center m-4">
        <span className="fs-4 d-block">Learn</span>{" "}
        <span className="text-success">{courseTitle.split("-").join(" ")}</span>
      </h1>

      <Tabs
        defaultActiveKey="tasks"
        id="justify-tab-example"
        className="mb-3"
        justify
      >
        <Tab eventKey="tasks" title="Activities">
          <ClassroomTasks
            classroomID={classroomID}
            courseID={courseID}
            classroom={{
              classroomData: classroomData,
              setClassroomData: setClassroomData,
            }}
          />
        </Tab>
        <Tab eventKey="learners" title="Learners">
          Tab content for Profile
        </Tab>
        <Tab eventKey="longer-tab" title="Group Discussion">
          Tab content for Group Chat
        </Tab>
        <Tab eventKey="contact" title="Details">
          Tab content for Course deatils
        </Tab>
      </Tabs>
    </div>
  );
}

/**
 * Fetch classroom and course details. ✅
 * Extract, group and sort tasks. ✅
 * Display tasks daywise along with mark as completed buton. ✅
 * When clicked on a task, display task details in an offcanvas. ✅
 */
