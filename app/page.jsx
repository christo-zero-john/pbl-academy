import Link from "next/link";

function HomePage() {
  return (
    <div>
      <Link href="/auth/sign-up">Create Account</Link>
    </div>
  );
}

export default HomePage;
