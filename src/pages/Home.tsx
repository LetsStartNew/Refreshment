import HeroSection from '../components/home/HeroSection';
import OfferingSection from '../components/home/OfferingSection';
import WhyChooseUsSection from '../components/home/WhyChooseUsSection';
import HowItWorksSection from '../components/home/HowItWorksSection';
import FAQSection from '../components/home/FAQSection';
import CTASection from '../components/home/CTASection';

function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <OfferingSection />
      <WhyChooseUsSection />
      <HowItWorksSection />
      <FAQSection />
      <CTASection />
    </div>
  );
}

export default Home;
