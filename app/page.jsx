import User from "@/frontend/modules/entities/User";
import Link from "next/link";

export default function HomePage() {
  useEffect(() => {
    console.log(User.getUser());
  });
  return (
    <>
      <Link href="/auth/login">Login / Signup</Link> <br />
      {User.getUser().success && (
        <Link href="/dashboard">Logged In. Go to Dashboard</Link>
      )}
    </>
  );
}
