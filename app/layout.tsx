import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar/Navbar";
import ClientWrapper from "@/components/ClientWrapper";
import RegisterModal from "@/components/modals/RegisterModal";
import ToasterProvider from "@/providers/ToasterProvider";

const font = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rental Agency Template",
  description:
    "This application was created for educational purposes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ClientWrapper>
          <ToasterProvider />
          <RegisterModal />
          <Navbar />
        </ClientWrapper>
        {children}
      </body>
    </html>
  );
}
