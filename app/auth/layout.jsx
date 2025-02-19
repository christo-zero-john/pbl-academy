import React from "react";
import CheckLogin from "./check-login";

export default function AuthLayout({ children }) {
    
  return <CheckLogin>{children}</CheckLogin>;
}
