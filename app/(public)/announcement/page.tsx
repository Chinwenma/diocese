import Image from 'next/image';
import Link from 'next/link';
import PageBanner from '../../components/banner/PageBanner';
import prisma from "@/lib/prisma";

export default async function AnnouncementsPage() {
    const announcements = await prisma.announcement.findMany();
  return (
    <main>
        <PageBanner
        title=' Upcoming Diocesan Events'/>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 py-12 px-4">
        {/* Main Announcement Content */}
        <div className="lg:col-span-2 space-y-10">
          {announcements.map((announcement) => (
            <div key={announcement.slug} className="bg-white rounded-lg shadow hover:shadow-md transition overflow-hidden">
              <div className="relative w-full h-64 md:h-80 lg:h-96">
                <Image
                  src={announcement.image}
                  alt={announcement.title}
                  fill
                  className="object-contain"
                  loading='lazy'
                />
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-semibold mb-2">{announcement.title}</h2>
                <p className="text-sm text-gray-500 mb-2">
                    {announcement.date.toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                </p>
                <p className="text-gray-700 mb-4 leading-relaxed tracking-wider text-justify">{announcement.description}</p>
                <Link
                  href={`/announcement/${announcement.slug}`}
                  className="inline-block text-red-700 font-medium hover:underline"
                >
                  View Details →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar */}
       {/* Sidebar */}
<aside className="space-y-8">
  {/* External Liturgical Calendar (GCatholic) */}
  <div className="bg-white p-6 rounded shadow">
    <h3 className="text-xl font-semibold mb-3">Liturgical Calendar</h3>
    <p className="text-sm text-gray-700 mb-4">
      For the full Nigeria (2025) liturgical calendar with feasts, memorials, and Sundays,
      please use the official resource below.
    </p>
    <Link
      href="https://gcatholic.org/calendar/2025/NG-en"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center rounded-md bg-[#800000] px-4 py-2 text-white font-medium hover:opacity-90"
      aria-label="Open Nigeria (2025) - Liturgical Calendar on GCatholic in a new tab"
    >
      View Nigeria (2025) Calendar ↗
    </Link>
    <p className="mt-3 text-xs text-gray-500">
      Source: GCatholic.org
    </p>
  </div>

  {/* Highlights */}
  <div className="bg-white p-6 rounded shadow">
    <h3 className="text-xl font-semibold mb-4">Upcoming Highlights</h3>
    <ul className="space-y-3 text-sm">
      {announcements.map((a) => (
        <li key={a.slug}>
          <Link href={`/announcement/${a.slug}`} className="text-red-700 hover:underline">
            {a.title}
          </Link>
          <p className="text-gray-500 text-xs">
            {new Date(a.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>
        </li>
      ))}
    </ul>
  </div>


</aside>

      </div>
    </main>
  );
}
