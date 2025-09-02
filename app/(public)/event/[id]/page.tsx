import Image from "next/image";
import { notFound } from "next/navigation";
import EventGallery from "../EventGallery";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import prisma from "@/lib/prisma";

type Params = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Params) {
  const { id } = await params;
  const e = await prisma.event.findUnique({where: {slug: id}});
  return { title: e ? e.title : "Event" };
}

export default async function EventDetailPage({ params }: Params) {
  const { id } = await params;
  const event =await prisma.event.findUnique({where: {slug: id}});
  if (!event) return notFound();

  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <Link href="/event">
      <ArrowLeft className="my-4 inline"/> Back to events
      </Link>
      <div className="flex items-start gap-4">
        <div className="relative h-28 w-28 overflow-hidden rounded-lg border bg-white">
          <Image src={event.cover} alt={event.title} fill className="object-cover" />
        </div>
        <div>
          <h1 className="mt-1 text-3xl font-bold text-slate-900">{event.title}</h1>
          <p className="mt-1 text-sm text-slate-500">
            {new Date(event.date).toLocaleDateString()}
          </p>
        </div>
      </div>

      <article className="prose prose-slate max-w-none mt-8">
        {event.content.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </article>

      <h2 className="mt-10 mb-4 text-2xl font-semibold text-slate-900">Photo Highlights</h2>
      <EventGallery images={event.images} />
    </main>
  );
}
