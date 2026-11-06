import Navbar from "./components/home/Navbar";
import IntroSplash from "./components/home/IntroSplash";
import HeroSection from "./components/home/HeroSection";
import MarketTelemetry from "./components/home/MarketTelemetry";
import KineticMarketUI from "./components/home/KineticMarketUI";
import HowItWorks from "./components/home/HowItWorks";
import TerminalTabs from "./components/home/TerminalTabs";
import PerformanceChart from "./components/home/PerformanceChart";
import Footer from "./components/home/Footer";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#090a0c] text-[#f1f5f9] flex flex-col">
      <Navbar />
      <div className="pt-18">
        <IntroSplash />
        <HeroSection />
        <MarketTelemetry />
        <KineticMarketUI />
        <HowItWorks />
        <TerminalTabs />
        <PerformanceChart />
      </div>
      <Footer />
    </main>
  );
}