import Image from "next/image";
import { notFound } from "next/navigation";
import EventGallery from "../EventGallery";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import prisma from "@/lib/prisma";
import type { Metadata } from "next";

type Params = { params: Promise<{ id: string }> };

// Dynamic Metadata Generation
export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { id } = await params;
  const event = await prisma.event.findUnique({ where: { slug: id } });

  if (!event) {
    return {
      title: "Event Not Found | Verbum Networks",
      description: "This event could not be found or may have been removed.",
    };
  }

  const siteUrl = `https://catholicdioceseofkatsina.org/event/${event.slug}`;
  const description = event.content.slice(0, 160).replace(/\n/g, " ");

  return {
    title: `${event.title} | Verbum Networks Events`,
    description,
    openGraph: {
      title: event.title,
      description,
      type: "article",
      url: siteUrl,
      publishedTime: event.date.toISOString(),
      images: [
        {
          url: event.cover,
          alt: event.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: event.title,
      description,
      images: [event.cover],
    },
    alternates: {
      canonical: siteUrl,
    },
  };
}

// ✅ 2️⃣ Page Component
export default async function EventDetailPage({ params }: Params) {
  const { id } = await params;
  const event = await prisma.event.findUnique({ where: { slug: id } });
  if (!event) return notFound();

  return (
    <main
      className="mx-auto max-w-4xl px-4 py-12"
      itemScope
      itemType="https://schema.org/Event"
    >
      <meta itemProp="name" content={event.title} />
      <meta itemProp="startDate" content={new Date(event.date).toISOString()} />
      <meta itemProp="image" content={event.cover} />
      <meta itemProp="description" content={event.content.slice(0, 160)} />

      {/* Navigation */}
      <Link
        href="/event"
        className="flex items-center gap-2 text-slate-600 hover:text-slate-800"
      >
        <ArrowLeft className="w-4 h-4" /> Back to events
      </Link>

      {/* Header Section */}
      <section className="mt-6">
        <h1 itemProp="name" className="text-3xl font-bold text-slate-900">
          {event.title}
        </h1>
        <p className="mt-1 text-sm text-slate-500" itemProp="startDate">
          {new Date(event.date).toLocaleDateString()}
        </p>

        {/* Cover Image */}
        <div className="relative mt-6 h-80 w-full overflow-hidden rounded-lg border bg-white">
          <Image
            src={event.cover}
            alt={event.title}
            fill
            className="object-contain "
            priority
          />
        </div>
      </section>

      {/* Content */}
      <article
        className="prose prose-slate max-w-none mt-8 text-justify leading-relaxed md:tracking-wider tracking-tight"
        itemProp="description"
      >
        {event.content}
      </article>

      {/* Gallery Section */}
      <section itemProp="photo">
        <h2 className="mt-10 mb-4 text-2xl font-semibold text-slate-900">
          Photo Highlights
        </h2>
        <EventGallery images={event.images} />
      </section>
    </main>
  );
}
