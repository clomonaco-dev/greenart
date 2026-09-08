import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PrivacyPolicy from "@/components/PrivacyPolicy";

export const metadata = {
  title: "Privacy Policy",
  description: "GreenArt privacy policy for website browsing, B2B requests, Netlify and optional first-party analytics.",
};

export default function Page() {
  return (
    <div className="offer-page privacy-page">
      <Header />
      <main className="inner-page"><PrivacyPolicy /></main>
      <Footer />
    </div>
  );
}
