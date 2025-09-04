import CourseOwnerSection from "./CourseOwnerSection";
import CTASection from "./CTASection";
import FAQSection from "./FAQSection";
import FeaturesSection from "./FeaturesSection";
import Footer from "./Footer";
import Header from "./Header";
import HeroSection from "./HeroSection";
import PricingSection from "./PricingSection";
import TestimonialsSection from "./TestimonialsSection";

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* <Header /> */}

      <HeroSection />

      <CourseOwnerSection/>

      <FeaturesSection />

      <PricingSection />

      <TestimonialsSection />

      <FAQSection/>

      <CTASection />

      <Footer />
    </div>
  );
};

export default Home;
