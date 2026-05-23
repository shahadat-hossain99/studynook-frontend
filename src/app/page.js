import Banner from "@/components/Home/Banner";
import CTABanner from "@/components/Home/CtaBanner";
import FAQ from "@/components/Home/Faq";
import FeaturedRooms from "@/components/Home/FeaturedRooms";
import HowItWorks from "@/components/Home/HowItWorks";
import Testimonials from "@/components/Home/Testimonials";

export const metadata = { title: "StudyNook – Home" };

export default async function Home() {
  const res = await fetch("http://localhost:5004/featured", {
    cache: "no-store",
  });

  const featuredRooms = await res.json();

  return (
    <div className="">
      <Banner />
      <FeaturedRooms featuredRooms={featuredRooms} />
      <HowItWorks />
      <Testimonials />
      <FAQ />
      {/* <CTABanner /> */}
    </div>
  );
}
