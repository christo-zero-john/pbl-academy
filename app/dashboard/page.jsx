/**
 * Main Dashboard of all users with an account
 */

"use client";
import { User } from "@/frontend/modules/entities/User";
import Link from "next/link";
import { useEffect, useState } from "react";

function UserDashboard() {
  const [user, setUser] = useState({
    email: "email",
    email_verified: false,
    first_name: "first",
    last_name: "last",
    phone_verified: false,
    role: "",
    sub: "40c8bed7-f923-47df-8934-afa249fb9388",
  });

  useEffect(() => {
    async function execPromise() {
      let loginStatus = await User.checkAuth();
      console.log("Login Status: ", loginStatus);
      if (loginStatus.status == 1) {
        setUser(loginStatus.user.user_metadata);
      }
    }
    execPromise();
  }, []);

  return (
    <div>
      <h1 className="text-center">User Dashboard</h1>
      <p className="fs-3">Welcome to PBL Academy</p>
      <p className="">Enroll in some course to start learning</p>
      <div className="profile">
        <h2 className="">Profile</h2>
        <p className="">
          <span className="">{user.first_name}</span> &nbsp;
          <span className="">{user.last_name}</span>
        </p>
        <p className="">
          <span className="me-2">{user.email}</span>
          <span className="">
            {(user.email_verified && "Email Verified") || "Email Not Verified"}
          </span>
        </p>
        <p className="">{user.role}</p>
        {user.role.includes("admin") && (
          <Link href="/admin/dashboard/">Admin Dashboard</Link>
        )}
      </div>
    </div>
  );
}

export default UserDashboard;
