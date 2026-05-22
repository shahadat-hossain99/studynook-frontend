import Banner from "@/components/Home/Banner";
import FeaturedRooms from "@/components/Home/FeaturedRooms";
import Image from "next/image";

export default async function Home() {
  const res = await fetch("http://localhost:5004/featured", {
    cache: "no-store",
  });

  const featuredRooms = await res.json();

  return (
    <div className="">
      <Banner />
      <FeaturedRooms featuredRooms={featuredRooms} />
    </div>
  );
}
