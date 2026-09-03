import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Facility from "@/components/Facility";

export const metadata = { title: "Facility" };

export default function Page() {
  return (
    <>
      <Header />
      <main className="inner-page">
        <Facility />
      </main>
      <Footer />
    </>
  );
}
