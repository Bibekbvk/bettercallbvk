import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Architect Profile & Credentials",
  description: "View the software engineering portfolio, credentials, and technical background of Bibek Bhattarai (Bvk) — Full-stack Next.js and AI systems architect in Kathmandu, Nepal.",
  alternates: {
    canonical: "https://better-call-bvk.web.app/profile",
  },
  openGraph: {
    title: "Architect Profile & Credentials | Better Call Bvk",
    description: "Software engineering portfolio and background of Bibek Bhattarai (Bvk).",
    url: "https://better-call-bvk.web.app/profile",
    images: ["/guru-poster.jpg"],
  },
};

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
