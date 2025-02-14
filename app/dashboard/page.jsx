/**
 * Main Dashboard of all users with an account
 */

"use client";
import { User } from "@/modules/entities/User";
import { useEffect } from "react";

function UserDashboard() {
  useEffect(() => {
    async function execPromise() {
      let loginStatus = await User.checkAuth();
      console.log("Login Status: ", loginStatus);
    }
    execPromise();
  }, []);

  return <div>UserDashboard</div>;
}

export default UserDashboard;
