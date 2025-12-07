import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Landing from "@/components/Landing";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";

export default function Home() {
  return (
    <main className="overflow-hidden">
      <Hero />
      <Features />
      <Landing />
      <Testimonials />
      <Footer />
      <Chatbot />
    </main>
  );
}
