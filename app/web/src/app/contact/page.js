import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";

export const metadata = { title: "Contact" };

export default function Page() {
  return (
    <>
      <Header />
      <main className="inner-page">
        <Contact />
      </main>
      <Footer />
    </>
  );
}
