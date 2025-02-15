import Link from "next/link";

export default function AdminPage() {
  return (
    <div>
      <Link href="/admin/manage/users">Manage Users</Link>
      <Link href="/admin/manage/mentors">Manage Mentors</Link>
      <Link href="/admin/manage/learners">Manage Learners</Link>
      <Link href="/admin/manage/courses">Manage Courses</Link>
      <Link href="/admin/manage/programmes">Manage Programmes</Link>
    </div>
  );
}
