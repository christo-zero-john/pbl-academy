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

  if (!user) {
    return <div className="">Fetching User data</div>;
  }

  if (user && !user.user_metadata.role) {
    return (
      <div className="">
        <span className="text-danger fw-bold">'First Login' error.</span> It
        seems Like there is some problem while login. We are trting to fix it as
        soon as possible. Please Logout and Login again to access your
        account...
        <button className="" onClick={logoutHandler}>
          Logout
        </button>
      </div>
    );
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

      {user?.user_metadata?.role.includes("mentor") ? (
        <button className="">
          <a href="/courses/mentor" className="">
            Mentor Dashboard
          </a>
        </button>
      ) : (
        "Not Mentor"
      )}
    </div>
  );
}
