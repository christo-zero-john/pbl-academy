"use client";

import NavBar from "@/frontend/components/common/nav-bar";
import DasboardOptions from "@/frontend/components/routes/dashboard/dasboard-options";
import User from "@/frontend/modules/entities/User";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function UserDashboard() {
  const [user, setUser] = useState(null);
  const [option, setOption] = useState("learner");

  useEffect(() => {
    // console.log(User.user);
    setUser(User.user);
  }, []);

  async function logoutHandler() {
    const response = await User.logout();
    console.log(response);
    if (response.success) {
      window.confirm("Logged Out successfully");
      redirect("/auth#login");
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
    <>
      <NavBar />
      <DasboardOptions option={option} setOption={setOption} />
      {
        option=="learner"&&<LearnerDashboard/>
      }      
    </>
  );
}
