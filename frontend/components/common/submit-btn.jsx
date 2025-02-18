import { useFormStatus } from "react-dom";

export default function SubmitBtn({
  className = "btn btn-success",
  btnText = "Submit",
  submitingText = "Submitting...",
}) {
  const status = useFormStatus();
  return (
    <>
      <button className={className} disabled={status.pending} type="submit">
        {status.pending ? submitingText : btnText}
      </button>
    </>
  );
}
