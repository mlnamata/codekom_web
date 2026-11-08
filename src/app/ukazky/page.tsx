import type { Metadata } from 'next'
import Link from 'next/link'
import { Karusel } from '@/komponenty/Karusel'
import { Markdown } from '@/komponenty/Markdown'
import { Snimek } from '@/komponenty/Snimek'
import { StrankaHero } from '@/komponenty/StrankaHero'
import { VyzvaSekce } from '@/komponenty/VyzvaSekce'
import { casti, naHtml, nactiStranku } from '@/lib/obsah'
import { sablonyGalerie } from '@/lib/sablony'

const stranka = nactiStranku('ukazky')

export const metadata: Metadata = {
  title: stranka.title,
  description: stranka.description,
  alternates: { canonical: '/ukazky' },
}

export default function Ukazky() {
  const { casti: c } = casti(stranka.telo)
  const vyber = c.find((x) => x.nadpis === 'Jak šablonu vybrat')
  const sablony = sablonyGalerie()

  return (
    <div className="obal pb-24">
      <StrankaHero
        slovoPozadi="ŠABLONY"
        rubrika="23 šablon, 69 barevných variant"
        nadpis={
          <>
            Šablony webů <span className="text-gradient">pro vaši obec</span>
          </>
        }
        popis="Úvodní stránky všech 23 šablon na smyšlené obci Javoří Lhota se 684 obyvateli. Obsah je ve všech stejný, liší se rozvržení, typografie a atmosféra. Všechny šablony mají elektronickou úřední desku, hlášení do mobilu a plní zákon o přístupnosti."
        odznaky={[
          'Každá ve 3 barevných paletách',
          'Navrženo pro telefon i počítač',
          'Přístupnost podle WCAG 2.2 AA',
          'Pevná místa, která nelze rozbít',
        ]}
        tlacitka={[
          { href: '#galerie', text: 'Prohlédnout všech 23 šablon', primarni: true },
          { href: '/cenik', text: 'Ceník a kalkulačka' },
        ]}
        metriky={[
          ['23 šablon', 'v 69 variantách'],
          ['Plná přístupnost', 'podle WCAG 2.2 AA'],
          ['Telefon i PC', 'responzivní zobrazení'],
        ]}
      />

      {/* Rychlé listování karuselem */}
      <div className="mt-14">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <div>
            <p className="rubrika">Rychlé listování</p>
            <h2 className="mt-1 text-[28px] md:text-[38px]">
              Karusel šablon
            </h2>
          </div>
          <p className="text-[15px] text-sediva">
            Listujte tlačítky Předchozí a Další, posunutím prstem nebo šipkami na klávesnici.
          </p>
        </div>

        <div className="mt-8">
          <Karusel popis="Karusel šablon" popisPasu="Seznam 23 šablon">
            {sablony.map((s, i) => (
              <li
                key={s.klic}
                className="w-[85%] shrink-0 snap-start sm:w-[calc(50%-12px)] lg:w-[calc((100%-48px)/3)]"
              >
                <Link
                  href={`/ukazky/${s.klic}`}
                  className="sklo-svetle group block rounded-3xl p-3 no-underline transition-all duration-200 hover:-translate-y-1.5 hover:shadow-xl"
                >
                  <Snimek
                    src={s.palety[0]!.snimek}
                    alt={`Úvodní stránka šablony ${s.nazev} pro obec Javoří Lhota, paleta ${s.palety[0]!.nazev}.`}
                    priorita={i < 3}
                    sizes="(min-width: 1120px) 360px, (min-width: 640px) 50vw, 100vw"
                  />
                  <span className="block px-3 pb-3 pt-4">
                    <span className="flex items-center justify-between">
                      <span className="text-[13px] font-bold uppercase tracking-wider text-akcent-tmavy">
                        Šablona {s.cislo}
                      </span>
                      <span className="flex gap-1" aria-hidden="true">
                        {s.palety.map((p) => (
                          <span
                            key={p.index}
                            className="size-3.5 rounded-full border border-linka"
                            style={{ background: p.barvy[3]!.hodnota }}
                          />
                        ))}
                      </span>
                    </span>
                    <span
                      className="mt-1 block text-[22px] font-bold tracking-tight text-noc group-hover:text-akcent-tmavy transition-colors"
                      style={{ fontFamily: 'var(--font-nadpis)' }}
                    >
                      {s.nazev}
                    </span>
                    <span className="mt-1 block text-[14px] text-sediva">{s.proKoho}</span>
                  </span>
                </Link>
              </li>
            ))}
          </Karusel>
        </div>
      </div>

      {/* Kompletní přehledová mřížka všech 23 šablon */}
      <section id="galerie" aria-labelledby="vsech-20" className="mt-20">
        <div className="max-w-[42em]">
          <p className="rubrika">Kompletní nabídka</p>
          <h2 id="vsech-20" className="mt-1 text-[28px] md:text-[38px]">
            Všech 23 šablon na jednom místě
          </h2>
          <p className="mt-2 text-[16px] text-sediva">
            Klikněte na kteroukoli šablonu pro zobrazení všech 3 barevných variant, náhledu na mobilním telefonu a detailního popisu.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sablony.map((s) => (
            <div key={s.klic}>
              <Link
                href={`/ukazky/${s.klic}`}
                className="sklo-svetle group flex h-full flex-col justify-between rounded-3xl p-3 no-underline transition-all duration-200 hover:-translate-y-1.5 hover:shadow-xl"
              >
                <div>
                  <Snimek
                    src={s.palety[0]!.snimek}
                    alt={`Úvodní stránka šablony ${s.nazev} pro obec Javoří Lhota, paleta ${s.palety[0]!.nazev}.`}
                    sizes="(min-width: 1120px) 360px, (min-width: 640px) 50vw, 100vw"
                  />
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[13px] font-bold text-akcent-tmavy">
                        Šablona {s.cislo}
                      </span>
                      <span className="flex gap-1.5" aria-hidden="true">
                        {s.palety.map((p) => (
                          <span
                            key={p.index}
                            className="size-3.5 rounded-full border border-linka"
                            style={{ background: p.barvy[3]!.hodnota }}
                          />
                        ))}
                      </span>
                    </div>
                    <h3
                      className="mt-1 text-[22px] font-bold text-noc group-hover:text-akcent-tmavy transition-colors"
                      style={{ fontFamily: 'var(--font-nadpis)' }}
                    >
                      {s.nazev}
                    </h3>
                    <p className="mt-1 text-[14px] text-sediva">{s.proKoho}</p>
                  </div>
                </div>
                <div className="border-t border-linka/70 px-4 py-3 text-[14px] font-semibold text-akcent-tmavy flex items-center justify-between">
                  <span>Prozkoumat šablonu</span>
                  <span aria-hidden="true">&rsaquo;</span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Jak šablonu vybrat */}
      {vyber ? (
        <section aria-labelledby="jak-vybrat" className="mt-24">
          <div className="na-tmave zare relative isolate overflow-hidden rounded-[32px] bg-noc px-6 py-14 md:px-14 md:py-16">
            <p className="rubrika">Doporučení pro starosty</p>
            <h2 id="jak-vybrat" className="mt-2 text-[32px] md:text-[44px]">
              Jak šablonu správně vybrat
            </h2>
            <div className="mt-8 max-w-[48em] text-white/85">
              <Markdown html={naHtml(vyber.telo)} />
            </div>
            <div className="mt-10 flex flex-wrap gap-4 border-t border-white/10 pt-6">
              <Link href="/urovne" className="tlacitko">
                Zvolit úroveň editoru
              </Link>
              <Link href="/kontakt" className="tlacitko-obrys">
                Pomůžeme vám s výběrem
              </Link>
            </div>
          </div>
        </section>
      ) : null}

      <VyzvaSekce
        nadpis="Vybrali jste si šablonu?"
        perex="Napište nám, která šablona se vám líbí. Připravíme ukázku přímo s vaším znakem a obsahem."
      />
    </div>
  )
}
