"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Megaphone,
  CalendarDays,
  Users,
  Sliders,
} from "lucide-react";

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
  default: [{ href: "/dashboard", label: "Overview", Icon: LayoutDashboard }],
};

// segment-boundary aware startsWith
function matchesBoundary(pathname: string, href: string) {
  if (pathname === href) return true;
  if (!pathname.startsWith(href)) return false;
  const next = pathname.charAt(href.length);
  return next === "" || next === "/" || next === "?";
}

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
  const navItems =
    NAV_BY_ROLE[role?.toLowerCase?.() as keyof typeof NAV_BY_ROLE] ??
    NAV_BY_ROLE.default;

  // Pick the most specific (longest) matching href
  const bestMatchHref =
    navItems
      .filter((item) => matchesBoundary(pathname, item.href))
      .sort((a, b) => b.href.length - a.href.length)[0]?.href ?? null;

  return (
    <nav className={variant === "mobile" ? "space-y-1" : "sticky top-20 space-y-1"}>
      {navItems.map(({ href, label, Icon }) => {
        const active = bestMatchHref === href;

        return (
          <Link
            key={href}
            href={href}
            onClick={onNavigate}
            aria-current={active ? "page" : undefined}
            className={[
              "relative group flex items-center gap-3 rounded-xl",
              variant === "mobile" ? "px-3 py-3" : "px-3 py-2",
              "text-sm transition",
              active
                ? "bg-amber-50 text-amber-900 ring-1 ring-amber-200 shadow-[inset_0_0_0_1px_rgba(245,158,11,0.15)]"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50",
            ].join(" ")}
          >
            {active && (
              <span className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-r bg-amber-500" />
            )}

            <span
              className={[
                "grid place-items-center h-7 w-7 rounded-lg transition",
                active
                  ? "bg-amber-100 ring-1 ring-amber-200"
                  : "bg-slate-100 ring-1 ring-transparent group-hover:ring-slate-200",
              ].join(" ")}
            >
              <Icon
                className={[
                  "h-4 w-4 transition",
                  active ? "text-amber-700" : "text-slate-500 group-hover:text-slate-700",
                ].join(" ")}
                strokeWidth={active ? 2.5 : 2}
              />
            </span>

            <span className={active ? "font-medium" : "font-normal"}>{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
