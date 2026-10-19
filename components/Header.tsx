'use client';
import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const links = [
    { href: '/blog/', label: 'Lessons' },
    { href: '/about/', label: 'Meet your teacher' },
    { href: '/contact/', label: 'Say hello' },
  ];
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link href="/" className="brand" aria-label="Gurus Classes of English home">
          <img className="brand-logo" src="/logo.jpeg" alt="" width="231" height="219" />
          <span className="brand-wordmark">Gurus Classes<span>of English</span></span>
        </Link>
        <button
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="main-nav"
          onClick={() => setOpen(!open)}
        >
          {open ? 'Close ✕' : 'Menu ☰'}
        </button>
        <nav
          id="main-nav"
          className={open ? 'main-nav is-open' : 'main-nav'}
          aria-label="Main navigation"
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={pathname === link.href ? 'page' : undefined}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link className="button button-small" href="/blog/" onClick={() => setOpen(false)}>
            Let’s learn <span aria-hidden="true">→</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
