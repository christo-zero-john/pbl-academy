import React from "react";
import CheckLogin from "./check-login";

export default function UserLayout({ children }) {
  return (
    <div>
      <CheckLogin>{children}</CheckLogin>
    </div>
  );
}
