/**
 * Layout for the entire application, or Root Layout.
 */

import Bootstrap from "@/frontend/components/Bootstrap";

export const metadata = {
  title: "PBL Academy",
  description:
    "The Worlds First Proof based learning Platform where you learn things by doing things and getting Hands-On Experience.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Bootstrap />
      <body>{children}</body>
    </html>
  );
}
