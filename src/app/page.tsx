import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Stats from "@/components/Stats";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Main Content */}
      <div className="flex-grow">
        <Hero />
        
        <div className="container-custom">
          <Features />
          <div className="space-y-24 py-24">
            
            
          </div>
          <Stats />
          <Testimonials />
        </div>
      </div>
      
      <Footer />
    </div>
  )
}
