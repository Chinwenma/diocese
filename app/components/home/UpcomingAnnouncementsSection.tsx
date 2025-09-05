import Image from 'next/image';
import AnimatedButton from "../button/Button";
import SectionHeading from '../heading/SectionHeading';
import prisma from '@/lib/prisma';
import Link from 'next/link';

export default async function UpcomingAnnouncementsSection() {
  const announcements = await prisma.announcement.findMany({
    take: 3,
    orderBy: {
      date: 'asc',
    }
  })
  return (
    <section className="bg-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          title="  Upcoming Diocesan Events"
          subtitle="Stay updated on upcoming liturgies, celebrations, and community activities within our diocese"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {announcements.length === 0 ?
            <div className="bg-gray-50 rounded-lg shadow hover:shadow-md transition overflow-hidden mx-auto lg:col-span-3 w-full max-w-xl text-center">
              <div className="p-6">
                <h3 className="text-lg font-medium mb-2">No events</h3>
                <p className="text-gray-600">There are no events at the moment.</p>
              </div>
            </div>
          :
          announcements.map((item) => (
            <div
              key={item.id}
              className="bg-gray-50 rounded-lg shadow hover:shadow-md transition overflow-hidden"
            >
              <div className="relative w-full h-48">
                <Image src={item.image} alt={item.title} fill className="object-cover" />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-1">{item.title}</h3>
                <p className="text-sm text-gray-500 mb-2">
                  📅 {new Date(item.date).toDateString()}
                </p>
                <p className="text-sm text-gray-700 mb-4 line-clamp-3">{item.description}</p>
                <Link
                  href={`/announcement/${item.slug}`}
                  className="text-[#007955] font-medium text-sm hover:underline"
                >
                  View Details →
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <AnimatedButton href="/announcement" label=" View All" variant='secondary' />

        </div>
      </div>
    </section>
  );
}
