import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Technology from "@/components/Technology";

export const metadata = { title: "Technology" };

export default function Page() {
  return (
    <>
      <Header />
      <main className="inner-page">
        <Technology />
      </main>
      <Footer />
    </>
  );
}
