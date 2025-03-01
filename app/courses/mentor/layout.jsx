"use client";

import User from "@/frontend/modules/entities/User";

export default function MenotorLayout({ children }) {
  // Render child pages only if the user is a mentor. Else restrict access

  if (User.user.user_metadata.role.includes("mentor")) {
    return <div>{children}</div>;
  } else {
    return (
      <>
        <h1 className="text-center m-5 pt-5 text-danger ">
          Sorry Access Restricted!! Only Accessible for mentors. Request to be a
          mentor to see this page....
        </h1>
      </>
    );
  }
}
