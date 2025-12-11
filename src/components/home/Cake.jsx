import { Box, Typography, Button } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import offer1 from "../../assets/Group 8.png";
import offer2 from "../../assets/Group 8 (2).png";
import offer3 from "../../assets/Group 8 (1).png";
import { useState } from "react";

const categoryTabs = ["Category 1", "Category 2", "Category 3", "Category 4"];
const pastryTabs = ["Birthday Cake", "Anniversary Cake", "Danbro Special", "Others"];
const cookieTabs = ["Birthday Cookies", "Premium Cookies", "Danbro Special", "Others",];
const breadTabs = ["Fresh Bread", "Brown Bread", "Rusk / Toast", "Others"];
const comboTabs = ["Birthday Combos", "Premium Combos", "Chocolate Combos", "Others",];

const categoryData = [
    {
        title: "Cake 1",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
        price: "450.90 ₹",
        img: offer1,
        category: "Category 1",
    },
    {
        title: "Cake 2",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        price: "450.90 ₹",
        img: offer2,
        category: "Category 2",
    },
    {
        title: "Cake 3",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        price: "450.90 ₹",
        img: offer3,
        category: "Category 3",
    },
];

// 🔥 Pastries data
const pastryData = [
    {
        title: "Pastry 1",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
        price: "450.90 ₹",
        img: offer1,
        category: "Birthday Cake",
    },
    {
        title: "Pastry 2",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        price: "450.90 ₹",
        img: offer2,
        category: "Anniversary Cake",
    },
    {
        title: "Pastry 3",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        price: "450.90 ₹",
        img: offer3,
        category: "Danbro Special",
    },
];

const cookieData = [
    {
        title: "Cookie 1",
        description:
            "Crispy & fresh baked cookies with rich flavor for every celebration.",
        price: "150.00 ₹",
        img: offer1,
        category: "Birthday Cookies",
    },
    {
        title: "Cookie 2",
        description: "Delicious premium biscuits for everyday snacking.",
        price: "180.00 ₹",
        img: offer2,
        category: "Premium Cookies",
    },
    {
        title: "Cookie 3",
        description: "Special Danbro-style cookies with extra crunch.",
        price: "199.00 ₹",
        img: offer3,
        category: "Danbro Special",
    },
];

// 🔥 Breads Data
const breadData = [
    {
        title: "Fresh White Bread",
        description: "Soft & fluffy freshly baked white bread.",
        price: "50.00 ₹",
        img: offer1,
        category: "Fresh Bread",
    },
    {
        title: "Healthy Brown Bread",
        description: "Made with whole wheat, healthy choice.",
        price: "65.00 ₹",
        img: offer2,
        category: "Brown Bread",
    },
    {
        title: "Crunchy Rusk",
        description: "Perfect tea-time biscuits with crunch.",
        price: "80.00 ₹",
        img: offer3,
        category: "Rusk / Toast",
    },
];

const comboData = [
    {
        title: "Birthday Gift Combo",
        description: "Cake + Flowers + Chocolate combo for birthdays.",
        price: "899.00 ₹",
        img: offer1,
        category: "Birthday Combos",
    },
    {
        title: "Premium Celebration Combo",
        description: "Luxury gift hamper with sweets and goodies.",
        price: "1299.00 ₹",
        img: offer2,
        category: "Premium Combos",
    },
    {
        title: "Chocolate Lovers Combo",
        description: "Assorted premium chocolates for gifting.",
        price: "1099.00 ₹",
        img: offer3,
        category: "Chocolate Combos",
    },
];

export const CakeSection = () => {
    const [activeCategoryTab, setActiveCategoryTab] = useState("Category 1");
    const [activePastryTab, setActivePastryTab] = useState("Birthday Cake");
    const [activeCookieTab, setActiveCookieTab] = useState("Birthday Cookies");
    const [activeBreadTab, setActiveBreadTab] = useState("Fresh Bread");
    const [activeComboTab, setActiveComboTab] = useState("Birthday Combos");

    const filteredCategoryItems =
        activeCategoryTab === "Category 1"
            ? categoryData
            : categoryData.filter((item) => item.category === activeCategoryTab);

    const filteredPastries =
        activePastryTab === "Birthday Cake"
            ? pastryData
            : pastryData.filter((item) => item.category === activePastryTab);

    const filteredCookies =
        activeCookieTab === "Birthday Cookies"
            ? cookieData
            : cookieData.filter((item) => item.category === activeCookieTab);

    const filteredBreads =
        activeBreadTab === "Fresh Bread"
            ? breadData
            : breadData.filter((item) => item.category === activeBreadTab);

    const filteredCombos =
        activeComboTab === "Birthday Combos"
            ? comboData
            : comboData.filter((item) => item.category === activeComboTab);

    return (
        <Box sx={{ mb: 5 }}>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    justifyContent: "space-between",
                    gap: { xs: 2, md: 4 },
                    alignItems: { xs: "flex-start", md: "center" },
                    mb: { xs: 3, md: 4 },
                }}
            >
                <Typography
                    sx={{
                        fontSize: { xs: 28, sm: 32, md: 38 },
                        fontWeight: 800,
                        color: "var(--themeColor)",
                    }}
                >
                    Cakes
                </Typography>

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: { xs: "flex-start", md: "end" },
                        gap: { xs: 1, sm: 2, md: 4 },
                        alignItems: "center",
                        flexWrap: "wrap",
                    }}
                >
                    {categoryTabs?.map((tab) => (
                        <Button
                            key={tab}
                            onClick={() => setActiveCategoryTab(tab)}
                            sx={{
                                textTransform: "none",
                                fontWeight: 600,
                                fontSize: { xs: 11, sm: 12, md: 14 },
                                color:
                                    activeCategoryTab === tab
                                        ? "var(--themeColor)"
                                        : "rgba(0,0,0,0.7)",
                                border:
                                    activeCategoryTab === tab
                                        ? "2px solid var(--themeColor)"
                                        : "2px solid transparent",
                                backgroundColor:
                                    activeCategoryTab === tab ? "#fff4f0" : "transparent",
                                borderRadius: 20,
                                px: activeCategoryTab === tab ? { xs: 2, md: 3 } : 0,
                                py: activeCategoryTab === tab ? { xs: 0.4, md: 0.6 } : 0,
                                transition: "0.25s",
                                whiteSpace: "nowrap",
                            }}
                        >
                            {tab}
                        </Button>
                    ))}
                </Box>
            </Box>

            {/* Cake Cards */}
            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr 1fr" }, gap: 4, }}>
                {filteredCategoryItems?.map((offer, index) => (
                    <Box
                        key={index}
                        sx={{
                            position: "relative",
                            borderRadius: 3,
                            overflow: "hidden",
                            bgcolor: "#fff",
                            boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                            transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                            cursor: "pointer",
                            "&:hover": {
                                transform: "translateY(-10px) scale(1.02)",
                                boxShadow: "0 12px 35px rgba(0,0,0,0.18)",
                                "& .product-image": {
                                    transform: "scale(1.15)",
                                },
                                "& .heart-icon": {
                                    transform: "scale(1.2) rotate(10deg)",
                                    bgcolor: "#fff",
                                    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                                },
                                "& .add-to-cart": {
                                    backgroundColor: "var(--themeColor)",
                                    color: "#fff",
                                    transform: "scale(1.05)",
                                },
                            },
                        }}
                    >
                        {/* Heart Icon */}
                        <Box
                            className="heart-icon"
                            sx={{
                                position: "absolute",
                                right: 15,
                                top: 15,
                                zIndex: 10,
                                bgcolor: "rgba(255,255,255,0.9)",
                                borderRadius: "50%",
                                width: 36,
                                height: 36,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                cursor: "pointer",
                                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                                backdropFilter: "blur(10px)",
                            }}
                        >
                            <FavoriteBorderIcon
                                sx={{
                                    fontSize: 22,
                                    color: "var(--themeColor)",
                                    transition: "all 0.3s ease",
                                }}
                            />
                        </Box>

                        {/* Image */}
                        <Box
                            className="product-image"
                            component="img"
                            src={offer?.img}
                            alt={offer?.title}
                            sx={{
                                width: "100%",
                                height: 260,
                                objectFit: "cover",
                                transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
                            }}
                        />

                        {/* Content */}
                        <Box sx={{ p: 2 }}>
                            <Typography sx={{ fontSize: 20, fontWeight: 700, mb: 0.5 }}>
                                {offer?.title}
                            </Typography>

                            <Typography
                                sx={{
                                    fontSize: 14,
                                    color: "gray",
                                    mb: 2,
                                    lineHeight: 1.4,
                                }}
                            >
                                {offer?.description}
                            </Typography>

                            {/* Price + Add to Cart */}
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                }}
                            >
                                <Typography sx={{ fontSize: 18, fontWeight: 600 }}>
                                    {offer?.price}
                                </Typography>

                                <Box
                                    className="add-to-cart"
                                    sx={{
                                        backgroundColor: "#fbc7b5",
                                        color: "var(--themeColor)",
                                        px: 2.5,
                                        py: 0.7,
                                        borderRadius: 20,
                                        cursor: "pointer",
                                        fontWeight: 600,
                                        fontSize: 14,
                                        textAlign: "center",
                                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                                        boxShadow: "0 2px 8px rgba(251,199,181,0.3)",
                                    }}
                                >
                                    Add to Cart
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                ))}
            </Box>

            {/* Pastries Cards */}
            <Box
                sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    justifyContent: "space-between",
                    gap: { xs: 2, md: 4 },
                    alignItems: { xs: "flex-start", md: "center" },
                    my: { xs: 3, md: 4 },
                }}
            >
                <Typography sx={{ fontSize: { xs: 28, sm: 32, md: 38 }, fontWeight: 800, color: "var(--themeColor)", }}>
                    Pastries
                </Typography>

                <Box
                    sx={{
                        display: "flex",
                        gap: { xs: 1, sm: 2, md: 4 },
                        alignItems: "center",
                        flexWrap: "wrap",
                    }}
                >
                    {pastryTabs?.map((tab) => (
                        <Button
                            key={tab}
                            onClick={() => setActivePastryTab(tab)}
                            sx={{
                                textTransform: "none",
                                fontWeight: 600,
                                fontSize: { xs: 11, sm: 12, md: 14 },
                                color:
                                    activePastryTab === tab
                                        ? "var(--themeColor)"
                                        : "rgba(0,0,0,0.7)",
                                border:
                                    activePastryTab === tab
                                        ? "2px solid var(--themeColor)"
                                        : "2px solid transparent",
                                backgroundColor:
                                    activePastryTab === tab ? "#fff4f0" : "transparent",
                                borderRadius: 20,
                                px: activePastryTab === tab ? { xs: 2, md: 3 } : 0,
                                py: activePastryTab === tab ? { xs: 0.4, md: 0.6 } : 0,
                                transition: "0.25s",
                                whiteSpace: "nowrap",
                            }}
                        >
                            {tab}
                        </Button>
                    ))}
                </Box>
            </Box>
            <Box sx={{ mt: 4, display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr 1fr" }, gap: 4, }}>
                {filteredPastries?.map((item, index) => (
                    <Box
                        key={index}
                        sx={{
                            position: "relative",
                            borderRadius: 3,
                            overflow: "hidden",
                            bgcolor: "#fff",
                            boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                            transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                            cursor: "pointer",
                            "&:hover": {
                                transform: "translateY(-10px) scale(1.02)",
                                boxShadow: "0 12px 35px rgba(0,0,0,0.18)",
                                "& .product-image": {
                                    transform: "scale(1.15)",
                                },
                                "& .heart-icon": {
                                    transform: "scale(1.2) rotate(10deg)",
                                    bgcolor: "#fff",
                                    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                                },
                                "& .add-to-cart": {
                                    backgroundColor: "var(--themeColor)",
                                    color: "#fff",
                                    transform: "scale(1.05)",
                                },
                            },
                        }}
                    >
                        {/* Heart Icon */}
                        <Box
                            className="heart-icon"
                            sx={{
                                position: "absolute",
                                right: 15,
                                top: 15,
                                zIndex: 10,
                                bgcolor: "rgba(255,255,255,0.9)",
                                borderRadius: "50%",
                                width: 36,
                                height: 36,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                cursor: "pointer",
                                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                                backdropFilter: "blur(10px)",
                            }}
                        >
                            <FavoriteBorderIcon
                                sx={{ fontSize: 22, color: "var(--themeColor)" }}
                            />
                        </Box>

                        {/* Image */}
                        <Box
                            className="product-image"
                            component="img"
                            src={item?.img}
                            alt={item?.title}
                            sx={{
                                width: "100%",
                                height: 260,
                                objectFit: "cover",
                                transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
                            }}
                        />

                        {/* Content */}
                        <Box sx={{ p: 2 }}>
                            <Typography sx={{ fontSize: 20, fontWeight: 700, mb: 0.5 }}>
                                {item?.title}
                            </Typography>

                            <Typography
                                sx={{
                                    fontSize: 14,
                                    color: "gray",
                                    mb: 2,
                                    lineHeight: 1.4,
                                }}
                            >
                                {item?.description}
                            </Typography>

                            {/* Price + Add to Cart */}
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                }}
                            >
                                <Typography sx={{ fontSize: 18, fontWeight: 600 }}>
                                    {item?.price}
                                </Typography>

                                <Box
                                    className="add-to-cart"
                                    sx={{
                                        backgroundColor: "#fbc7b5",
                                        color: "var(--themeColor)",
                                        px: 2.5,
                                        py: 0.7,
                                        borderRadius: 20,
                                        cursor: "pointer",
                                        fontWeight: 600,
                                        fontSize: 14,
                                        textAlign: "center",
                                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                                        boxShadow: "0 2px 8px rgba(251,199,181,0.3)",
                                    }}
                                >
                                    Add to Cart
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                ))}
            </Box>

            {/* Cookies Cards */}
            <Box
                sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    justifyContent: "space-between",
                    gap: { xs: 2, md: 4 },
                    alignItems: { xs: "flex-start", md: "center" },
                    my: { xs: 3, md: 4 },
                }}
            >
                <Typography sx={{ fontSize: { xs: 28, sm: 32, md: 38 }, fontWeight: 800, color: "var(--themeColor)", }}>
                    Cookies
                </Typography>

                <Box
                    sx={{
                        display: "flex",
                        gap: { xs: 1, sm: 2, md: 4 },
                        alignItems: "center",
                        flexWrap: "wrap",
                    }}
                >
                    {cookieTabs?.map((tab) => (
                        <Button
                            key={tab}
                            onClick={() => setActiveCookieTab(tab)}
                            sx={{
                                textTransform: "none",
                                fontWeight: 600,
                                fontSize: { xs: 11, sm: 12, md: 14 },
                                color:
                                    activeCookieTab === tab
                                        ? "var(--themeColor)"
                                        : "rgba(0,0,0,0.7)",
                                border:
                                    activeCookieTab === tab
                                        ? "2px solid var(--themeColor)"
                                        : "2px solid transparent",
                                backgroundColor:
                                    activeCookieTab === tab ? "#fff4f0" : "transparent",
                                borderRadius: 20,
                                px: activeCookieTab === tab ? { xs: 2, md: 3 } : 0,
                                py: activeCookieTab === tab ? { xs: 0.4, md: 0.6 } : 0,
                                transition: "0.25s",
                                whiteSpace: "nowrap",
                            }}
                        >
                            {tab}
                        </Button>
                    ))}
                </Box>
            </Box>
            <Box sx={{ mt: 4, display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr 1fr" }, gap: 4, }}>
                {filteredCookies?.map((item, index) => (
                    <Box
                        key={index}
                        sx={{
                            position: "relative",
                            borderRadius: 3,
                            overflow: "hidden",
                            bgcolor: "#fff",
                            boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                            transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                            cursor: "pointer",
                            "&:hover": {
                                transform: "translateY(-10px) scale(1.02)",
                                boxShadow: "0 12px 35px rgba(0,0,0,0.18)",
                                "& .product-image": {
                                    transform: "scale(1.15)",
                                },
                                "& .heart-icon": {
                                    transform: "scale(1.2) rotate(10deg)",
                                    bgcolor: "#fff",
                                    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                                },
                                "& .add-to-cart": {
                                    backgroundColor: "var(--themeColor)",
                                    color: "#fff",
                                    transform: "scale(1.05)",
                                },
                            },
                        }}
                    >
                        <Box
                            className="heart-icon"
                            sx={{
                                position: "absolute",
                                right: 15,
                                top: 15,
                                zIndex: 10,
                                bgcolor: "rgba(255,255,255,0.9)",
                                borderRadius: "50%",
                                width: 36,
                                height: 36,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                cursor: "pointer",
                                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                                backdropFilter: "blur(10px)",
                            }}
                        >
                            <FavoriteBorderIcon sx={{ fontSize: 22, color: "var(--themeColor)" }} />
                        </Box>
                        <Box
                            className="product-image"
                            component="img"
                            src={item?.img}
                            alt={item?.title}
                            sx={{
                                width: "100%",
                                height: 260,
                                objectFit: "cover",
                                transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
                            }}
                        />
                        <Box sx={{ p: 2 }}>
                            <Typography sx={{ fontSize: 20, fontWeight: 700, mb: 0.5 }}>
                                {item?.title}
                            </Typography>

                            <Typography sx={{ fontSize: 14, color: "gray", mb: 2, lineHeight: 1.4, }}>
                                {item?.description}
                            </Typography>
                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", }}>
                                <Typography sx={{ fontSize: 18, fontWeight: 600 }}>
                                    {item?.price}
                                </Typography>

                                <Box
                                    className="add-to-cart"
                                    sx={{
                                        backgroundColor: "#fbc7b5",
                                        color: "var(--themeColor)",
                                        px: 2.5,
                                        py: 0.7,
                                        borderRadius: 20,
                                        cursor: "pointer",
                                        fontWeight: 600,
                                        fontSize: 14,
                                        textAlign: "center",
                                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                                        boxShadow: "0 2px 8px rgba(251,199,181,0.3)",
                                    }}
                                >
                                    Add to Cart
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                ))}
            </Box>

            {/* Breads Cards */}
            <Box
                sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    justifyContent: "space-between",
                    gap: { xs: 2, md: 4 },
                    alignItems: { xs: "flex-start", md: "center" },
                    my: { xs: 3, md: 4 },
                }}
            >
                <Typography
                    sx={{
                        fontSize: { xs: 28, sm: 32, md: 38 },
                        fontWeight: 800,
                        color: "var(--themeColor)",
                    }}
                >
                    Breads
                </Typography>

                <Box
                    sx={{
                        display: "flex",
                        gap: { xs: 1, sm: 2, md: 4 },
                        alignItems: "center",
                        flexWrap: "wrap",
                    }}
                >
                    {breadTabs?.map((tab) => (
                        <Button
                            key={tab}
                            onClick={() => setActiveBreadTab(tab)}
                            sx={{
                                textTransform: "none",
                                fontWeight: 600,
                                fontSize: { xs: 11, sm: 12, md: 14 },
                                color:
                                    activeBreadTab === tab
                                        ? "var(--themeColor)"
                                        : "rgba(0,0,0,0.7)",
                                border:
                                    activeBreadTab === tab
                                        ? "2px solid var(--themeColor)"
                                        : "2px solid transparent",
                                backgroundColor:
                                    activeBreadTab === tab ? "#fff4f0" : "transparent",
                                borderRadius: 20,
                                px: activeBreadTab === tab ? { xs: 2, md: 3 } : 0,
                                py: activeBreadTab === tab ? { xs: 0.4, md: 0.6 } : 0,
                                transition: "0.25s",
                                whiteSpace: "nowrap",
                            }}
                        >
                            {tab}
                        </Button>
                    ))}
                </Box>
            </Box>
            <Box sx={{ mt: 4, display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr 1fr" }, gap: 4, }}>
                {filteredBreads?.map((item, index) => (
                    <Box
                        key={index}
                        sx={{
                            position: "relative",
                            borderRadius: 3,
                            overflow: "hidden",
                            bgcolor: "#fff",
                            boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                            transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                            cursor: "pointer",
                            "&:hover": {
                                transform: "translateY(-10px) scale(1.02)",
                                boxShadow: "0 12px 35px rgba(0,0,0,0.18)",
                                "& .product-image": {
                                    transform: "scale(1.15)",
                                },
                                "& .heart-icon": {
                                    transform: "scale(1.2) rotate(10deg)",
                                    bgcolor: "#fff",
                                    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                                },
                                "& .add-to-cart": {
                                    backgroundColor: "var(--themeColor)",
                                    color: "#fff",
                                    transform: "scale(1.05)",
                                },
                            },
                        }}
                    >
                        <Box
                            className="heart-icon"
                            sx={{
                                position: "absolute",
                                right: 15,
                                top: 15,
                                zIndex: 10,
                                bgcolor: "rgba(255,255,255,0.9)",
                                borderRadius: "50%",
                                width: 36,
                                height: 36,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                cursor: "pointer",
                                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                                backdropFilter: "blur(10px)",
                            }}
                        >
                            <FavoriteBorderIcon sx={{ fontSize: 22, color: "var(--themeColor)" }} />
                        </Box>
                        <Box
                            className="product-image"
                            component="img"
                            src={item?.img}
                            alt={item?.title}
                            sx={{
                                width: "100%",
                                height: 260,
                                objectFit: "cover",
                                transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
                            }}
                        />
                        <Box sx={{ p: 2 }}>
                            <Typography sx={{ fontSize: 20, fontWeight: 700, mb: 0.5 }}>
                                {item?.title}
                            </Typography>

                            <Typography sx={{ fontSize: 14, color: "gray", mb: 2, lineHeight: 1.4, }}>
                                {item?.description}
                            </Typography>
                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", }}>
                                <Typography sx={{ fontSize: 18, fontWeight: 600 }}>
                                    {item?.price}
                                </Typography>

                                <Box
                                    className="add-to-cart"
                                    sx={{
                                        backgroundColor: "#fbc7b5",
                                        color: "var(--themeColor)",
                                        px: 2.5,
                                        py: 0.7,
                                        borderRadius: 20,
                                        cursor: "pointer",
                                        fontWeight: 600,
                                        fontSize: 14,
                                        textAlign: "center",
                                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                                        boxShadow: "0 2px 8px rgba(251,199,181,0.3)",
                                    }}
                                >
                                    Add to Cart
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                ))}
            </Box>

            {/* Gift Combos Cards */}
            <Box
                sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    justifyContent: "space-between",
                    gap: { xs: 2, md: 4 },
                    alignItems: { xs: "flex-start", md: "center" },
                    my: { xs: 3, md: 4 },
                }}
            >
                <Typography
                    sx={{
                        fontSize: { xs: 28, sm: 32, md: 38 },
                        fontWeight: 800,
                        color: "var(--themeColor)",
                    }}
                >
                    Gift Combos
                </Typography>

                <Box
                    sx={{
                        display: "flex",
                        gap: { xs: 1, sm: 2, md: 4 },
                        alignItems: "center",
                        flexWrap: "wrap",
                    }}
                >
                    {comboTabs?.map((tab) => (
                        <Button
                            key={tab}
                            onClick={() => setActiveComboTab(tab)}
                            sx={{
                                textTransform: "none",
                                fontWeight: 600,
                                fontSize: { xs: 11, sm: 12, md: 14 },
                                color:
                                    activeComboTab === tab
                                        ? "var(--themeColor)"
                                        : "rgba(0,0,0,0.7)",
                                border:
                                    activeComboTab === tab
                                        ? "2px solid var(--themeColor)"
                                        : "2px solid transparent",
                                backgroundColor:
                                    activeComboTab === tab ? "#fff4f0" : "transparent",
                                borderRadius: 20,
                                px: activeComboTab === tab ? { xs: 2, md: 3 } : 0,
                                py: activeComboTab === tab ? { xs: 0.4, md: 0.6 } : 0,
                                transition: "0.25s",
                                whiteSpace: "nowrap",
                            }}
                        >
                            {tab}
                        </Button>
                    ))}
                </Box>
            </Box>
            <Box sx={{ mt: 4, display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr 1fr" }, gap: 4, }}>
                {filteredCombos?.map((item, index) => (
                    <Box
                        key={index}
                        sx={{
                            position: "relative",
                            borderRadius: 3,
                            overflow: "hidden",
                            bgcolor: "#fff",
                            boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                            transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                            cursor: "pointer",
                            "&:hover": {
                                transform: "translateY(-10px) scale(1.02)",
                                boxShadow: "0 12px 35px rgba(0,0,0,0.18)",
                                "& .product-image": {
                                    transform: "scale(1.15)",
                                },
                                "& .heart-icon": {
                                    transform: "scale(1.2) rotate(10deg)",
                                    bgcolor: "#fff",
                                    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                                },
                                "& .add-to-cart": {
                                    backgroundColor: "var(--themeColor)",
                                    color: "#fff",
                                    transform: "scale(1.05)",
                                },
                            },
                        }}
                    >
                        <Box
                            className="heart-icon"
                            sx={{
                                position: "absolute",
                                right: 15,
                                top: 15,
                                zIndex: 10,
                                bgcolor: "rgba(255,255,255,0.9)",
                                borderRadius: "50%",
                                width: 36,
                                height: 36,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                cursor: "pointer",
                                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                                backdropFilter: "blur(10px)",
                            }}
                        >
                            <FavoriteBorderIcon sx={{ fontSize: 22, color: "var(--themeColor)" }} />
                        </Box>
                        <Box
                            className="product-image"
                            component="img"
                            src={item?.img}
                            alt={item?.title}
                            sx={{
                                width: "100%",
                                height: 260,
                                objectFit: "cover",
                                transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
                            }}
                        />
                        <Box sx={{ p: 2 }}>
                            <Typography sx={{ fontSize: 20, fontWeight: 700, mb: 0.5 }}>
                                {item?.title}
                            </Typography>
                            <Typography sx={{ fontSize: 14, color: "gray", mb: 2, lineHeight: 1.4, }}>
                                {item?.description}
                            </Typography>
                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", }}>
                                <Typography sx={{ fontSize: 18, fontWeight: 600 }}>
                                    {item?.price}
                                </Typography>

                                <Box
                                    className="add-to-cart"
                                    sx={{
                                        backgroundColor: "#fbc7b5",
                                        color: "var(--themeColor)",
                                        px: 2.5,
                                        py: 0.7,
                                        borderRadius: 20,
                                        cursor: "pointer",
                                        fontWeight: 600,
                                        fontSize: 14,
                                        textAlign: "center",
                                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                                        boxShadow: "0 2px 8px rgba(251,199,181,0.3)",
                                    }}
                                >
                                    Add to Cart
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};
