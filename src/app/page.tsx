import { Calculator } from "@/components/Calculator";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { LiveBook } from "@/components/LiveBook";
import { Nav } from "@/components/Nav";
import { Risks } from "@/components/Risks";
import { Safety } from "@/components/Safety";
import { Sectors } from "@/components/Sectors";

export default function Home() {
  return (
    <>
      <div className="border-b border-green-line bg-green-bg px-4 py-2 text-center text-[12px] text-sub">
        <span className="font-semibold text-green">Community Tool</span> — Not affiliated with Forest
        Road Asset Management. Educational only, not financial advice.
      </div>
      <Nav />
      <main>
        <Hero />
        <Calculator />
        <HowItWorks />
        <Sectors />
        <LiveBook />
        <Safety />
        <Risks />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
