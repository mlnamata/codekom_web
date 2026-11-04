import Image from 'next/image'
import Link from 'next/link'
import { Odhaleni } from '@/komponenty/Odhaleni'
import { OdznakAi } from '@/komponenty/OdznakAi'

export interface TlacitkoVyzvy {
  href: string
  text: string
  primarni?: boolean
  ext?: boolean
}

export function VyzvaSekce({
  nadpis = 'Napište nám',
  perex = 'Napište, jak se obec jmenuje a co se vám na dnešním webu nelíbí. Odpovíme a pošleme nabídku, kterou můžete předložit radě.',
  tlacitka = [
    { href: '/kontakt', text: 'Kontakt a nabídka', primarni: true },
    { href: '/ke-stazeni', text: 'Podklady pro radu' },
  ],
  foto = {
    src: '/foto/sablona-19-mikroregion.webp',
    alt: 'Široké údolí v podhůří Šumavy se čtyřmi vesničkami spojenými silničkami, podzim.',
  },
}: {
  nadpis?: string
  perex?: string
  tlacitka?: TlacitkoVyzvy[]
  foto?: { src: string; alt: string }
}) {
  return (
    <section aria-label="Výzva k akci" className="py-16 md:py-20">
      <div className="na-tmave relative isolate overflow-hidden rounded-[32px] px-6 py-14 md:px-14 md:py-20 shadow-2xl">
        <figure className="absolute inset-0 -z-10 m-0">
          <Image
            src={foto.src}
            alt={foto.alt}
            fill
            sizes="(min-width: 1080px) 1080px, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[rgba(7,8,12,0.76)] backdrop-blur-[2px]" aria-hidden="true" />
          <figcaption className="absolute bottom-4 right-4 z-10 m-0">
            <OdznakAi />
          </figcaption>
        </figure>

        <Odhaleni className="sklo max-w-[620px] rounded-3xl p-8 md:p-10 shadow-2xl border border-white/15">
          <p className="rubrika">Spojte se s námi</p>
          <h2 className="mt-3 text-[34px] font-bold tracking-tight md:text-[46px] text-white">
            {nadpis}
          </h2>
          <p className="mt-4 text-[17px] leading-relaxed text-white/85">
            {perex}
          </p>
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
        </Odhaleni>
      </div>
    </section>
  )
}
