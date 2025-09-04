import prisma from "@/lib/prisma";
import Link from "next/link";
export default async function DashboardHome() {
  const [annCount, evtCount, blogCount, clergyCount, sliders] = await Promise.all([
    prisma.announcement.count(),
    prisma.event.count().catch(() => 0),
    prisma.blog.count().catch(() => 0),
    prisma.clergy.count().catch(() => 0),
    prisma.slider.count().catch(() => 0),
  ]);

  return (
    <div className="p-6 ">
      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <CardStat label="Announcements" value={annCount} href='/dashboard/admin/announcements' />
        <CardStat label="Events" value={evtCount} href='/dashboard/admin/events' />
        <CardStat label="Blogs" value={blogCount} href='/dashboard/admin/blog' />
        <CardStat label="Clergy" value={clergyCount} href='/dashboard/admin/clergy' />
        <CardStat label="Sliders" value={sliders} href='/dashboard/admin/sliders' />
      </div>
    </div>
  );
}

function CardStat({ label, value, href }: { label: string; value: number, href: string }) {
  return (
    <Link href={href}>
    <div className="rounded-md  bg-orange-100 p-5 shadow-md">
      <div className="text-sm text-slate-500">{label}</div>
      <div className="mt-2 text-3xl font-bold tracking-tight">{value}</div>
    </div>
    </Link>
  );
}
