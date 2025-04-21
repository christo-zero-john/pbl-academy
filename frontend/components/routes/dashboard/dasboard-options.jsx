export default function DasboardOptions({ setOption }) {
  return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className="text-center">Goto Dashboard</h1>
      <p
        onClick={setOption("mentor")}
        className="d-block w-fit p-3 m-2 mx-auto rounded nav-link link-light bg-primary"
        href="/mentor/dashboard"
      >
        Mentor Dashboard
      </p>
      <p
        onClick={setOption("learner")}
        className="d-block w-fit p-3 m-2 mx-auto rounded nav-link link-light bg-success"
        href="/dashboard"
      >
        Learner Dashboard
      </p>
      <p
        onClick={setOption("admin")}
        className="d-block w-fit p-3 m-2 mx-auto rounded nav-link link-danger bg-warning"
        href="/admin/dashboard"
      >
        Admin Dashboard
      </p>
    </div>
  );
}
