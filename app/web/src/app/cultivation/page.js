import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Cultivation from "@/components/Cultivation";

export const metadata = { title: "Cultivation" };

export default function Page() {
  return (
    <>
      <Header />
      <main className="inner-page">
        <Cultivation />
      </main>
      <Footer />
    </>
  );
}
