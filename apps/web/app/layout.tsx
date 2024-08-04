import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import BackgroundGridWrapper from "@/components/main/BackgroundGridWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "iiitr.insights",
  description: "Explore IIIT Ranchi's Universe through IIITR.Insights",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <BackgroundGridWrapper>{children}</BackgroundGridWrapper>
      </body>
    </html>
  );
}
