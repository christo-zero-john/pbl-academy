import React from "react";
import { useFormStatus } from "react-dom"; // Import useFormStatus

export default function SubmitBtn({
  className = "btn-success m-2",
  btnText = "Submit",
  loadingText = "Submitting...",
}) {
  const { pending } = useFormStatus(); // Get the pending status from useFormStatus

  return (
    <button className={className} disabled={pending} type="submit">
      {pending ? loadingText : btnText} {/* Change button text based on pending state */}
    </button>
  );
}