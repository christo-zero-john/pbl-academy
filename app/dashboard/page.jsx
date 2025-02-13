"use client";
import { User } from "@/modules/entities/User";
import { useEffect } from "react";

function UserDashboard() {
  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    await User.checkLogin(1, "/auth/login");
  }
  
  return <div>UserDashboard</div>;
}

export default UserDashboard;
