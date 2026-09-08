import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LegalDocument from "@/components/LegalDocument";

export const metadata = {
  title: "Terms of Use",
  description: "GreenArt website terms of use and B2B legal information.",
};

export default function Page() {
  return (
    <div className="offer-page privacy-page">
      <Header />
      <main className="inner-page"><LegalDocument documentKey="terms" /></main>
      <Footer />
    </div>
  );
}
