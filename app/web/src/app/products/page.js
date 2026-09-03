import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Products from "@/components/Products";

export const metadata = { title: "Products" };

export default function Page() {
  return (
    <>
      <Header />
      <main className="inner-page">
        <Products />
      </main>
      <Footer />
    </>
  );
}
