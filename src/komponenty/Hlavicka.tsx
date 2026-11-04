'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Logo } from './Logo'

export const NAVIGACE = [
  { href: '/ukazky', text: 'Šablony' },
  { href: '/urovne', text: 'Úrovně' },
  { href: '/cenik', text: 'Ceník' },
  { href: '/co-umime', text: 'Co umíme' },
  { href: '/pro-koho', text: 'Pro koho' },
  { href: '/prechod', text: 'Přechod' },
]

/**
 * Tmavé skleněné záhlaví s aktivním stavem a rozmazáním pozadí.
 * Na telefonu rozbalovací nabídka v `<details>` fungující i bez JavaScriptu.
 */
export function Hlavicka() {
  const pathname = usePathname()

  const jeAktivni = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname === href || pathname.startsWith(`${href}/`)
  }

  return (
    <header className="na-tmave sticky top-0 z-40 border-b border-white/10 bg-[#07080c]/94 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
      <a
        href="#obsah"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-xl focus:bg-white focus:px-4 focus:py-3 focus:font-semibold focus:text-noc focus:shadow-2xl focus:outline-3 focus:outline-akcent-tmavy"
      >
        Přeskočit na obsah
      </a>
      <div className="obal flex min-h-[72px] items-center justify-between gap-6">
        <Link href="/" className="inline-flex min-h-11 items-center transition-opacity hover:opacity-90" aria-label="CodeKom, úvodní stránka">
          <Logo bile />
        </Link>
        <nav aria-label="Hlavní" className="hidden lg:block">
          <ul className="flex items-center gap-1 rounded-full border border-white/15 bg-white/[0.05] p-1.5 shadow-inner backdrop-blur-md">
            {NAVIGACE.map((n) => {
              const akt = jeAktivni(n.href)
              return (
                <li key={n.href}>
                  <Link
                    href={n.href}
                    aria-current={akt ? 'page' : undefined}
                    className={`inline-flex min-h-11 items-center rounded-full px-4 text-[15px] font-medium no-underline transition-all duration-200 ${
                      akt
                        ? 'border border-white/20 bg-white/15 font-semibold text-white shadow-xs'
                        : 'text-white/80 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {n.text}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
        <Link href="/kontakt" className="tlacitko !min-h-11 max-lg:!hidden">
          Napište nám
        </Link>
        <details className="relative lg:hidden">
          <summary className="flex min-h-11 cursor-pointer list-none items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 font-medium text-white transition-colors hover:bg-white/10 select-none [&::-webkit-details-marker]:hidden">
            <svg width="18" height="14" viewBox="0 0 18 14" fill="none" aria-hidden="true" className="stroke-white">
              <path d="M1 1h16M1 7h16M1 13h16" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <span>Menu</span>
          </summary>
          <nav aria-label="Hlavní" className="absolute right-0 top-14 w-68 rounded-2xl border border-white/15 bg-[#0c0e14]/98 p-3 shadow-2xl shadow-black/80 backdrop-blur-2xl z-50">
            <ul className="flex flex-col gap-1">
              {NAVIGACE.map((n) => {
                const akt = jeAktivni(n.href)
                return (
                  <li key={n.href}>
                    <Link
                      href={n.href}
                      aria-current={akt ? 'page' : undefined}
                      className={`flex min-h-11 items-center rounded-xl px-3.5 text-[15px] no-underline transition-colors ${
                        akt
                          ? 'border border-white/15 bg-white/15 font-semibold text-white'
                          : 'text-white/85 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      {n.text}
                    </Link>
                  </li>
                )
              })}
              <li className="mt-2 border-t border-white/10 pt-2">
                <Link href="/kontakt" className="tlacitko w-full">
                  Napište nám
                </Link>
              </li>
            </ul>
          </nav>
        </details>
      </div>
    </header>
  )
}
