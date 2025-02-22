import User from "@/frontend/modules/entities/User";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <Link href="/auth/login">Login / Signup</Link> <br />
      <Link href="/dashboard">User Dashboard</Link>
      <br />
      <Link href="/mentor/courses/create">Create Course</Link>
    </>
  );
}
