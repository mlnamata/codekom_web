import type { Metadata } from 'next'
import Link from 'next/link'
import type { ReactNode } from 'react'
import { notFound } from 'next/navigation'
import { JsonLd } from '@/komponenty/JsonLd'
import { Markdown } from '@/komponenty/Markdown'
import { PortalObceDashboard } from '@/komponenty/PortalObceDashboard'
import { StrankaHero } from '@/komponenty/StrankaHero'
import { VyzvaSekce } from '@/komponenty/VyzvaSekce'
import soubory from '@/data/ke-stazeni.json'
import { casti, naHtml, nactiStranku, vsechnyStranky } from '@/lib/obsah'
import { faqJsonLd } from '@/lib/seo'

/** Stránky, které nemají vlastní rozvržení: text z obsah/prezentace beze změny. */
const VLASTNI = new Set(['/', '/ukazky', '/cenik', '/katalog'])
const stranky = () => vsechnyStranky().filter((s) => !VLASTNI.has(s.adresa) && /^\/[\w-]+$/.test(s.adresa))

export const dynamicParams = false
export const generateStaticParams = () => stranky().map((s) => ({ stranka: s.adresa.slice(1) }))

export async function generateMetadata({ params }: { params: Promise<{ stranka: string }> }): Promise<Metadata> {
  const { stranka } = await params
  const s = stranky().find((x) => x.adresa === `/${stranka}`)
  return s ? { title: s.title, description: s.description, alternates: { canonical: s.adresa } } : {}
}

/**
 * Rozdělení úvodu na nadpis h1, perex a doplněk. Perex je jen první odstavec prostého textu,
 * seznamy, HTML a další odstavce jdou do doplňku, který se vykreslí jako markdown pod úvodním pásem.
 */
function rozeberUvod(uvodText: string) {
  const radky = uvodText.trim().split('\n')
  const nadpis = radky.find((r) => r.startsWith('# '))?.replace(/^#\s+/, '') ?? 'CodeKom'
  const bloky = radky
    .filter((r) => !r.startsWith('# '))
    .join('\n')
    .split(/\n\s*\n/)
    .map((b) => b.trim())
    .filter(Boolean)
  const prvni = bloky[0] ?? ''
  const jeProstyText = prvni !== '' && !/^(- |\* |\d+\. |<|\||>)/.test(prvni)
  const zbytek = jeProstyText ? prvni : ''
  const doplnek = (jeProstyText ? bloky.slice(1) : bloky).join('\n\n')
  return { nadpis, zbytek, doplnek }
}

/** Doplněk úvodu (kontakty, seznamy, další odstavce) ve skleněné kartě pod úvodním pásem. */
function DoplnekUvodu({ md }: { md: string }) {
  if (!md) return null
  return (
    <section className="mt-12">
      <div className="sklo-svetle rounded-3xl p-7 md:p-10">
        <Markdown html={naHtml(md)} />
      </div>
    </section>
  )
}

/** Perex v úvodním pásu: markdown odkazy [text](/adresa) jako odkazy, zbytek jako text. */
function perex(text: string): ReactNode[] {
  return text.split(/(\[[^\]]+\]\([^)]+\))/g).map((kus, i) => {
    const m = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(kus)
    return m ? (
      <Link key={i} href={m[2]!} className="font-semibold text-white underline hover:no-underline">
        {m[1]}
      </Link>
    ) : (
      kus
    )
  })
}

/** Rozdělení těla sekce na uvod a podsekce podle ### */
function rozdelPodsekce(telo: string): { uvod: string; podsekce: { nadpis: string; telo: string }[] } {
  const kusy = telo.split(/^### /m)
  const uvod = (kusy.shift() ?? '').trim()
  return {
    uvod,
    podsekce: kusy.map((k) => {
      const i = k.indexOf('\n')
      return {
        nadpis: (i === -1 ? k : k.slice(0, i)).trim(),
        telo: (i === -1 ? '' : k.slice(i + 1)).trim(),
      }
    }),
  }
}

interface KonfiguracePodstranky {
  rubrika: string
  slovoPozadi: string
  odznaky: string[]
  tlacitka: { href: string; text: string; primarni?: boolean }[]
  metriky: [string, string][]
}

const KONFIGURACE_STRANEK: Record<string, KonfiguracePodstranky> = {
  'co-umime': {
    rubrika: 'Pět propojených modulů',
    slovoPozadi: 'FUNKCE',
    odznaky: ['Web a úřední deska', 'Aplikace pro občany', 'Digitální úřad', 'Chytré budovy', 'AI asistent'],
    tlacitka: [
      { href: '/ukazky', text: 'Prohlédnout 20 šablon', primarni: true },
      { href: '/cenik', text: 'Ceník modulů' },
    ],
    metriky: [
      ['5 modulů', 'v jednom systému'],
      ['Plný soulad', 'se zákony ČR i EU'],
      ['Export zdarma', 'vašich dat kdykoli'],
    ],
  },
  'pro-koho': {
    rubrika: 'Pro koho je CodeKom',
    slovoPozadi: 'PRO KOHO',
    odznaky: ['Obce do 500 obyvatel', 'Obce 500–2 000 obyvatel', 'Města všech velikostí', 'Školy, hasiči a spolky', 'Svazky obcí a MAS'],
    tlacitka: [
      { href: '/ukazky', text: 'Prohlédnout šablony', primarni: true },
      { href: '/cenik', text: 'Kalkulačka cen' },
    ],
    metriky: [
      ['Pro každou obec', 'bez omezení velikosti'],
      ['20 šablon', 've 3 variantách'],
      ['Smlouva férově', 'výpověď kdykoli'],
    ],
  },
  prechod: {
    rubrika: 'Přechod na CodeKom',
    slovoPozadi: 'PŘECHOD',
    odznaky: ['30 dní zkušební doba', 'Převod stávající desky', 'Kompletní zaškolení', 'Smlouva na dobu neurčitou'],
    tlacitka: [
      { href: '/kontakt', text: 'Nezávazně poptat přechod', primarni: true },
      { href: '/ke-stazeni', text: 'Podklady pro radu' },
    ],
    metriky: [
      ['30 dní', 'zkušební doba s vrácením'],
      ['Bez výpadku', 'úřední desky i e-mailů'],
      ['Převod dat', 'zajistíme za vás'],
    ],
  },
  kontakt: {
    rubrika: 'Rádi vám ukážeme cestu',
    slovoPozadi: 'KONTAKT',
    odznaky: ['Odpovídáme obratem', 'Nezávazná nabídka zdarma', 'Konzultace pro radu obce'],
    tlacitka: [
      { href: '/ke-stazeni', text: 'Podklady pro jednání rady', primarni: true },
      { href: '/cenik', text: 'Kalkulačka cen' },
    ],
    metriky: [
      ['Rychlá reakce', 'odpovídáme obratem'],
      ['Bez závazků', 'nabídka je nezávazná'],
      ['Český software', 'vyvíjený pro samosprávy'],
    ],
  },
  'o-nas': {
    rubrika: 'Kdo jsme a jak pracujeme',
    slovoPozadi: 'O NÁS',
    odznaky: ['Český vývoj', 'Data v EU a servery v ČR', 'Přístupnost WCAG 2.2 AA', 'Férové podmínky'],
    tlacitka: [
      { href: '/kontakt', text: 'Spojit se s námi', primarni: true },
      { href: '/co-umime', text: 'Co vše umíme' },
    ],
    metriky: [
      ['Český software', 'sídlo i servery v ČR/EU'],
      ['WCAG 2.2 AA', 'nejvyšší přístupnost'],
      ['Smlouva', 'na dobu neurčitou'],
    ],
  },
  dotace: {
    rubrika: 'Financování a dotační tituly',
    slovoPozadi: 'DOTACE',
    odznaky: ['Běžný rozpočet obce', 'IROP a digitalizace', 'Podpora mikroregionů', 'Podklady k žádosti'],
    tlacitka: [
      { href: '/kontakt', text: 'Konzultovat financování', primarni: true },
      { href: '/ke-stazeni', text: 'Vzor usnesení' },
    ],
    metriky: [
      ['Pod limitem', 'veřejných zakázek malého rozsahu'],
      ['Podklady', 'pro radu i dotační žádost'],
      ['Férové ceny', 'od 590 Kč měsíčně'],
    ],
  },
  'bezpecnost-a-pravo': {
    rubrika: 'Právní jistota a ochrana údajů',
    slovoPozadi: 'BEZPEČNOST',
    odznaky: ['Vyhláška č. 515/2020 Sb.', 'Zákon č. 99/2019 Sb.', 'GDPR v Evropské unii', 'Nezničitelná úřední deska'],
    tlacitka: [
      { href: '/ke-stazeni', text: 'Vzor smlouvy GDPR', primarni: true },
      { href: '/kontakt', text: 'Konzultace s námi' },
    ],
    metriky: [
      ['Servery v EU', 'databáze i zálohy v unii'],
      ['Verzování', 'žádný dokument nelze smazat'],
      ['Auditovatelnost', 'záznam každé změny'],
    ],
  },
  pristupnost: {
    rubrika: 'Přístupnost podle zákona',
    slovoPozadi: 'PŘÍSTUPNOST',
    odznaky: ['Zákon č. 99/2019 Sb.', 'Standard WCAG 2.2 AA', 'Kontrola před publikací', 'Testování čtečkami'],
    tlacitka: [{ href: '/kontakt', text: 'Kontaktovat nás', primarni: true }],
    metriky: [
      ['WCAG 2.2 AA', 'nad rámec zákona'],
      ['Bez bariér', 'pro všechny občany'],
      ['Kontrola', 'automatická v editoru'],
    ],
  },
  'zasady-osobnich-udaju': {
    rubrika: 'Ochrana soukromí',
    slovoPozadi: 'GDPR',
    odznaky: ['Nařízení GDPR', 'Zákon č. 110/2019 Sb.', 'Bez sledování občanů', 'Data v EU'],
    tlacitka: [{ href: '/kontakt', text: 'Kontaktovat nás', primarni: true }],
    metriky: [
      ['Data v EU', 'databáze i zálohy v unii'],
      ['Zabezpečení', 'šifrování přenosu i dat'],
      ['Transparentnost', 'žádné skryté sledování'],
    ],
  },
  cookies: {
    rubrika: 'Soubory cookies',
    slovoPozadi: 'COOKIES',
    odznaky: ['Zákon č. 127/2005 Sb.', 'Žádné cookies třetích stran', 'Žádné reklamní sledování', 'Čistý web'],
    tlacitka: [{ href: '/kontakt', text: 'Kontaktovat nás', primarni: true }],
    metriky: [
      ['0 cookies', 'třetích stran a reklamy'],
      ['Čistý web', 'bez otravných lišt'],
      ['Zákon č. 127', 'plný soulad'],
    ],
  },
}

/** Stránka ke stažení dokumentů */
function KeStazeni({ soubor }: { soubor: string }) {
  const s = nactiStranku(soubor)
  const { uvod, casti: c } = casti(s.telo)
  const { nadpis, zbytek, doplnek } = rozeberUvod(uvod)
  const dokumenty = c.find((x) => x.nadpis === 'Dokumenty')
  const popisy = (dokumenty?.telo ?? '').split('\n').filter((r) => r.startsWith('- '))
  const ostatni = c.filter((x) => x !== dokumenty)
  const faq = nactiStranku('faq').telo.replace(/^# /m, '## ')

  return (
    <div className="pb-16">
      <StrankaHero
        slovoPozadi="KE STAŽENÍ"
        rubrika="Podklady pro radu a zastupitelstvo"
        nadpis={
          <>
            {nadpis} <span className="text-gradient">pro obec i město</span>
          </>
        }
        popis={perex(zbytek)}
        odznaky={[
          'Vzorová smlouva a VOP',
          'Smlouva o zpracování GDPR',
          'Vzor usnesení zastupitelstva',
          'Časté otázky a odpovědi',
        ]}
        tlacitka={[
          { href: '#dokumenty', text: 'Přejít k dokumentům', primarni: true },
          { href: '#caste-otazky', text: 'Časté dotazy zastupitelů' },
        ]}
        metriky={[
          ['5 dokumentů', 'připravených ke stažení'],
          ['V otevřeném PDF', 'pro radu i zastupitelstvo'],
          ['Právní doložky', 'podle zákona o obcích'],
        ]}
      />
      <DoplnekUvodu md={doplnek} />

      <section id="dokumenty" aria-labelledby="dokumenty-nadpis" className="mt-14 scroll-mt-28">
        <div className="max-w-[42em]">
          <p className="rubrika">Oficiální dokumenty</p>
          <h2 id="dokumenty-nadpis" className="mt-1 text-[28px] md:text-[38px] font-bold">
            Dokumenty ke stažení
          </h2>
          <p className="mt-2 text-[16px] text-sediva">
            Materiály v otevřeném formátu PDF připravené pro jednání rady obce nebo zastupitelstva.
          </p>
        </div>

        <ul className="mt-8 grid gap-5 sm:grid-cols-2">
          {soubory.map((f, i) => {
            const popis = (popisy[i] ?? '').replace(/^- \*\*[^*]+\*\*\s*/, '')
            return (
              <li
                key={f.soubor}
                className="sklo-svetle flex min-w-0 flex-col justify-between rounded-3xl p-7 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="rounded-full bg-akcent-tmavy/10 px-3 py-1 text-[12px] font-bold text-akcent-tmavy">
                      PDF, {f.velikostKb} kB
                    </span>
                  </div>
                  <h3 className="mt-3 text-[19px] font-bold leading-snug">
                    <a href={`/ke-stazeni/${f.soubor}`} className="hover:text-akcent-tmavy no-underline" download>
                      {f.nazev}
                    </a>
                  </h3>
                  {popis ? (
                    <div
                      className="mt-2 text-[14px] leading-relaxed text-sediva"
                      dangerouslySetInnerHTML={{ __html: naHtml(popis).replace(/^<p>|<\/p>\s*$/g, '') }}
                    />
                  ) : null}
                </div>
                <div className="mt-6 pt-4 border-t border-linka/60">
                  <a
                    href={`/ke-stazeni/${f.soubor}`}
                    className="tlacitko-obrys w-full !min-h-11 text-center text-[14px]"
                    download
                  >
                    Stáhnout dokument (PDF)
                  </a>
                </div>
              </li>
            )
          })}
        </ul>
      </section>

      {ostatni.map((x) => (
        <section key={x.nadpis} className="sklo-svetle mt-14 rounded-3xl p-8 md:p-12 shadow-xl">
          <div className="prosa max-w-none">
            <Markdown html={naHtml(`## ${x.nadpis}\n${x.telo}`)} />
          </div>
        </section>
      ))}

      <section id="caste-otazky" aria-label="Časté otázky" className="sklo-svetle mt-16 rounded-3xl p-8 md:p-12 shadow-xl scroll-mt-28">
        <div className="prosa max-w-none">
          <Markdown html={naHtml(faq)} />
        </div>
      </section>
      <JsonLd data={faqJsonLd([s.telo, faq])} />

      <VyzvaSekce
        nadpis="Chcete nabídku na míru?"
        perex="Rádi vám připravíme vzorovou nabídku přímo pro vaši obec s uvedením přesné ceny a termínu zprovoznění."
      />
    </div>
  )
}

/** Vizuální rozvržení pro obecnou podstránku ve stylu landing page */
function ObecnaStranka({ s }: { s: { soubor: string; telo: string; title: string } }) {
  const { uvod, casti: c } = casti(s.telo)
  const { nadpis, zbytek, doplnek } = rozeberUvod(uvod)
  const cfg = KONFIGURACE_STRANEK[s.soubor]

  return (
    <div className="pb-16">
      <StrankaHero
        slovoPozadi={cfg?.slovoPozadi ?? s.soubor.toUpperCase().replace(/-/g, ' ')}
        rubrika={cfg?.rubrika ?? 'CodeKom pro samosprávy'}
        nadpis={
          <>
            {nadpis}
          </>
        }
        popis={perex(zbytek)}
        odznaky={cfg?.odznaky}
        tlacitka={cfg?.tlacitka}
        metriky={cfg?.metriky}
      />

      <DoplnekUvodu md={doplnek} />

      {s.soubor === 'co-umime' ? (
        <section aria-labelledby="navrh-portalu" className="mt-14">
          <div className="mb-6 max-w-[44em]">
            <p className="rubrika">Interaktivní návrh portálu obce</p>
            <h2 id="navrh-portalu" className="mt-1 text-[28px] md:text-[38px] font-bold">
              Jak může vypadat jednotný portál obce
            </h2>
            <p className="mt-2 text-[16px] text-sediva">
              Ukázka propojení elektronické úřední desky, portálu občana s přímými platbami, hlášení závad, IoT senzoriky a obecní půjčovny v jednom přehledném systému.
            </p>
          </div>
          <PortalObceDashboard />
        </section>
      ) : null}

      <div className="mt-12 space-y-12">
        {c.map((sekce) => {
          const { uvod: podUvod, podsekce } = rozdelPodsekce(sekce.telo)
          const maBentoKarty = podsekce.length > 0

          if (maBentoKarty) {
            return (
              <section key={sekce.nadpis} className="pt-2">
                <div className="max-w-[44em]">
                  <p className="rubrika">Přehled</p>
                  <h2 className="mt-1 text-[28px] md:text-[38px] font-bold">
                    {sekce.nadpis}
                  </h2>
                  {podUvod ? (
                    <div className="prosa mt-3 max-w-none text-[16px] text-sediva">
                      <Markdown html={naHtml(podUvod)} />
                    </div>
                  ) : null}
                </div>

                <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {podsekce.map((sub, idx) => (
                    <div
                      key={sub.nadpis}
                      className="sklo-svetle flex min-w-0 flex-col justify-between rounded-3xl p-7 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
                    >
                      <div>
                        <span className="text-[13px] font-bold uppercase tracking-wider text-akcent-tmavy">
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                        <h3 className="mt-2 text-[22px] font-bold tracking-tight">
                          {sub.nadpis}
                        </h3>
                        <div className="prosa mt-3 max-w-none text-[15px] leading-relaxed text-sediva">
                          <Markdown html={naHtml(sub.telo)} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )
          }

          return (
            <section
              key={sekce.nadpis}
              className="sklo-svetle rounded-3xl p-8 md:p-12 shadow-xl transition-all duration-200"
            >
              <div className="prosa max-w-none">
                <Markdown html={naHtml(`## ${sekce.nadpis}\n${sekce.telo}`)} />
              </div>
            </section>
          )
        })}
      </div>

      <VyzvaSekce />
    </div>
  )
}

export default async function Stranka({ params }: { params: Promise<{ stranka: string }> }) {
  const { stranka } = await params
  const s = stranky().find((x) => x.adresa === `/${stranka}`)
  if (!s) notFound()

  return (
    <div className="obal">
      {s.soubor === 'ke-stazeni' ? <KeStazeni soubor={s.soubor} /> : <ObecnaStranka s={s} />}
    </div>
  )
}
