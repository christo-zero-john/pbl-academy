import React from "react";
import { useFormStatus } from "react-dom";

export default function SubmitBtn({
  className = "btn-success m-2",
  btnText = "Submit",
  loadingText = "Submitting",
}) {
  const status = useFormStatus();
  console.log(status);

  return (
    <>
      <button className={className} disabled={status.pending}>
        {!status.pending ? btnText : loadingText}
      </button>
    </>
  );
}
