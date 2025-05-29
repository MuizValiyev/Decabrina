import "./globals.css";
import { Jost } from 'next/font/google'

const geistSans = Jost({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});


export const metadata = {
  title: "Decabrina",
  description: "Decabrina",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}