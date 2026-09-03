import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Quality from "@/components/Quality";

export const metadata = { title: "Quality & Compliance" };

export default function Page() {
  return (
    <>
      <Header />
      <main className="inner-page">
        <Quality />
      </main>
      <Footer />
    </>
  );
}
