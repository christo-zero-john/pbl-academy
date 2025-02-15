import CheckAdmin from "./checkAdmin";

export default function AdminLayout({ children }) {
  return (
    <div>
      <CheckAdmin>{children}</CheckAdmin>
    </div>
  );
}
