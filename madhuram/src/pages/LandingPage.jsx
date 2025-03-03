
import AnnouncementBar from '../components/landingpage/AnnouncementBar';
import Navbar from '../components/landingpage/Navbar';
import HeroSection from '../components/landingpage/HeroSection';

import Categories from '../components/landingpage/Categories';
import PopularProducts from '../components/landingpage/PopularProducts';
import WhyChooseUs from '../components/landingpage/WhyChooseUs';
import Testimonials from '../components/landingpage/Testimonials';
import Newsletter from '../components/landingpage/Newsletter';
import Footer from '../components/landingpage/Footer';
import ScrollToTopButton from '../components/landingpage/ScrollToTopButton';
import Partners from '../components/landingpage/Partners';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF5E1] to-[#FFE4C4]">
      <AnnouncementBar />
      <Navbar />
      <HeroSection />
      <Categories />
      <PopularProducts />
      <WhyChooseUs />
      <Testimonials />
      <Newsletter />
      <Partners />
      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

export default LandingPage;