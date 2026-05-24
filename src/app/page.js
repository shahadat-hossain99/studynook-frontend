import Banner from "@/components/Home/Banner";
import CTABanner from "@/components/Home/CtaBanner";
import FAQ from "@/components/Home/Faq";
import FeaturedRooms from "@/components/Home/FeaturedRooms";
import HowItWorks from "@/components/Home/HowItWorks";
import Testimonials from "@/components/Home/Testimonials";
import SmoothScroll from "@/components/UI/SmoothScroll";

export const metadata = { title: "StudyNook – Home" };

export default async function Home() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/featured`, {
    cache: "no-store",
  });

  const featuredRooms = await res.json();

  return (
    <div>
      <SmoothScroll>
        <Banner />
        <FeaturedRooms featuredRooms={featuredRooms} />
        <HowItWorks />
        <Testimonials />
        <FAQ />
        {/* <CTABanner /> */}
      </SmoothScroll>
    </div>
  );
}
