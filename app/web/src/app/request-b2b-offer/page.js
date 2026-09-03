import Header from "@/components/Header";
import Footer from "@/components/Footer";
import OfferForm from "@/components/OfferForm";

export const metadata = { title: "Request B2B Offer" };

export default function Page() {
  return (
    <>
      <Header />
      <main className="inner-page">
        <OfferForm />
      </main>
      <Footer />
    </>
  );
}
