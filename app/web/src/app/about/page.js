import Header from "@/components/Header";
import Footer from "@/components/Footer";
import About from "@/components/About";

export const metadata = { title: "About GreenArt" };

export default function Page() {
  return (
    <>
      <Header />
      <main className="inner-page">
        <About />
      </main>
      <Footer />
    </>
  );
}
