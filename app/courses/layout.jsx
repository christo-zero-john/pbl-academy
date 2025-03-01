import CheckLogin from "../(all-users)/dashboard/check-login";

export default function MenotorLayout({ children }) {
  return (
    <div>
      <CheckLogin>{children}</CheckLogin>
    </div>
  );
}
