import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ModalProvider } from "@/context/ModalContext";
import { ToastProvider } from "@/context/ToastContext";
import GSAPScrollTrigger from "@/components/GSAPScrollTrigger";
import "./globals.css";

export const metadata: Metadata = {
  title: "Best CBSE School | Admissions Open",
  description:
    "This is the right time to be admitted to Narayana School in 2027 - 28! Learn more about the application process, costs, and eligibility. Register Now",
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="shortcut icon" href="/favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
        />
      </head>
      <body>
        <ModalProvider autoOpenDelayMs={7000}>
          <ToastProvider>
            <GSAPScrollTrigger />
            <Header />
            {children}
            <Footer />
          </ToastProvider>
        </ModalProvider>
      </body>
    </html>
  );
}