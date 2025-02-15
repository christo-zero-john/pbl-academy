/**
 * Home page or the Root Page of the Application
 */

import Link from "next/link";

function HomePage() {
  return (
    <div>
      <Link href="/auth/sign-up">Signup/Login</Link>
      <br />
      <Link href="/dashboard">Dashboard</Link>
    </div>
  );
}

export default HomePage;
