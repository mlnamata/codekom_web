import Image from 'next/image'
import Link from 'next/link'
import type { ReactNode } from 'react'

/**
 * Úvodní pás podstránky ve stejném stylu jako úvodní stránka: celošířková fotka
 * s tmavým přechodem, velký nadpis, skleněné odznaky a metriky.
 */
export function StrankaHero({
  rubrika,
  nadpis,
  popis,
  slovoPozadi,
  tlacitka,
  odznaky,
  metriky,
}: {
  rubrika?: string
  nadpis: ReactNode
  popis?: ReactNode
  slovoPozadi?: string
  tlacitka?: { href: string; text: string; primarni?: boolean; ext?: boolean }[]
  odznaky?: string[]
  metriky?: [string, string][]
}) {
  return (
    <section className="na-tmave zare relative left-[50%] right-[50%] isolate -ml-[50vw] -mr-[50vw] w-screen overflow-hidden bg-noc">
      <figure className="absolute inset-0 -z-10 m-0" aria-hidden="true">
        <Image src="/fotky/uvod-cesta.webp" alt="" fill sizes="100vw" className="object-cover object-[60%_50%]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,8,12,0.94)_0%,rgba(7,8,12,0.72)_50%,rgba(7,8,12,0.35)_100%)]" />
      </figure>
      {slovoPozadi ? (
        <p className="slovo-pozadi right-4 top-4 text-right text-[120px] md:text-[200px]" aria-hidden="true">
          {slovoPozadi}
        </p>
      ) : null}
      <div className="obal relative z-10 py-20 md:py-28">
        {rubrika ? <p className="rubrika">{rubrika}</p> : null}
        <h1 className="mt-5 max-w-[18ch] text-[44px] font-extrabold md:text-[72px] lg:text-[84px]">{nadpis}</h1>
        {popis ? <p className="mt-6 max-w-[36em] text-[19px] text-white/85 md:text-[21px]">{popis}</p> : null}
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
          <div className="mt-10 flex flex-wrap gap-3">
            {tlacitka.map((t) =>
              t.ext ? (
                <a key={t.href} href={t.href} className={t.primarni ? 'tlacitko w-full sm:w-auto' : 'tlacitko-obrys w-full sm:w-auto'} rel="noopener noreferrer">
                  {t.text}
                </a>
              ) : (
                <Link key={t.href} href={t.href} className={t.primarni ? 'tlacitko w-full sm:w-auto' : 'tlacitko-obrys w-full sm:w-auto'}>
                  {t.text}
                </Link>
              ),
            )}
          </div>
        ) : null}
        {metriky && metriky.length > 0 ? (
          <div className="mt-14 grid max-w-[880px] gap-3 sm:grid-cols-3">
            {metriky.map(([velke, male]) => (
              <div key={velke} className="sklo rounded-2xl px-5 py-4">
                <p className="text-[24px] font-bold tracking-tight">{velke}</p>
                <p className="text-[15px] text-white/75">{male}</p>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  )
}
