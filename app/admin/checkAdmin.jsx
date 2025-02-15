"use client";

import { Admin } from "@/modules/entities/Admin";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function CheckAdmin({ children }) {
  const [isAdmin, setAdmin] = useState(false);

  useEffect(() => {
    async function execPromise() {
      const checkAdminStatus = await Admin.checkAdmin();
      if (checkAdminStatus.status == 0) {
        redirect("/auth/login/");
      } else if (checkAdminStatus.status == 1) {
        setAdmin(true);
      } else if (checkAdminStatus.status == 2) {
        redirect("/dashboard");
      }
    }

    execPromise();
  }, []);

  return !isAdmin ? <h1>Entry Prohibited</h1> : <>{children}</>;
}
