import CuratedExperiences from "../componets/CuratedExperiences";
import FeaturedSuites from "../componets/FeaturedSuites";
import GuestReviews from "../componets/GuestReviews";
import Hero from "../componets/HeroSection";
import VipBanner from "../componets/VipBanner";

function Home() {
  return (
    <>
      <Hero />
      <FeaturedSuites />
      <CuratedExperiences />
      <VipBanner />
      <GuestReviews />
    </>
  );
}

export default Home;
