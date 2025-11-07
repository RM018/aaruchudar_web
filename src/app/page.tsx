import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Stats from '@/components/Stats';

export default function Home() {
  return (
    <main className="overflow-hidden bg-white">
      <Hero />
      <Features />
      <Stats />
    </main>
  );
}
