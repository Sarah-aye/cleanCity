import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { ConfirmProvider } from "./context/ConfirmContext";
import ConfirmDialog from "./components/ConfirmDialog";
import PWAWarmCache from "./components/PWAWarmCache";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "CleanCity",
  description: "Waste management and recycling tracker app",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "CleanCity",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#198754" },
    { media: "(prefers-color-scheme: dark)", color: "#121212" },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <meta name="color-scheme" content="light dark" />
      </head>
      <body className=" bg-dark text-light min-vh-100 flex flex-col">
        <ConfirmProvider>
          <PWAWarmCache />
          {children}
          <ConfirmDialog />
        </ConfirmProvider>
      </body>
    </html>
  );
}
