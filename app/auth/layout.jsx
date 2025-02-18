/**
 * Layout for login and signup pages.
 * Layout for Authentication paths in general
 */

import CheckLogin from "./check-login";

export const metadata = {
  title: "Signup or Login to PBL Academy",
  description:
    "The Worlds First Proof based learning Platform where you learn things by doing things and getting Hands-On Experience.",
};

export default function AuthenticationLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        {/* <CheckLogin></CheckLogin> */}
      </body>
    </html>
  );
}
