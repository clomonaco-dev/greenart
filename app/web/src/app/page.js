import Intro from "@/components/Intro";
import Header from "@/components/Header";

// FIRST VERSION: kept for a future release, intentionally not rendered now.
// import Hero from "@/components/Hero";
// import HomeMenu from "@/components/HomeMenu";
// import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Intro />
      <Header />

      {/* FIRST VERSION: the intro is the only content on the root page.
          These sections remain in the project and can be restored later. */}
      {/*
      <main>
        <Hero />
        <HomeMenu />
      </main>
      <Footer />
      */}
    </>
  );
}
