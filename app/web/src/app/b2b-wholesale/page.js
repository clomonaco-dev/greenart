import Header from "@/components/Header";
import Footer from "@/components/Footer";
import B2B from "@/components/B2B";

export const metadata = { title: "B2B / Wholesale" };

export default function Page() {
  return (
    <>
      <Header />
      <main className="inner-page">
        <B2B />
      </main>
      <Footer />
    </>
  );
}
