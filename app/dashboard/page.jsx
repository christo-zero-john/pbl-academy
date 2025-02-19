"use client";

import User from "@/frontend/modules/entities/User";
import { redirect } from "next/navigation";

export default function UserDashboard() {
  async function logoutHandler() {
    const response = await User.logout();
    console.log(response);
    if (response.success) {
      window.confirm("Logged Out successfully");
      redirect("/auth/login");
    } else {
      window.confirm(response.error);
    }
  }

  return (
    <div>
      <button className="" onClick={logoutHandler}>
        Logout
      </button>
    </div>
  );
}
