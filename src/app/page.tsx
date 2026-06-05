import CartProvider from "@/components/CartProvider";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedCarousel from "@/components/FeaturedCarousel";
import Benefits from "@/components/Benefits";
import MenuSection from "@/components/MenuSection";
import PromoBand from "@/components/PromoBand";
import HowToOrder from "@/components/HowToOrder";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import Toast from "@/components/Toast";

export default function Home() {
  return (
    <CartProvider>
      {/* Atmósfera de fondo */}
      <div className="an-glow" />
      <div className="an-grain" />

      <div className="relative z-[2]">
        <Navbar />
        <Hero />
        <FeaturedCarousel />
        <Benefits />
        <MenuSection />
        <PromoBand />
        <HowToOrder />
        <Footer />
      </div>

      <CartDrawer />
      <Toast />
    </CartProvider>
  );
}
