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
import { CategoryProductSection } from "../components/home/CategoryProductSection";
import CakeIcon from "@mui/icons-material/Cake";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import LocalCafeIcon from "@mui/icons-material/LocalCafe";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import BreakfastDiningIcon from "@mui/icons-material/BreakfastDining";
import LocalPizzaIcon from "@mui/icons-material/LocalPizza";
import CelebrationIcon from "@mui/icons-material/Celebration";
import LiquorIcon from "@mui/icons-material/Liquor";
import CookieIcon from "@mui/icons-material/Cookie";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import StoreIcon from "@mui/icons-material/Store";
import LocalDiningIcon from "@mui/icons-material/LocalDining";

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
        
        {/* Our Best Selling Products - From API */}
        <CategoryProductSection
          categoryGroupname="COOKIES"
          title="Our Best Selling Products"
          subtitle="Top Picks"
          icon={LocalFireDepartmentIcon}
          bgColor="rgba(255,248,245,0.5)"
          limit={10}
        />
        
        {/* Birthday Cakes - From API */}
        <CategoryProductSection
          categoryGroupname="CAKES WEB AND APP"
          title="Birthday Cakes"
          subtitle="Celebration Special"
          icon={CakeIcon}
          limit={10}
        />
        
        {/* Beautiful Cakes - From API */}
        <CategoryProductSection
          categoryGroupname="CAKES"
          title="Beautiful Cakes"
          subtitle="Artistic Creations"
          icon={CakeIcon}
          bgColor="rgba(255,248,245,0.5)"
          limit={10}
        />
        
        {/* Creamless Cakes - From API */}
        <CategoryProductSection
          categoryGroupname="SNB CREAMLESS CAKES"
          title="Creamless Cakes"
          subtitle="Eggless Delights"
          icon={LocalCafeIcon}
          limit={10}
        />
        
        {/* Special Offers / Deals */}
        <SpecialOffersSection />
        
        {/* Hunger Bites - From API */}
        <CategoryProductSection
          categoryGroupname="FAST FOOD"
          title="Hunger Bites"
          subtitle="Quick Bites"
          icon={FastfoodIcon}
          bgColor="rgba(255,248,245,0.5)"
          limit={10}
        />
        
        {/* Fillers - From API */}
        <CategoryProductSection
          categoryGroupname="ITALIAN SNACKS"
          title="Fillers"
          subtitle="Snack Time"
          icon={RestaurantIcon}
          limit={10}
        />
        
        {/* Take me Along - From API */}
        <CategoryProductSection
          categoryGroupname="GIFT HAMPERS"
          title="Take me Along"
          subtitle="Gift Collection"
          icon={CardGiftcardIcon}
          bgColor="rgba(255,248,245,0.5)"
          showBadge={false}
          limit={10}
        />
        
        {/* Breakfast Special - From API */}
        <CategoryProductSection
          categoryGroupname="BREAKFAST SPECIAL"
          title="Breakfast Special"
          subtitle="Morning Delights"
          icon={BreakfastDiningIcon}
          limit={10}
        />
        
        {/* Pizza and Burgers - From API */}
        <CategoryProductSection
          categoryGroupname="PIZZA AND BURGERS"
          title="Pizza and Burgers"
          subtitle="Fast & Fresh"
          icon={LocalPizzaIcon}
          bgColor="rgba(255,248,245,0.5)"
          limit={10}
        />
        
        {/* Celebration Items - From API */}
        <CategoryProductSection
          categoryGroupname="CELEBRATION ITEMS"
          title="Celebration Items"
          subtitle="Party Essentials"
          icon={CelebrationIcon}
          limit={10}
        />
        
        {/* Chocolates - From API */}
        <CategoryProductSection
          categoryGroupname="CHOCOLATES"
          title="Chocolates"
          subtitle="Sweet Indulgence"
          icon={CookieIcon}
          bgColor="rgba(255,248,245,0.5)"
          limit={10}
        />
        
        {/* Danbrew Mocktails - From API */}
        <CategoryProductSection
          categoryGroupname="DANBREW MOCKTAILS"
          title="Danbrew Mocktails"
          subtitle="Refreshing Drinks"
          icon={LiquorIcon}
          limit={10}
        />
        
        {/* Dry Cakes and Muffins - From API */}
        <CategoryProductSection
          categoryGroupname="DRY CAKES AND MUFFINS"
          title="Dry Cakes and Muffins"
          subtitle="Baked Fresh"
          icon={CakeIcon}
          bgColor="rgba(255,248,245,0.5)"
          limit={10}
        />
        
        {/* Frozen Products - From API */}
        <CategoryProductSection
          categoryGroupname="FROZEN PRODUCTS"
          title="Frozen Products"
          subtitle="Chilled Delights"
          icon={AcUnitIcon}
          limit={10}
        />
        
        {/* Mithai - From API */}
        <CategoryProductSection
          categoryGroupname="MITHAI"
          title="Mithai"
          subtitle="Traditional Sweets"
          icon={LocalDiningIcon}
          bgColor="rgba(255,248,245,0.5)"
          limit={10}
        />
        
        {/* Namkeen - From API */}
        <CategoryProductSection
          categoryGroupname="NAMKEEN"
          title="Namkeen"
          subtitle="Crunchy Snacks"
          icon={RestaurantIcon}
          limit={10}
        />
        
        {/* Namkeen Shyam - From API */}
        <CategoryProductSection
          categoryGroupname="NAMKEEN SHYAM"
          title="Namkeen Shyam"
          subtitle="Premium Snacks"
          icon={RestaurantIcon}
          bgColor="rgba(255,248,245,0.5)"
          limit={10}
        />
        
        {/* New Sapru Marg EJ - From API */}
        <CategoryProductSection
          categoryGroupname="NEW SAPRU MARG EJ"
          title="New Sapru Marg"
          subtitle="Special Collection"
          icon={StoreIcon}
          limit={10}
        />
        
        {/* Taj - From API */}
        <CategoryProductSection
          categoryGroupname="TAJ"
          title="Taj"
          subtitle="Premium Selection"
          icon={CardGiftcardIcon}
          bgColor="rgba(255,248,245,0.5)"
          limit={10}
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
