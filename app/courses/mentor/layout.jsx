"use client";

import User from "@/frontend/modules/entities/User";
import { CheckMentor } from "./check-mentor";

export default function MenotorLayout({ children }) {
  // Render child pages only if the user is a mentor. Else restrict access

  return (
    <>
      <CheckMentor>{children}</CheckMentor>
    </>
  );
}
