import React from "react";
import CheckLogin from "../dashboard/check-login";

export default function MenotorLayout({ children }) {
  return (
    <div>
      <CheckLogin>{children}</CheckLogin>
    </div>
  );
}
