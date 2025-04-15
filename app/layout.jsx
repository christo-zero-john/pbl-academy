/**
 * Layout for the entire application, or Root Layout.
 */

import Bootstrap from "@/frontend/components/Bootstrap";
import "@/frontend/styles/defaults.css";

export const metadata = {
  title: "PBL Academy",
  description:
    "The Worlds First Proof based learning Platform where you learn things by doing things and getting Hands-On Experience.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Bootstrap />
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.carousel.min.css"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.theme.default.min.css"
        />
        <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.min.js"></script>

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
