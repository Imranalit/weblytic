import { Metadata } from "next";
import { notFound } from "next/navigation";
import { packagesData } from "@/lib/pricingData";
import PricingDetailClient from "./PricingDetailClient";

interface Props {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return Object.keys(packagesData).map((slug) => ({
    slug,
  }));
}

export function generateMetadata({ params }: Props): Metadata {
  const pkg = packagesData[params.slug];
  if (!pkg) return { title: "Package Not Found | Weblytic" };

  return {
    title: `${pkg.name} — Full Specifications & Pricing | Weblytic`,
    description: pkg.tagline,
    alternates: {
      canonical: `https://weblytic.cc/pricing/${pkg.slug}`,
    },
    openGraph: {
      title: `${pkg.name} | Weblytic Digital Agency`,
      description: pkg.tagline,
      url: `https://weblytic.cc/pricing/${pkg.slug}`,
    },
  };
}

export default function PricingDetailPage({ params }: Props) {
  const pkg = packagesData[params.slug];
  if (!pkg) {
    notFound();
  }

  return <PricingDetailClient pkg={pkg} />;
}
