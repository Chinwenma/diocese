import Image from "next/image";
import Link from "next/link";
import PageBanner from "../../components/banner/PageBanner";
import prisma from "@/lib/prisma";

export default async function HomilyListPage() {
  const items = await prisma.homily.findMany({
    orderBy: { date: "desc" },
  });

  return (
    <main>
      <PageBanner
        title="All  Bishop's Relfections"
        subtitle="Get all homilies and reflections from the Bishop."
      />
      <section className="py-16 px-4 bg-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map((item) => (
              <div className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition" key={item.id}>
                <div className="relative h-48 w-full">
                  <Image
                    src={item.image}
                    alt={item.title}
                   fill
                    className="object-contain"
                  />
                </div>
                <div className="p-5">
                  <p className="text-sm text-gray-500 mb-2">
                    {item.date.toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  <h2 className="text-xl font-semibold text-[#0C1A2B] mb-2">
                    {item.title}
                  </h2>
                  <p className="text-sm text-gray-600">{item.summary}</p>
                </div>
                <Link
                  key={item.id}
                  href={`/homily/${item.slug}`}
                  className="inline-block text-emerald-700 font-medium text-sm hover:underline p-5"
                >
                  Read More →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
