import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { JsonLd } from '@/komponenty/JsonLd'
import { Markdown } from '@/komponenty/Markdown'
import { StrankaHero } from '@/komponenty/StrankaHero'
import soubory from '@/data/ke-stazeni.json'
import { casti, naHtml, nactiStranku, vsechnyStranky } from '@/lib/obsah'
import { faqJsonLd } from '@/lib/seo'

/** Stránky, které nemají vlastní rozvržení: text z obsah/prezentace beze změny. */
const VLASTNI = new Set(['/', '/ukazky', '/cenik'])
const stranky = () => vsechnyStranky().filter((s) => !VLASTNI.has(s.adresa) && /^\/[\w-]+$/.test(s.adresa))

export const dynamicParams = false
export const generateStaticParams = () => stranky().map((s) => ({ stranka: s.adresa.slice(1) }))

export async function generateMetadata({ params }: { params: Promise<{ stranka: string }> }): Promise<Metadata> {
  const { stranka } = await params
  const s = stranky().find((x) => x.adresa === `/${stranka}`)
  return s ? { title: s.title, description: s.description, alternates: { canonical: s.adresa } } : {}
}

/** Rozdělení úvodu na nadpis h1 a čistý perex */
function rozeberUvod(uvodText: string) {
  const radky = uvodText.trim().split('\n')
  const nadpis = radky.find((r) => r.startsWith('# '))?.replace(/^#\s+/, '') ?? 'CodeKom'
  const zbytek = radky.filter((r) => !r.startsWith('# ')).join('\n').trim()
  return { nadpis, zbytek }
}

/** Stránka ke stažení dokumentů */
function KeStazeni({ soubor }: { soubor: string }) {
  const s = nactiStranku(soubor)
  const { uvod, casti: c } = casti(s.telo)
  const { nadpis, zbytek } = rozeberUvod(uvod)
  const dokumenty = c.find((x) => x.nadpis === 'Dokumenty')
  const popisy = (dokumenty?.telo ?? '').split('\n').filter((r) => r.startsWith('- '))
  const ostatni = c.filter((x) => x !== dokumenty)
  const faq = nactiStranku('faq').telo.replace(/^# /m, '## ')

  return (
    <div className="pb-24">
      <StrankaHero
        slovoPozadi="KE STAŽENÍ"
        rubrika="Podklady pro radu a zastupitelstvo"
        nadpis={
          <>
            {nadpis} <span className="text-gradient">pro obec</span>
          </>
        }
        popis={zbytek}
        odznaky={[
          'Vzorová smlouva a VOP',
          'Smlouva o zpracování GDPR',
          'Vzor usnesení zastupitelstva',
          'Časté otázky a odpovědi',
        ]}
      />

      <section aria-labelledby="dokumenty" className="mt-14">
        <div className="max-w-[42em]">
          <p className="rubrika">Oficiální dokumenty</p>
          <h2 id="dokumenty" className="mt-1 text-[28px] md:text-[38px]">
            Dokumenty ke stažení
          </h2>
          <p className="mt-2 text-[16px] text-sediva">
            Materiály v otevřeném formátu PDF připravené pro jednání rady obce nebo zastupitelstva.
          </p>
        </div>

        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {soubory.map((f, i) => {
            const popis = (popisy[i] ?? '').replace(/^- \*\*[^*]+\*\*\s*/, '')
            return (
              <li
                key={f.soubor}
                className="sklo-svetle flex flex-col justify-between rounded-3xl p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
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

      <section id="caste-otazky" aria-label="Časté otázky" className="sklo-svetle mt-16 rounded-3xl p-8 md:p-12 shadow-xl">
        <div className="prosa max-w-none">
          <Markdown html={naHtml(faq)} />
        </div>
      </section>
      <JsonLd data={faqJsonLd([s.telo, faq])} />
    </div>
  )
}

/** Vizuální rozvržení pro obecnou podstránku */
function ObecnaStranka({ s }: { s: { soubor: string; telo: string; title: string } }) {
  const { uvod, casti: c } = casti(s.telo)
  const { nadpis, zbytek } = rozeberUvod(uvod)

  return (
    <div className="pb-24">
      <StrankaHero
        slovoPozadi={s.soubor.toUpperCase().replace(/-/g, ' ')}
        rubrika="CodeKom pro obce"
        nadpis={
          <>
            {nadpis}
          </>
        }
        popis={zbytek}
      />

      <div className="mt-12 space-y-10">
        {c.map((sekce) => (
          <section
            key={sekce.nadpis}
            className="sklo-svetle rounded-3xl p-8 md:p-12 shadow-xl transition-all duration-200"
          >
            <div className="prosa max-w-none">
              <Markdown html={naHtml(`## ${sekce.nadpis}\n${sekce.telo}`)} />
            </div>
          </section>
        ))}
      </div>
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
