import type { Metadata } from 'next'
import Link from 'next/link'
import { StrankaHero } from '@/komponenty/StrankaHero'
import { VyzvaSekce } from '@/komponenty/VyzvaSekce'
import {
  CENA_BUDOVY,
  DOPLNIT_CENU_ZARIZENI,
  HODINOVKA_EXPERTA,
  SOUCASTKY_CHYTRA_OBEC,
  STITEK_CENY,
  TEXT_BEZ_INTERNETU,
  kc,
  type BezInternetu,
  type SoucastkaKatalogu,
} from '@/lib/cenik'
import { nactiStranku } from '@/lib/obsah'

const stranka = nactiStranku('katalog')

export const metadata: Metadata = {
  title: stranka.title,
  description: stranka.description,
  alternates: { canonical: '/katalog' },
}

const BARVA_INTERNETU: Record<BezInternetu, string> = {
  ano: 'bg-[#e3f4ee] text-[#0b5a43]',
  ne: 'bg-[#fdeaea] text-[#8a1c1c]',
  overit: 'bg-[#fff3d6] text-[#6b4a00]',
}

/** Skupiny katalogu v pořadí, v jakém se kategorie poprvé objeví. */
function skupiny(): { nazev: string; zarizeni: SoucastkaKatalogu[] }[] {
  const mapa = new Map<string, SoucastkaKatalogu[]>()
  for (const z of SOUCASTKY_CHYTRA_OBEC) mapa.set(z.kategorie, [...(mapa.get(z.kategorie) ?? []), z])
  return [...mapa].map(([nazev, zarizeni]) => ({ nazev, zarizeni }))
}

const kotva = (t: string) =>
  t
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

export default function Katalog() {
  const KATALOG = skupiny()
  const pocet = SOUCASTKY_CHYTRA_OBEC.length
  return (
    <div className="obal pb-24">
      <StrankaHero
        slovoPozadi="KATALOG"
        rubrika="Modul Chytré budovy"
        nadpis={
          <>
            Katalog <span className="text-gradient">zařízení</span>
          </>
        }
        popis="Zařízení, se kterými počítá modul Chytré budovy. Brána v budově řídí topení a čidla i bez internetu. U zámků to záleží na zařízení, v katalogu je u každého uvedeno, zda funguje bez internetu. Zámek jde vždy otevřít mechanickým klíčem a ochrana proti mrazu nezávisí na cloudu."
        odznaky={KATALOG.map((k) => k.nazev)}
        tlacitka={[
          { href: '/cenik', text: 'Ceník', primarni: true },
          { href: '/kontakt', text: 'Prohlídka budovy a nabídka' },
        ]}
        metriky={[
          [String(pocet), 'zařízení v katalogu'],
          [`od ${kc(CENA_BUDOVY)}`, 'měsíčně za budovu bez DPH'],
          [kc(HODINOVKA_EXPERTA), 'hodina montáže bez DPH'],
        ]}
      />

      <p className="mt-10 max-w-[44em] text-[17px] text-sediva">
        Zařízení se platí jednorázově podle prohlídky budovy, montáž hodinovou sazbou experta {kc(HODINOVKA_EXPERTA)} bez DPH. Ceny jsou orientační ceny „od“ bez DPH. Měsíční poplatek modulu je v{' '}
        <Link href="/cenik" className="odkaz font-semibold text-akcent-tmavy">
          ceníku
        </Link>
        .
      </p>

      {KATALOG.map((skupina) => (
        <section key={skupina.nazev} id={kotva(skupina.nazev)} aria-labelledby={`k-${kotva(skupina.nazev)}`} className="mt-16 scroll-mt-28">
          <h2 id={`k-${kotva(skupina.nazev)}`} className="text-[30px] md:text-[40px]">
            {skupina.nazev}
          </h2>
          <ul className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {skupina.zarizeni.map((z) => (
              <li key={z.klic} className="sklo-svetle flex flex-col rounded-3xl p-7 transition-transform duration-200 hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:translate-y-0">
                <h3 className="text-[21px] font-bold leading-snug">{z.nazev}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-text">{z.popis}</p>
                <p className="mt-2 text-[15px] leading-relaxed text-sediva">{z.prinos}</p>
                <dl className="mt-5 grid gap-3 border-t border-linka pt-4 text-[15px]">
                  {z.standard ? (
                    <div>
                      <dt className="text-[13px] font-semibold text-sediva">Standard</dt>
                      <dd className="font-medium">{z.standard}</dd>
                    </div>
                  ) : null}
                  {z.bezInternetu ? (
                    <div>
                      <dt className="text-[13px] font-semibold text-sediva">Funguje bez internetu</dt>
                      <dd>
                        <span className={`mt-1 inline-block rounded-full px-3 py-1 text-[14px] font-semibold ${BARVA_INTERNETU[z.bezInternetu]}`}>
                          {TEXT_BEZ_INTERNETU[z.bezInternetu]}
                        </span>
                      </dd>
                    </div>
                  ) : null}
                  <div>
                    <dt className="text-[13px] font-semibold text-sediva">Cena</dt>
                    <dd className={z.cenaOd !== undefined ? 'text-[19px] font-bold text-noc' : ''}>
                      {z.cenaOd !== undefined ? `od ${kc(z.cenaOd)} / ${z.jednotka} bez DPH` : DOPLNIT_CENU_ZARIZENI}
                    </dd>
                  </div>
                </dl>
                {z.poznamka ? <p className="mt-4 text-[14px] text-sediva">{z.poznamka}</p> : null}
              </li>
            ))}
          </ul>
        </section>
      ))}
      <p className="stitek mt-8">{STITEK_CENY}</p>

      <VyzvaSekce
        nadpis="Prohlídka budovy"
        perex="Napište, o které budovy jde: sál, škola, hasičárna nebo úřad. Po prohlídce pošleme nabídku zařízení a montáže."
        tlacitka={[
          { href: '/kontakt', text: 'Kontakt a nabídka', primarni: true },
          { href: '/cenik', text: 'Ceník' },
        ]}
      />
    </div>
  )
}
