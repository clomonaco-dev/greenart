import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PrivacyPolicy from "@/components/PrivacyPolicy";

export const metadata = {
  title: "Privacy Policy",
  description: "GreenArt privacy notice for B2B requests and Netlify Forms submissions.",
};

export default function Page() {
  return (
    <div className="offer-page privacy-page">
      <Header />
      <main className="inner-page">
        <PrivacyPolicy />
      </main>
      <Footer />
    </div>
  );
}
