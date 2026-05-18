import { Space_Grotesk, Poppins } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
});
export const metadata = {
  title: " StudyNook ",
  description: " Library Study Room Booking",
};

export default function RootLayout({ children }) {
  return (
    <html data-theme="light" lang="en" className={`h-full antialiased`}>
      <body className={`${poppins.className} min-h-full flex flex-col`}>
        <main>{children}</main>
      </body>
    </html>
  );
}
