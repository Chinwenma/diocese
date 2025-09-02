"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Megaphone, CalendarDays, Users, Sliders } from "lucide-react";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const NAV_BY_ROLE: Record<string, Array<{ href: string; label: string; Icon: any }>> = {
  bishop: [
    { href: "/dashboard/bishop", label: "Overview", Icon: LayoutDashboard },
    { href: "/dashboard/bishop/homily", label: "Reflections", Icon: Megaphone },
  ],
  admin: [
    { href: "/dashboard/admin", label: "Overview", Icon: LayoutDashboard },
    { href: "/dashboard/admin/announcements", label: "Announcements", Icon: Megaphone },
    { href: "/dashboard/admin/events", label: "Events", Icon: CalendarDays },
    { href: "/dashboard/admin/clergy", label: "Clergy", Icon: Users },
    { href: "/dashboard/admin/blog", label: "News", Icon: Users },
    { href: "/dashboard/admin/sliders", label: "Sliders", Icon: Sliders },
  ],
  clergy: [
    { href: "/dashboard/clergy", label: "Overview", Icon: LayoutDashboard },
    { href: "/dashboard/clergy/homily", label: "Reflections", Icon: Megaphone },
    { href: "/dashboard/clergy/events", label: "Events", Icon: CalendarDays },
  ],
  // Add more roles as needed
  default: [
    { href: "/dashboard", label: "Overview", Icon: LayoutDashboard },
  ],
};

export default function Sidebar({
  variant = "desktop",
  onNavigate,
  role,
}: {
  variant?: "desktop" | "mobile";
  onNavigate?: () => void;
  role: string;
}) {
  const pathname = usePathname();
  // Select nav items based on role, fallback to default if role is not defined
  const navItems = NAV_BY_ROLE[role.toLowerCase()] || NAV_BY_ROLE.default;

  return (
    <nav className={variant === "mobile" ? "space-y-1" : "sticky top-20 space-y-1"}>
      {navItems.map(({ href, label, Icon }) => {
        const active = pathname === href || pathname.startsWith(href + "/");
        return (
          <Link
            key={href}
            href={href}
            onClick={onNavigate}
            className={[
              "group flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition",
              active
                ? "bg-amber-50 text-amber-900 ring-1 ring-amber-200"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50",
            ].join(" ")}
          >
            <Icon className={["h-4 w-4", active ? "text-amber-600" : "text-slate-400"].join(" ")} />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}