import React, { useEffect, useRef, useState } from "react";
import { Box, Container, Grid, Button, Divider, CircularProgress, Typography } from "@mui/material";
import { CustomText } from "../../components/comman/CustomText";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { getBlogById, getAllBlogs } from "../../utils/apiService";

const normalizeBlog = (raw) => {
  if (!raw) return null;
  const id = raw._id ?? raw.id;
  const title = raw?.title ?? "";
  const description = raw?.description ?? raw?.content ?? raw?.body ?? "";
  const image = raw?.image ?? raw?.thumbnail ?? raw?.featuredImage ?? raw?.bannerImage;
  const category = raw?.category ?? raw?.categoryName ?? "Blog";
  const author = raw?.author ?? raw?.authorName ?? raw?.postedBy ?? "Danbro by Mr Brown Bakery";
  let date = raw?.date ?? raw?.createdAt ?? raw?.updatedAt ?? "";
  if (date && typeof date === "string" && date.length >= 10) {
    try {
      const d = new Date(date);
      if (!isNaN(d.getTime())) date = d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
    } catch (_) {}
  }
  return { id, title, description, image, category, date, author };
};

export default function BlogDetails() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { id: paramId } = useParams();
  const [blog, setBlog] = useState(state ? normalizeBlog(state) : null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [loading, setLoading] = useState(!state && !!paramId);
  const [error, setError] = useState(null);
  const [visibleSections, setVisibleSections] = useState({});

  const sectionRefs = {
    header: useRef(null),
    categories: useRef(null),
    title: useRef(null),
    image: useRef(null),
    content: useRef(null),
    comment: useRef(null),
    specialties: useRef(null),
  };

  useEffect(() => {
    if (state) {
      setBlog(normalizeBlog(state));
      setLoading(false);
      return;
    }
    if (!paramId) {
      setLoading(false);
      return;
    }
    let cancelled = false;
    const fetchBlog = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getBlogById(paramId);
        if (!cancelled) {
          setBlog(normalizeBlog(data));
        }
      } catch (err) {
        if (!cancelled) {
          setError(err?.message || "Failed to load blog");
          setBlog(null);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetchBlog();
    return () => { cancelled = true; };
  }, [paramId, state]);

  useEffect(() => {
    const loadRelated = async () => {
      try {
        const data = await getAllBlogs();
        const list = Array.isArray(data) ? data.map(normalizeBlog) : [];
        const currentId = blog?.id ?? paramId;
        const related = list.filter((b) => b?.id && String(b.id) !== String(currentId)).slice(0, 4);
        setRelatedBlogs(related);
      } catch (_) {
        setRelatedBlogs([]);
      }
    };
    if (blog || paramId) loadRelated();
  }, [blog?.id, paramId]);

  useEffect(() => {
    const observers = Object.keys(sectionRefs).map((key) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleSections((prev) => ({ ...prev, [key]: true }));
            }
          });
        },
        { threshold: 0.1 }
      );
      if (sectionRefs[key].current) {
        observer.observe(sectionRefs[key].current);
      }
      return observer;
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  const categories = relatedBlogs.length
    ? [...new Set(relatedBlogs.map((b) => b.category).filter(Boolean))]
    : blog?.category
    ? [blog.category]
    : ["Blog"];

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: 300 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !blog) {
    return (
      <Box sx={{ p: 4, textAlign: "center" }}>
        <Typography color="error">{error || "Blog not found."}</Typography>
        <Button onClick={() => navigate("/blog")} sx={{ mt: 2 }}>
          Back to Blogs
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ backgroundColor: "#fff", mb: { xs: 8, md: 10 }, p: { xs: 1.25, md: 0 } }}>
      <Container  sx={{ py: { xs: 2, md: 2 }, px: { xs: 2, md: 3 } }}>
        <Box ref={sectionRefs.header}>
          <Button
            onClick={() => navigate(-1)}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              color: "#000",
              textTransform: "none",
              fontSize: { xs: 13, md: 14 },
              transition: "all 0.3s ease",
              "&:hover": { color: "#ED7D2B", backgroundColor: "transparent" },
            }}
          >
            <ArrowBackIosIcon sx={{ fontSize: { xs: 14, md: 16 } }} /> Back
          </Button>
        </Box>
      </Container>

      {/* Category Navigation */}
      <Container  ref={sectionRefs.categories} sx={{ px: { xs: 2, md: 3 } }}>
        <Box
          sx={{
            opacity: visibleSections.categories ? 1 : 0,
            transform: visibleSections.categories ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
          }}
        >
          <Divider sx={{ borderBottomWidth: 2, borderColor: "black" }} />
          <Box sx={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 0 }}>
            {categories.map((cat, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  px: { xs: 1, sm: 1.5, md: 2 },
                  borderRight: index !== categories.length - 1 ? "2px solid black" : "none",
                  my: 1,
                }}
              >
                <Button
                  disableRipple
                  sx={{
                    fontSize: { xs: 11, sm: 12, md: 14 },
                    color: "#000",
                    borderRadius: 0,
                    fontWeight: 500,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      color: "#ED7D2B",
                      backgroundColor: "transparent",
                    },
                  }}
                >
                  {cat}
                </Button>
              </Box>
            ))}
          </Box>
          <Divider sx={{ mb: { xs: 3, md: 4 }, borderBottomWidth: 2, borderColor: "black" }} />
        </Box>
      </Container>

      {/* BLOG TITLE + Meta */}
      <Container  sx={{ textAlign: "center", mb: { xs: 3, md: 4 }, px: { xs: 2, md: 3 } }} ref={sectionRefs.title}>
        <Box
          sx={{
            opacity: visibleSections.title ? 1 : 0,
            transform: visibleSections.title ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
          }}
        >
          <CustomText
            sx={{
              fontSize: { xs: 20, sm: 24, md: 26 },
              fontWeight: 700,
              mb: 1,
              px: { xs: 2, sm: 0 },
            }}
          >
            {blog.title}
          </CustomText>

          <CustomText
            sx={{
              fontSize: { xs: 10, sm: 11, md: 11 },
              color: "#8a8a8a",
              textTransform: "uppercase",
            }}
          >
            {blog.date} • POSTED BY {blog.author}
          </CustomText>
        </Box>
      </Container>

      {/* Blog Image */}
      <Container  ref={sectionRefs.image} sx={{ px: { xs: 2, md: 3 } }}>
        <Box
          sx={{
            width: "100%",
            height: { xs: 220, sm: 300, md: 420 },
            borderRadius: { xs: 2, md: 3 },
            overflow: "hidden",
            mb: { xs: 3, md: 4 },
            opacity: visibleSections.image ? 1 : 0,
            transform: visibleSections.image ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
          }}
        >
          <img
            src={typeof blog.image === "string" ? blog.image : blog.image}
            alt={blog.title}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://via.placeholder.com/800x420?text=Blog";
            }}
          />
        </Box>
      </Container>

      {/* Blog Content */}
      <Container sx={{ lineHeight: 1.8, color: "#444", px: { xs: 2, md: 3 } }} ref={sectionRefs.content}>
        <Box
          sx={{
            opacity: visibleSections.content ? 1 : 0,
            transform: visibleSections.content ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
          }}
        >
          <CustomText
            sx={{ fontSize: { xs: 14, sm: 15, md: 15 }, mb: 3, whiteSpace: "pre-wrap" }}
          >
            {blog.description}
          </CustomText>

          {/* Divider */}
          <Box sx={{ height: 1, width: "100%", background: "#ddd", my: { xs: 3, md: 4 } }} />
        </Box>
      </Container>
    </Box>
  );
}
