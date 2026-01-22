import { Box, Popover, Grid } from "@mui/material";
import { CustomText } from "./CustomText";
import { useNavigate } from "react-router-dom";

/**
 * NavbarDropdown Component
 * Displays dropdown menu content for navbar items
 * 
 * @param {Object} props
 * @param {string} props.category - Category label
 * @param {boolean} props.isOpen - Whether dropdown is open
 * @param {Function} props.onClose - Close handler
 * @param {Object} props.anchorEl - Anchor element for popover positioning
 */
// Dropdown menu data based on category
const getDropdownData = (categoryLabel) => {
    const menus = {
      "CAKES & DRY CAKES": {
        sections: [
          {
            title: "CAKES BY TYPE",
            color: "#d32f2f",
            items: ["Kids Cakes", "Photo Cakes", "Cheese Cakes", "Fondant Cakes", "Tier/Wedding Cakes"],
          },
          {
            title: "REGULAR FLAVOUR CAKES",
            color: "#d32f2f",
            items: ["Mango Cakes", "Pineapple Cakes", "Chocolate Cakes", "Butterscotch Cakes", "Blackforest & Whiteforest Cakes"],
          },
          {
            title: "SPECIAL FLAVOUR CAKES",
            color: "#d32f2f",
            badge: { text: "TOP SELLING", color: "#1976d2" },
            items: ["German Truffle Cakes", "Fresh Fruit & Rasmalai Cakes", "Red Velvet Cakes", "Coffee & Tiramisu Cakes", "Strawberry & Blueberry Cakes"],
          },
          {
            title: "HOT SELLING CAKES",
            color: "#d32f2f",
            items: ["Birthday Cakes", "Anniversary Cakes", "Bento Cakes", "Double Flavor Cakes", "Hammer Pinata Cakes"],
          },
          {
            title: "CAKE FOR CELEBRATION",
            color: "#2e7d32",
            badge: { text: "TRENDING", color: "#ff9800" },
            items: ["Mother's Day Cakes", "Father's Day Cakes", "Valentine's Day Cakes", "New Year Cakes"],
          },
          {
            title: "CAKE BY OCASSION",
            color: "#2e7d32",
            items: ["Lohri Cakes", "Holi Cakes", "Diwali Cakes", "Rakhi Cakes", "Janmashtami Cakes"],
          },
          {
            title: "DRY CAKES & MUFFINS",
            color: "#f57c00",
            items: ["Brownies", "Muffins", "Dry Cakes", "Plum Cakes"],
          },
        ],
      },
      "MITHAI & COOKIES": {
        sections: [
          {
            title: "SWEETS",
            color: "#00897b",
            items: ["Gujia", "Authentic Mithai", "Premium Sweets"],
            badge: { text: "BESTSELLER", color: "#ffc107" },
          },
          {
            title: "HANDMADE COOKIES",
            color: "#d32f2f",
            items: ["Special Cookies", "Maida Free Cookies", "No Added Sugar Cookies"],
          },
        ],
      },
      "BREAD & RUSK": {
        sections: [
          {
            title: "BREADS",
            color: "#7b1fa2",
            items: ["Breads & Loafs", "Pizza & Buns"],
          },
          {
            title: "RUSKS",
            color: "#558b2f",
            items: ["Crispy Rusks"],
          },
        ],
      },
      "GIFT HAMPERS & CHOCOLATES": {
        sections: [
          {
            title: "GIFT HAMPERS",
            color: "#2e7d32",
            badge: { text: "EXCLUSIVE", color: "#2e7d32" },
            items: ["Gift Packs", "Gift Baskets"],
          },
          {
            title: "CHOCOLATES",
            color: "#f57c00",
            badge: { text: "HOT", color: "#ff9800" },
            items: ["Bar & Customize Chocolates", "Special Chocolates", "Chocolate Baskets"],
          },
        ],
      },
      "ADDONS": {
        sections: [
          {
            title: "ADDONS",
            color: "#00b53d",
            items: ["Candles", "Cards", "Balloons", "Decorations"],
          },
        ],
      },
    };

  return menus[categoryLabel] || { sections: [] };
};

export const NavbarDropdown = ({ category, isOpen, onClose, anchorEl }) => {
  const navigate = useNavigate();

  const dropdownData = getDropdownData(category);

  if (!isOpen || !dropdownData.sections || dropdownData.sections.length === 0) {
    return null;
  }

  const handleItemClick = (item) => {
    navigate(`/products?search=${encodeURIComponent(item)}`);
    onClose();
  };

  return (
    <Popover
      open={isOpen}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      sx={{
        mt: 1,
        "& .MuiPaper-root": {
          borderRadius: 2,
          boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
          maxWidth: { xs: "95vw", sm: "900px", md: "1000px" },
          width: { xs: "95vw", sm: "900px", md: "1000px" },
          maxHeight: "70vh",
          overflowY: "auto",
          overflowX: "hidden",
          backgroundColor: "#e3f2fd",
          border: "1px solid rgba(0,0,0,0.1)",
        },
      }}
      onMouseEnter={(e) => {
        e.stopPropagation();
      }}
      onMouseLeave={(e) => {
        onClose();
      }}
    >
      <Box
        sx={{
          py: 3,
          px: { xs: 2, sm: 3, md: 4 },
        }}
      >
        <Grid container spacing={3}>
          {dropdownData.sections.map((section, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5, flexWrap: "wrap" }}>
                  <CustomText
                    sx={{
                      fontSize: { xs: 14, sm: 16, md: 18 },
                      fontWeight: 700,
                      color: section.color,
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    {section.title}
                  </CustomText>
                  {section.badge && (
                    <Box
                      sx={{
                        backgroundColor: section.badge.color,
                        color: "#fff",
                        px: 1.5,
                        py: 0.3,
                        borderRadius: 1,
                        fontSize: 9,
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                      }}
                    >
                      {section.badge.text}
                    </Box>
                  )}
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 0.6,
                    pl: 1,
                    borderLeft: `3px solid ${section.color}`,
                  }}
                >
                  {section.items.map((item, itemIndex) => (
                    <CustomText
                      key={itemIndex}
                      onClick={() => handleItemClick(item)}
                      sx={{
                        fontSize: { xs: 13, sm: 14, md: 15 },
                        color: "#333",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                        py: 0.5,
                        px: 1,
                        borderRadius: 1,
                        "&:hover": {
                          color: section.color,
                          backgroundColor: `${section.color}10`,
                          transform: "translateX(5px)",
                          fontWeight: 500,
                        },
                      }}
                    >
                      {item}
                    </CustomText>
                  ))}
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Popover>
  );
};

