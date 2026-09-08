import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LegalDocument from "@/components/LegalDocument";

export const metadata = {
  title: "Cookie & Tracking Policy",
  description: "GreenArt cookie, local storage and optional tracking policy.",
};

export default function Page() {
  return (
    <div className="offer-page privacy-page">
      <Header />
      <main className="inner-page"><LegalDocument documentKey="tracking" /></main>
      <Footer />
    </div>
  );
}
