import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Stats from "@/components/Stats";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";

export default function Home() {
  return (
    <main className="overflow-hidden bg-white">
      <div className="flex flex-col items-center w-full">
        <div className="w-full max-w-[100vw]">
          <Hero />
          <Features />
          <Stats />
        </div>
      </div>
      <Footer />
      <Chatbot />
    </main>
  );
}
