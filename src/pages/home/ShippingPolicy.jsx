import React from "react";
import { StaticContentLayout } from "../../components/comman/StaticContentLayout";
import { useStaticContent } from "../../hooks/useStaticContent";

export const ShippingPolicy = () => {
  const { data, loading } = useStaticContent("shippingPolicy");
  const pageTitle = data?.title ?? "Shipping Policy";
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
