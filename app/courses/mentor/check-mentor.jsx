"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import User from "@/frontend/modules/entities/User";

export function CheckMentor({ children }) {
  const [isMentor, setIsMentor] = useState(false);

  useEffect(() => {
    // console.log(User.user);
    (async () => {
      const user = await User.getUser();
      // console.log(typeof user);
      if (user.user_metadata.role.includes("mentor")) {
        setIsMentor(true);
      }
    })();
  }, []);

  if (!isMentor) {
    return (
      <>
        <h1 className="text-center m-5 pt-5 text-danger ">
          Sorry Access Restricted!! Only Accessible for mentors. Request to be a
          mentor to see this page....
        </h1>
      </>
    );
  } else {
    return <>{children}</>;
  }
}
