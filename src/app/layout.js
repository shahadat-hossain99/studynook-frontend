import { Space_Grotesk, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Shared/Navbar/Navbar";
import Footer from "@/components/Shared/Footer/Footer";
import { ToastContainer } from "react-toastify";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
export const metadata = {
  title: {
    default: "StudyNook",
    template: "StudyNook - %s ",
  },
  description: "Where Focus Finds its Place. Book your study room in seconds.",
};

export default function RootLayout({ children }) {
  return (
    <html
      data-theme="light"
      lang="en"
      className={`${spaceGrotesk.variable} h-full antialiased `}
    >
      <body
        className={`${poppins.className} min-h-full flex flex-col`}
        suppressHydrationWarning={true}
      >
        <Navbar />
        <main>{children}</main>
        <Footer />

        <ToastContainer />
      </body>
    </html>
  );
}
