/**
 * Main Dashboard of all users with an account
 */

"use client";
import { User } from "@/modules/entities/User";
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

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <div>
      <h1 className="text-center">User Dashboard</h1>
      <p className="fs-3">Welcome to PBL Academy</p>
      <p className="">Enroll in some course to start learning</p>
      <div className="profile">
        <h2>Profile</h2>
      </div>
    </div>
  );
}

export default UserDashboard;
