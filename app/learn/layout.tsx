"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/learn", label: "概要" },
  { href: "/learn/pl", label: "PL" },
  { href: "/learn/bs", label: "BS" },
  { href: "/learn/cf", label: "CF" },
  { href: "/learn/connections", label: "三表のつながり" },
  { href: "/learn/reading-guide", label: "読み方ガイド" },
];

export default function LearnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <nav className="flex flex-wrap gap-2 mb-8">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                isActive
                  ? "bg-orange-500 text-white"
                  : "bg-orange-100 text-orange-700 hover:bg-orange-200"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
      {children}
    </div>
  );
}
