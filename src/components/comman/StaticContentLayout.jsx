import React from "react";
import { Box, Container, Divider, CircularProgress } from "@mui/material";
import { CustomText } from "./CustomText";

const Section = ({ title, content }) => {
  const isHtml = typeof content === "string" && (content.trim().startsWith("<") || content.includes("<"));
  return (
    <Box sx={{ mb: { xs: 4, md: 5 } }}>
      <CustomText
        variant="h5"
        sx={{
          fontSize: { xs: 18, sm: 20, md: 24 },
          fontWeight: 700,
          color: "#2c2c2c",
          mb: { xs: 1.5, md: 2 },
        }}
      >
        {title}
      </CustomText>
      {isHtml ? (
        <Box
          sx={{
            fontSize: { xs: 14, sm: 15, md: 16 },
            color: "#555",
            lineHeight: 1.8,
            "& ul": { paddingLeft: "20px", marginTop: "12px" },
            "& li": { marginBottom: "8px" },
            "& p": { marginBottom: "12px" },
          }}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      ) : (
        <CustomText sx={{ fontSize: { xs: 14, sm: 15, md: 16 }, color: "#555", lineHeight: 1.8 }}>
          {content}
        </CustomText>
      )}
      <Divider sx={{ mt: { xs: 3, md: 4 } }} />
    </Box>
  );
};

/**
 * Renders a policy/static page with title, last updated, and sections or raw HTML content.
 * @param {string} pageTitle - Page heading (e.g. "Terms & Conditions")
 * @param {string} [updatedAt] - Last updated date string
 * @param {Array<{ title: string, content: string }>} [sections] - Sections to render
 * @param {string} [content] - Raw HTML content (used when sections not provided)
 * @param {boolean} [loading] - Show loading spinner
 * @param {React.ReactNode} [fallback] - Content to show when no sections and no content (e.g. static fallback)
 */
export const StaticContentLayout = ({
  pageTitle,
  updatedAt,
  sections = [],
  content,
  loading = false,
  fallback = null,
}) => {
  if (loading) {
    return (
      <Box sx={{ width: "100%", overflowX: "hidden", backgroundColor: "#fff", minHeight: "40vh", display: "flex", alignItems: "center", justifyContent: "center", py: 8 }}>
        <CircularProgress sx={{ color: "var(--themeColor)" }} />
      </Box>
    );
  }

  const hasSections = Array.isArray(sections) && sections.length > 0;
  const hasContent = content && String(content).trim();

  return (
    <Box sx={{ width: "100%", overflowX: "hidden", backgroundColor: "#fff", pb: { xs: 12, md: 0 }, p: { xs: 1.25, md: 0 } }}>
      <Container sx={{ py: { xs: 4, md: 6 }, px: { xs: 2, md: 3 } }}>
        <CustomText
          variant="h3"
          sx={{
            fontSize: { xs: 28, sm: 32, md: 40 },
            fontWeight: 700,
            color: "var(--themeColor)",
            mb: { xs: 2, md: 3 },
            textAlign: "center",
          }}
        >
          {pageTitle}
        </CustomText>
        {updatedAt && (
          <CustomText
            sx={{
              fontSize: { xs: 12, sm: 13, md: 14 },
              color: "#666",
              textAlign: "center",
              mb: { xs: 4, md: 5 },
            }}
          >
            Last Updated: {updatedAt}
          </CustomText>
        )}

        <Box sx={{ maxWidth: "900px", mx: "auto" }}>
          {hasSections && sections.map((sec, index) => (
            <Section key={index} title={sec.title} content={sec.content} />
          ))}
          {!hasSections && hasContent && (
            <Box
              sx={{
                fontSize: { xs: 14, sm: 15, md: 16 },
                color: "#555",
                lineHeight: 1.8,
                "& ul": { paddingLeft: "20px", marginTop: "12px" },
                "& li": { marginBottom: "8px" },
                "& p": { marginBottom: "12px" },
              }}
              dangerouslySetInnerHTML={{ __html: content }}
            />
          )}
          {!hasSections && !hasContent && (fallback ?? (
            <CustomText sx={{ textAlign: "center", color: "#666", fontSize: 14 }}>Content not available.</CustomText>
          ))}
        </Box>
      </Container>
    </Box>
  );
};
