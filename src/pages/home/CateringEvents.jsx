import { Box, Container, Typography, Grid, Card, CardContent, Button } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import cateringEvents from "../../assets/createevents.png";
import createevents1 from "../../assets/createevents1.png";

export const CateringEvents = () => {
  const specialties = [
    {
      title: "Weddings",
      description: "Elegant cakes and desserts for your special day.",
      image: createevents1,
    },
    {
      title: "Corporate Events",
      description: "Delicious treats for meetings, conferences, and company celebrations.",
      image: createevents1,
    },
    {
      title: "Festivals",
      description: "Crowd-pleasing snacks and baked items.",
      image: createevents1,
    },
    {
      title: "Private Parties",
      description: "Personalized baked goods for birthdays, anniversaries, and more.",
      image: createevents1,
    },
  ];


  const services = [
    {
      title: "Menu Planning",
      description: "Our expert team helps you plan the perfect menu for your event, considering your preferences, budget, and guest count.",
    },
    {
      title: "Custom Cakes",
      description: "Design your dream cake with our talented bakers. From simple elegance to elaborate designs, we bring your vision to life.",
    },
    {
      title: "On-Site Service",
      description: "We provide professional on-site catering services with trained staff to ensure your event runs smoothly.",
    },
    {
      title: "Delivery & Setup",
      description: "Timely delivery and professional setup at your venue. We handle everything so you can focus on enjoying your event.",
    },
  ];

  return (
    <Box sx={{ width: "100%", overflowX: "hidden", backgroundColor: "#fff", pb: { xs: 12, md: 16 } }}>
      <Box
        sx={{
          position: "relative",
          height: { xs: 300, md: 400 },
          backgroundImage: `url(${cateringEvents})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "start",
          px: { xs: 3, md: 6 },
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: 36, md: 56 },
            fontWeight: 700,
            color: "#fff",
            mb: 2,
          }}
        >
          Catering & Events
        </Typography>
      </Box>

      {/* Event Types Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
        <Box
          sx={{
            position: "relative",
            height: { xs: 300, md: 400 },
            backgroundImage: `url(${createevents1})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            px: { xs: 3, md: 6 },
            borderRadius: 3,
            pt: { xs: 6, md: 10 },
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: 30, md: 50 },
              fontWeight: 700,
              color: "#fff",
              mb: 2,
              textAlign: "center",
            }}
          >
            Make your celebrations sweeter with Danbro’s premium catering services!
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: 12, md: 14 },
              color: "#fff",
              textAlign: "center",
              maxWidth: "700px",
            }}
          >
            Elevate your event with our exquisite baked goods and personalized service.
          </Typography>
          <Button
            variant="contained"
            sx={{
              color: "#fff",
              backgroundColor: "#ED7D2B",
              textTransform: "none",
              borderRadius: 2,
              mt: 2,
              fontSize: { xs: 14, md: 16 },
              fontWeight: 600,
            }}
          >
            Request a Quote
          </Button>
        </Box>

        {/* Why Choose Section */}
        <Box sx={{ mt: 4 }}>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: 22, md: 30 },
              fontWeight: 700,
              color: "#2c2c2c",
              mb: 2,
            }}
          >
            Why Choose Danbro for Catering?
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: "#555",
              fontSize: { xs: 14, md: 15 },
              maxWidth: "850px",
              lineHeight: 1.7,
              mb: 3,
            }}
          >
            Danbro Bakery brings a touch of elegance and deliciousness to every event.
            Our commitment to quality, customization, and exceptional service ensures your celebration is unforgettable. We offer:
          </Typography>

          <Box sx={{ mt: 2 }}>
            {[
              "Customized menus tailored to your event's theme and dietary needs.",
              "Freshly baked goods using the finest ingredients.",
              "Professional and friendly service from start to finish."
            ].map((item, i) => (
              <Box
                key={i}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  mb: 1.5,
                }}
              >
                <Box
                  sx={{
                    width: 20,
                    height: 20,
                    borderRadius: "4px",
                    border: "2px solid #dcdcdc",
                  }}
                />
                <Typography sx={{ color: "#444", fontSize: { xs: 14, md: 15 } }}>
                  {item}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Container>

      <Container maxWidth="lg" sx={{ py: { xs: 2, md: 4 } }}>
        <Typography
          variant="h2"
          sx={{
            fontSize: { xs: 22, md: 30 },
            fontWeight: 700,
            color: "#2c2c2c",
            mb: 4,
          }}
        >
          Our Catering Specialties
        </Typography>

        <Grid container spacing={2}>
          {specialties.map((item, index) => (
            <Grid size={3}>
              <Box sx={{ cursor: "pointer" }}>
                <Box
                  sx={{
                    borderRadius: 3,
                    overflow: "hidden",
                    height: 170,
                    mb: 2,
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Box>

                <Typography sx={{ fontWeight: 700, fontSize: 16, color: "#2c2c2c" }}>
                  {item.title}
                </Typography>
                <Typography
                  sx={{
                    fontSize: 13,
                    color: "#666",
                    mt: 0.5,
                    lineHeight: 1.5,
                    mx: "auto",
                  }}
                >
                  {item.description}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>

      </Container>

      {/* Contact Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
        <Typography
          variant="h2"
          sx={{
            fontSize: { xs: 24, md: 32 },
            fontWeight: 700,
            color: "#2c2c2c",
            mb: 2,
          }}
        >
          Get in Touch
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: 14, md: 16 },
            color: "#666",
            lineHeight: 1.8,
            mb: 2,
            mx: "auto",
          }}
        >
          Planning an event? Contact us today to discuss your requirements and get a customized quote. Our team is ready to help make your celebration perfect!
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                p: 1,
                borderRadius: 3,
                backgroundColor: "#f9f9f9",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: "#2c2c2c",
                  fontSize: { xs: 16, md: 18 },
                }}
              >
                Visit Us
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "#666",
                  fontSize: { xs: 13, md: 14 },
                  textAlign: "center",
                }}
              >
                B-35, Sector-P, Aliganj, Lucknow 226024
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                p: 1,
                borderRadius: 3,
                backgroundColor: "#f9f9f9",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: "#2c2c2c",
                  fontSize: { xs: 16, md: 18 },
                }}
              >
                Call Us
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "#666",
                  fontSize: { xs: 13, md: 14 },
                  lineHeight: 1.7,
                  textAlign: "center",
                }}
              >
                +91-7309010623
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                p: 1,
                borderRadius: 3,
                backgroundColor: "#f9f9f9",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: "#2c2c2c",
                  fontSize: { xs: 16, md: 18 },
                  textAlign: "center",
                }}
              >
                Email Us
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "#666",
                  fontSize: { xs: 13, md: 14 },
                  textAlign: "center",
                }}
              >
                hr@mrbrownbakery.com
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

