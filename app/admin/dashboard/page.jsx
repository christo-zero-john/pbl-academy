import Link from "next/link";

export default function AdminPage() {
  return (
    <div>
      <Link href="/admin/manage/users">Manage Users</Link>
      <br />
      <Link href="/admin/manage/mentors">Manage Mentors</Link>
      <br />
      <Link href="/admin/manage/learners">Manage Learners</Link>
      <br />
      <Link href="/admin/manage/courses">Manage Courses</Link>
      <br />
      <Link href="/admin/manage/programmes">Manage Programmes</Link>
      <br />
    </div>
  );
}
