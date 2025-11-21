import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Stats from "@/components/Stats";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="overflow-hidden bg-white min-h-screen">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Hero />
        <section className="mt-12">
          <Features />
        </section>

        <section className="mt-12">
          <Stats />
        </section>

        <section className="mt-12">
          <Testimonials />
        </section>
      </div>

      <Footer />
    </main>
  );
}
