import prisma from "@/lib/prisma";
import BishopSection from "../components/home/Bishop";
import Hero from "../components/home/Hero";
import LatestHomilies from "../components/home/LatestHomilies";
import UpcomingAnnouncementsSection from "../components/home/UpcomingAnnouncementsSection";
import LatestEvents from "../components/home/LatestEvents";

export default async function Home() {

  const [homilies, slideData] = await Promise.all([
    prisma.homily.findMany({
      orderBy: { date: "desc" },
      take: 3,
      select: {
        slug: true,
        title: true,
        date: true,
        summary: true,
        image: true,
      },
    }),
    prisma.slider.findMany(),
  ]);

  return (
    <div>
      <main className="">
        <Hero slideData={slideData} />
        <BishopSection />
        <LatestHomilies homilies={homilies} />
        <LatestEvents />
        <UpcomingAnnouncementsSection />
      </main>
    </div>
  );
}
