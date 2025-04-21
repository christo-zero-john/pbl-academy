import Link from "next/link";

export default function MentorDasboard() {
  return (
    <div>
      <h1 className="text-center">Welcome Mentor</h1>
      <Link href="/courses/mentor/all-courses">All Courses</Link> <br />
      <Link href="/courses/mentor/create-course">New Course</Link>
    </div>
  );
}
