import Loading from "@/frontend/components/common/loading";
import NavBar from "@/frontend/components/common/nav-bar";
import HeroSection from "@/frontend/components/routes/home-page/hero-section";
import User from "@/frontend/modules/entities/User";
import Link from "next/link";

export default function HomePage() {
  console.log(User.user);
  return (
    <>
      <Loading show={false} />
      <NavBar active="home"/>
      <HeroSection />
    </>
  );
}
