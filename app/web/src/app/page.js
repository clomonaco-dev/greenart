import { LanguageProvider } from "@/components/LanguageProvider";
import Intro from "@/components/Intro";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Technology from "@/components/Technology";
import Cultivation from "@/components/Cultivation";
import Facility from "@/components/Facility";
import Products from "@/components/Products";
import Quality from "@/components/Quality";
import B2B from "@/components/B2B";
import Contact from "@/components/Contact";
import OfferForm from "@/components/OfferForm";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <LanguageProvider>
      <Intro />
      <Header />
      <main>
        <Hero />
        <About />
        <Technology />
        <Cultivation />
        <Facility />
        <Products />
        <Quality />
        <B2B />
        <Contact />
        <OfferForm />
      </main>
      <Footer />
    </LanguageProvider>
  );
}