import { Container, Box } from "@mui/material";
import { CategoryCarousel } from "../components/home/CategoryCarousel";
import { HeroBanner } from "../components/home/HeroBanner";
import { FeaturedProductsCarousel } from "../components/home/FeaturedProductsCarousel";
import { SpecialOffersSection } from "../components/home/SpecialOffersSection";
import { AboutBakerySection } from "../components/home/AboutBakerySection";
import { BakeryServicesSection } from "../components/home/BakeryServicesSection";
import { TestimonialsCarousel } from "../components/home/TestimonialsCarousel";
import { NewsletterSection } from "../components/home/NewsletterSection";
import { YouTubeVideosSection } from "../components/home/YouTubeVideosSection";
import { ProductSectionCarousel } from "../components/home/ProductSectionCarousel";
import CakeIcon from "@mui/icons-material/Cake";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import LocalCafeIcon from "@mui/icons-material/LocalCafe";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import {
  birthdayCakes,
  beautifulCakes,
  hungerBites,
  creamlessCakes,
  takeMeAlong,
  fillers,
  bestSellingProducts,
} from "../utils/homeProductSections";

const Home = () => {
  return (
    <Box sx={{ width: "100%", maxWidth: "100%" }}>
      {/* Hero Banner Carousel */}
      <HeroBanner />
      
      <Container maxWidth="lg" sx={{ px: { xs: 2, md: 3 }, py: { xs: 4, md: 6 } }}>
        {/* Category Carousel */}
        <CategoryCarousel />
        
        {/* Featured Products / Bestsellers */}
        <FeaturedProductsCarousel />
        
        {/* Our Best Selling Products */}
        <ProductSectionCarousel
          title="Our Best Selling Products"
          subtitle="Top Picks"
          products={bestSellingProducts}
          icon={LocalFireDepartmentIcon}
          bgColor="rgba(255,248,245,0.5)"
        />
        
        {/* Birthday Cakes */}
        <ProductSectionCarousel
          title="Birthday Cakes"
          subtitle="Celebration Special"
          products={birthdayCakes}
          icon={CakeIcon}
        />
        
        {/* Beautiful Cakes */}
        <ProductSectionCarousel
          title="Beautiful Cakes"
          subtitle="Artistic Creations"
          products={beautifulCakes}
          icon={CakeIcon}
          bgColor="rgba(255,248,245,0.5)"
        />
        
        {/* Creamless Cakes */}
        <ProductSectionCarousel
          title="Creamless Cakes"
          subtitle="Eggless Delights"
          products={creamlessCakes}
          icon={LocalCafeIcon}
        />
        
        {/* Special Offers / Deals */}
        <SpecialOffersSection />
        
        {/* Hunger Bites */}
        <ProductSectionCarousel
          title="Hunger Bites"
          subtitle="Quick Bites"
          products={hungerBites}
          icon={FastfoodIcon}
          bgColor="rgba(255,248,245,0.5)"
        />
        
        {/* Fillers */}
        <ProductSectionCarousel
          title="Fillers"
          subtitle="Snack Time"
          products={fillers}
          icon={RestaurantIcon}
        />
        
        {/* Take me Along */}
        <ProductSectionCarousel
          title="Take me Along"
          subtitle="Gift Collection"
          products={takeMeAlong}
          icon={CardGiftcardIcon}
          bgColor="rgba(255,248,245,0.5)"
          showBadge={false}
        />
        
        {/* About the Bakery */}
        <AboutBakerySection />
        
        {/* YouTube Videos Section */}
        <YouTubeVideosSection />
        
        {/* Bakery Services */}
        <BakeryServicesSection />
        
        {/* Testimonials / Reviews */}
        <TestimonialsCarousel />
      </Container>
      
      {/* Newsletter Signup */}
      <NewsletterSection />
    </Box>
  );
};

export default Home;
