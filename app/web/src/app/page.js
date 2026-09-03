import Intro from "@/components/Intro";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HomeMenu from "@/components/HomeMenu";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Intro />
      <Header />
      <main>
        <Hero />
        <HomeMenu />
      </main>
      <Footer />
    </>
  );
}
