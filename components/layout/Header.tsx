"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { href: "/learn", label: "学習" },
    { href: "/company", label: "企業分析" },
    { href: "/calculator", label: "計算ツール" },
    { href: "/quiz", label: "クイズ" },
  ];

  return (
    <header className="bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md">
      <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tight">
          企業財務分析
        </Link>

        {/* Desktop nav */}
        <nav className="hidden sm:flex gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:text-orange-100 transition-colors font-medium"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="sm:hidden p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="メニュー"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav className="sm:hidden border-t border-orange-400 px-4 py-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block py-2 hover:text-orange-100 transition-colors font-medium"
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
