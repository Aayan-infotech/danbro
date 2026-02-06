import React from "react";
import { StaticContentLayout } from "../../components/comman/StaticContentLayout";
import { useStaticContent } from "../../hooks/useStaticContent";

export const TermsAndConditions = () => {
  const { data, loading } = useStaticContent("termsAndConditions");
  const pageTitle = data?.title ?? "Terms & Conditions";
  const updatedAt = data?.updatedAt ?? null;
  const sections = data?.sections && data.sections.length > 0 ? data.sections : [];
  const content = data?.content ?? null;

  return (
    <StaticContentLayout
      pageTitle={pageTitle}
      updatedAt={updatedAt}
      sections={sections}
      content={content}
      loading={loading}
    />
  );
};
