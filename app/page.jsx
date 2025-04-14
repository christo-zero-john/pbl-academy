import Loading from "@/frontend/components/common/loading";
import User from "@/frontend/modules/entities/User";
import Link from "next/link";

export default function HomePage() {
  console.log(User.user);
  return (
    <>
      <Loading show={true}/>
      
    </>
  );
}
