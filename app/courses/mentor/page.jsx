import Link from "next/link";

export default function MentorDasboard() {
  return (
    <div>
      <Link href="/courses/mentor/all-courses">All Courses</Link> <br />
      <Link href="/courses/mentor/create-course">New Course</Link>
    </div>
  );
}
