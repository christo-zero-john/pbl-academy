/**
 * This component is used to import bootstrap CSS and JS files into the application.
 */

"use client";
import "bootstrap/dist/css/bootstrap.min.css";

import { useEffect } from "react";

export default function Bootstrap() {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);
  return null;
}
