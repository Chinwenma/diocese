import prisma from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ id: string }> };

// (Optional) SEO for the admin view page
export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const item = await prisma.slider.findUnique({
    where: { id },
    select: { title: true, subtitle: true, image: true },
  });
  if (!item) return { title: "Slider not found" };
  return {
    title: `View: ${item.title}`,
    description: item.subtitle,
    openGraph: {
      title: item.title,
      description: item.subtitle,
      images: item.image ? [{ url: item.image }] : undefined,
    },
  };
}

export default async function AdminSliderView({ params }: Props) {
  const { id } = await params;
  const item = await prisma.slider.findUnique({
    where: { id },
    select: {
      id: true,
      title: true,
      image: true,
      subtitle: true,
      text: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!item) return notFound();

  return (
    <div className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Slider Details</h1>
        </div>
        <div className="flex gap-2">
          <Link
            href={`/dashboard/sliders/${item.id}/edit`}
            className="rounded-lg border px-3 py-1.5 text-sm hover:bg-slate-50"
          >
            Edit
          </Link>
          <Link
            href="/dashboard/admin/sliders"
            className="rounded-lg border px-3 py-1.5 text-sm hover:bg-slate-50"
          >
            ← Back
          </Link>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-[1fr,18rem]">
        {/* Main content */}
        <div className="rounded-2xl border bg-white p-5">
          <div className="flex items-center justify-between text-sm text-slate-500">
            <span>
              {item.createdAt.toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span>
              Updated{" "}
              {item.updatedAt.toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>

          {item.image && (
            <div className="mt-4 relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-slate-100">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
              />
            </div>
          )}

          <h2 className="mt-6 text-2xl font-bold">{item.title}</h2>

          {item.subtitle && (
            <p className="mt-3 text-slate-700">{item.subtitle}</p>
          )}

          <div className="prose prose-slate mt-6 max-w-none whitespace-pre-wrap">
            {item.text || (
              <p className="text-slate-500">No additional details provided.</p>
            )}
          </div>
        </div>

        {/* Meta / quick info */}
        <aside className="space-y-4">
          <div className="rounded-2xl border bg-white p-4">
            <div className="text-sm font-semibold">Info</div>
            <dl className="mt-3 space-y-2 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-slate-500">Created</dt>
                <dd>{item.createdAt.toLocaleDateString()}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-slate-500">Updated</dt>
                <dd>{item.updatedAt.toLocaleDateString()}</dd>
              </div>
            </dl>
          </div>
        </aside>
      </div>
    </div>
  );
}
