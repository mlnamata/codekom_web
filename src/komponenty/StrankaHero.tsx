import Link from 'next/link'
import type { ReactNode } from 'react'

export function StrankaHero({
  rubrika,
  nadpis,
  popis,
  slovoPozadi,
  tlacitka,
  odznaky,
}: {
  rubrika?: string
  nadpis: ReactNode
  popis?: ReactNode
  slovoPozadi?: string
  tlacitka?: { href: string; text: string; primarni?: boolean; ext?: boolean }[]
  odznaky?: string[]
}) {
  return (
    <div className="na-tmave zare relative isolate overflow-hidden rounded-[32px] border border-white/10 bg-noc px-6 py-12 shadow-2xl md:px-14 md:py-16 my-8">
      {slovoPozadi ? (
        <p className="slovo-pozadi right-4 top-4 text-right text-[120px] md:text-[200px]" aria-hidden="true">
          {slovoPozadi}
        </p>
      ) : null}
      <div className="relative z-10 max-w-[46em]">
        {rubrika ? <p className="rubrika">{rubrika}</p> : null}
        <h1 className="mt-4 text-[38px] font-extrabold tracking-tight md:text-[56px] lg:text-[62px]">
          {nadpis}
        </h1>
        {popis ? <p className="mt-5 text-[18px] text-white/90 md:text-[21px]">{popis}</p> : null}
        {odznaky && odznaky.length > 0 ? (
          <div className="mt-6 flex flex-wrap gap-2">
            {odznaky.map((o) => (
              <span key={o} className="sklo rounded-full px-3.5 py-1 text-[13px] font-medium text-white">
                {o}
              </span>
            ))}
          </div>
        ) : null}
        {tlacitka && tlacitka.length > 0 ? (
          <div className="mt-8 flex flex-wrap gap-3">
            {tlacitka.map((t) =>
              t.ext ? (
                <a
                  key={t.href}
                  href={t.href}
                  className={t.primarni ? 'tlacitko' : 'tlacitko-obrys'}
                  rel="noopener noreferrer"
                >
                  {t.text}
                </a>
              ) : (
                <Link
                  key={t.href}
                  href={t.href}
                  className={t.primarni ? 'tlacitko' : 'tlacitko-obrys'}
                >
                  {t.text}
                </Link>
              )
            )}
          </div>
        ) : null}
      </div>
    </div>
  )
}
