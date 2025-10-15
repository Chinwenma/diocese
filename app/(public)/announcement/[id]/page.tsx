import PageBanner from "@/app/components/banner/PageBanner";
import prisma from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const item = await prisma.announcement.findUnique({
    where: { slug: id },
    select: { title: true, description: true, image: true },
  });
  if (!item) return { title: "Announcement not found" };
  return {
    title: item.title,
    description: item.description,
    openGraph: {
      title: item.title,
      description: item.description,
      images: [{ url: item.image }],
    },
  };
}

export default async function AnnouncementDetailPage({ params }: Props) {
  const { id } = await params;
  const item = await prisma.announcement.findUnique({
    where: { slug: id },
    select: { title: true, date: true, details: true, image: true },
  });
  if (!item) return notFound();

  return (

    <main
    >
      <PageBanner 
      title="All Announcements"
      />
    <article className="py-16 px-4 bg-gray-100">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <Link
            href="/announcement"
            className="inline-flex items-center gap-2 text-[#c6a70e] hover:underline"
          >
            <span aria-hidden>←</span> Back 
          </Link>
        </div>

        <p className="text-sm text-gray-500 mb-3">
          {item.date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <h1 className="text-3xl md:text-4xl font-bold text-[#0C1A2B] mb-6">
          {item.title}
        </h1>

           <div className="relative my-8 h-96 w-full overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-contain "
                    priority
                  />
                </div>


        <div className="[overflow-wrap:anywhere] text-justify [word-break:break-word] hyphens-auto leading-relaxed tracking-wider">
          <p>{item.details}</p>
        </div>
      </div>
    </article>
    </main>
  );
}
