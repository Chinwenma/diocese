import prisma from "@/lib/prisma";
import { Link } from "lucide-react";
export default async function DashboardHome() {
  const [homilyCount] = await Promise.all([
    prisma.homily.count().catch(() => 0),
  ]);

  return (
    <div className="p-6 ">
      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <CardStat label="Homilies" value={homilyCount} />
      </div>
    </div>
  );
}

function CardStat({ label, value }: { label: string; value: number }) {
  return (
    <Link href={`/dashboard/bishop/homilies`}>
      <div className="rounded-md  bg-orange-100 p-5 shadow-md">
        <div className="text-sm text-slate-500">{label}</div>
        <div className="mt-2 text-3xl font-bold tracking-tight">{value}</div>
      </div>
    </Link>
  );
}
