import CheckLogin from "../(learners)/dashboard/check-login";

export default function MenotorLayout({ children }) {
  return (
    <div>
      <CheckLogin>{children}</CheckLogin>
    </div>
  );
}
