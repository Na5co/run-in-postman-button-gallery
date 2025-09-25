import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Postman Button Studio - Craft Stunning Run in Postman Buttons",
  description: "Create beautiful, customizable Run in Postman buttons with unique styles, gradient colors, and modern animations. 10 distinct button designs with full customization.",
  keywords: ["postman", "api", "documentation", "button", "gradient", "custom", "generator"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}