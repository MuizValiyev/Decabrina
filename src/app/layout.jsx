'use client';
import "./globals.css";
import { Jost } from 'next/font/google';
import { LanguageProvider } from "@/context/languageContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const geistSans = Jost({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});


// export const metadata = {
//   title: "Decabrina",
//   description: "Decabrina",
// };

const queryClient = new QueryClient();


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} antialiased`}>
        <QueryClientProvider client={queryClient}>
        <LanguageProvider>{children}</LanguageProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}