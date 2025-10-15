import prisma from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const item = await prisma.homily.findUnique({
    where: { slug: id },
    select: { title: true, summary: true, image: true, date: true },
  });

  if (!item) {
    return {
      title: "Homily Not Found | Katsina Diocese",
      description:
        "The requested homily could not be found or may have been removed.",
    };
  }

  const siteUrl = `https://catholicdioceseofkatsina.org/homily/${id}`;
  const description =
    item.summary?.slice(0, 160) || "Read today’s reflection and insights.";

  return {
    title: `${item.title} | Katsina Diocese Reflections`,
    description,
    openGraph: {
      title: item.title,
      description,
      url: siteUrl,
      type: "article",
      publishedTime: item.date?.toISOString(),
      images: [{ url: item.image, alt: item.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: item.title,
      description,
      images: [item.image],
    },
    alternates: {
      canonical: siteUrl,
    },
  };
}

export default async function NewsDetailPage({ params }: Props) {
  const { id } =await params;
  const item = await prisma.homily.findUnique({
    where: { slug: id },
    select: { title: true, date: true, content: true, image: true },
  });

  if (!item) return notFound();

  return (
    <article
      className="py-16 px-4 bg-gray-100"
      itemScope
      itemType="https://schema.org/Article"
    >
      <meta itemProp="headline" content={item.title} />
      <meta itemProp="image" content={item.image} />
      <meta itemProp="datePublished" content={item.date.toISOString()} />
      <meta itemProp="author" content="Katsina Diocese" />

      <div className="max-w-3xl mx-auto">
        {/* Back to all reflections */}
        <div className="mb-6">
          <Link
            href="/homily"
            className="inline-flex items-center gap-2 text-[#0C1A2B] hover:underline"
          >
            <span aria-hidden>←</span> Back to all reflections
          </Link>
        </div>

        {/* Date */}
        <p className="text-sm text-gray-500 mb-3" itemProp="datePublished">
          {item.date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>

        {/* Title */}
        <h1
          className="text-3xl md:text-4xl font-bold text-[#0C1A2B] mb-6"
          itemProp="headline"
        >
          {item.title}
        </h1>

        {/* Cover Image */}
        <div className="relative w-full h-72 md:h-96 mb-8 rounded-lg overflow-hidden shadow">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Content */}
        <div className="prose prose-slate max-w-none" itemProp="articleBody">
          <p>{item.content}</p>
        </div>
      </div>
    </article>
  );
}
