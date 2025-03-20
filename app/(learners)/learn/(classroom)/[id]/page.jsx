"use client";
import { useParams } from "next/navigation";

/**
 * Displays course classroom
 */
export default function ClassroomPage() {
  const params = useParams();
  const classroomID = params.id;
  console.log(classroomID);
  return <div>ClassroomPage</div>;
}
