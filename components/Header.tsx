'use client';
import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const links = [
    { href: '/blog/', label: 'The lessons' },
    { href: '/about/', label: 'Meet your teacher' },
    { href: '/contact/', label: 'Get in touch' },
  ];
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link href="/" className="brand" aria-label="Gurus Classes of English home">
          <span className="brand-mark">
            g<span>.</span>
          </span>
          <span className="brand-name">
            Gurus Classes<span>OF ENGLISH</span>
          </span>
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
            Learn something new <span aria-hidden="true">↗</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
