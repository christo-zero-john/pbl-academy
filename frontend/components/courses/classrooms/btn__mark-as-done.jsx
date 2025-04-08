export default function MarkAsDoneBtn({ currentTask }) {
  function markAsDoneHandler() {
    window.confirm("Are you sure you want to mark this task as done?");
    console.log(currentTask);
  }
  return (
    <button className="btn btn-success" onClick={markAsDoneHandler}>
      Mark as done
    </button>
  );
}
