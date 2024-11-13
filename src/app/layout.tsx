import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Reimagined By Sangeethan",
  description: "Custom crafted animations",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` `}>{children}</body>
    </html>
  );
}
