"use client";

import User from "@/frontend/modules/entities/User";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function UserDashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // console.log(User.user);
    setUser(User.user);
  }, []);

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
      <h1 className="">
        Welcome,{" "}
        <span className="">
          {user?.user_metadata.first_name || "First Name"}
        </span>
        &nbsp;
        <span className="">{user?.user_metadata.last_name || "Last Name"}</span>
      </h1>
      <button className="" onClick={logoutHandler}>
        Logout
      </button>

      {user?.user_metadata.role.includes("mentor") ? (
        <button className="">
          <a href="/mentor" className="">
            Mentor Dashboard
          </a>
        </button>
      ) : (
        "Not Mentor"
      )}
    </div>
  );
}
