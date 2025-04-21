import Link from "next/link";
export default function DasboardOptions() {
  return (
    <>
      <Link href="/mentor/dashboard">Mentor Dashboard</Link>
      <Link href="/dashboard">Learner Dashboard</Link>
      <Link href="/admin/dashboard">Admin Dashboard</Link>
    </>
  );
}
