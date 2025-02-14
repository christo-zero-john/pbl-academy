"use client";
import { User } from "@/modules/entities/User";
import Link from "next/link";
import { useRouter } from "next/navigation";

function SignUp() {
  const router = useRouter();

  async function signUphandler(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const email = formData.get("email");
    const password = formData.get("password");

    if (!email || !password) {
      window.confirm("Email or password is missing");
      return;
    }

    const { data, error } = await User.signUp(email, password);

    if (error) {
      console.log("Error during sign up: ", error);

      const errorMessage = error.message || "An error occurred during sign up";
      console.log(error.message);
      window.confirm(errorMessage);
    } else {
      window.confirm("Account Created Successfully. Login to continue");
      const params = new URLSearchParams({
        email: encodeURIComponent(email),
        password: encodeURIComponent(password),
      });
      router.push(`/auth/login?${params}`);
    }
  }

  return (
    <div>
      <form onSubmit={signUphandler} className="">
        <h1 className="">Create Account</h1>
        <label className="">
          <input
            type="text"
            className=""
            name="email"
            placeholder="Enter Email"
          />
        </label>
        <label className="">
          <input
            type="text"
            className=""
            name="password"
            placeholder="Enter Password"
          />
        </label>
        <button className="" type="submit">
          Create Account
        </button>
        <p className="">
          Already have an account?
          <Link href="/auth/login">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default SignUp;
