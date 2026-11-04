import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { StrankaHero } from '@/komponenty/StrankaHero'
import { STITEK_CENY, VELIKOSTI, kc } from '@/lib/cenik'
import { odkazAdministrace } from '@/lib/demo'
import { MATICE, UROVNE } from '@/lib/urovne'

export const dynamicParams = false
export const generateStaticParams = () => UROVNE.map((u) => ({ uroven: u.klic }))

export async function generateMetadata({ params }: { params: Promise<{ uroven: string }> }): Promise<Metadata> {
  const { uroven } = await params
  const u = UROVNE.find((x) => x.klic === uroven)
  if (!u) return {}
  return {
    title: `Úroveň editoru ${u.nazev} – CodeKom`,
    description: `${u.princip}. ${u.popis}`.slice(0, 155),
    alternates: { canonical: `/urovne/${u.klic}` },
  }
}

export default async function DetailUrovne({ params }: { params: Promise<{ uroven: string }> }) {
  const { uroven } = await params
  const i = UROVNE.findIndex((x) => x.klic === uroven)
  const u = UROVNE[i]
  if (!u) notFound()

  const vyssi = UROVNE[i + 1]
  const nizsi = UROVNE[i - 1]
  const navic = vyssi ? MATICE.filter((r) => r.hodnoty[i] !== r.hodnoty[i + 1]) : []
  const admin = odkazAdministrace(u.klic)

  return (
    <div className="obal pb-24">
      <nav aria-label="Drobečková navigace" className="pt-6 text-[14px] text-sediva">
        <Link href="/urovne" className="hover:text-text hover:underline">
          Úrovně
        </Link>
        <span className="mx-2 text-linka" aria-hidden="true">
          /
        </span>
        <span aria-current="page" className="font-medium text-text">
          {u.nazev}
        </span>
      </nav>

      <StrankaHero
        slovoPozadi={u.nazev.toUpperCase()}
        rubrika={`Úroveň ${i + 1} ze 3: „${u.princip}“`}
        nadpis={
          <>
            Úroveň <span className="text-gradient">{u.nazev}</span>
          </>
        }
        popis={u.popis}
        odznaky={[
          `Cena od ${kc(u.ceny[0])} / měsíc`,
          u.proKoho,
          'Plná zákonná přístupnost',
          'Smlouva na dobu neurčitou',
        ]}
        tlacitka={[
          { href: '/cenik', text: 'Spočítat cenu v kalkulačce', primarni: true },
          { href: '/ukazky', text: 'Prohlédnout šablony' },
        ]}
      />

      {/* Ceny a pro koho */}
      <div className="mt-14 grid gap-8 lg:grid-cols-12">
        <div className="sklo-svetle rounded-3xl p-8 lg:col-span-7">
          <span className="text-[13px] font-bold uppercase tracking-wider text-akcent-tmavy">
            Základní filozofie
          </span>
          <h2 className="mt-2 text-[28px] font-bold">Pro koho je úroveň {u.nazev}</h2>
          <p className="mt-4 text-[17px] leading-relaxed text-text font-medium">{u.proKoho}</p>
          <p className="mt-3 text-[15px] leading-relaxed text-sediva">
            Ani v nejvyšší úrovni editoru nelze porušit pravidla přístupnosti (WCAG 2.2 AA) ani rozbít povinné části webu. Systém automaticky kontroluje kontrast, strukturu nadpisů i alt popisy.
          </p>
        </div>

        <aside aria-label="Ceny úrovně" className="sklo-svetle flex flex-col justify-between rounded-3xl p-8 lg:col-span-5">
          <div>
            <span className="text-[13px] font-bold uppercase tracking-wider text-akcent-tmavy">
              Měsíční licence
            </span>
            <h2 className="mt-2 text-[26px] font-bold">Cena podle velikosti</h2>
            <ul className="mt-6 space-y-3">
              {VELIKOSTI.map((v, j) => (
                <li key={v.klic} className="flex items-baseline justify-between border-b border-linka/60 pb-3">
                  <span className="text-[15px] text-sediva">{v.nazev}</span>
                  <span className="text-[20px] font-bold text-noc">od {kc(u.ceny[j]!)}</span>
                </li>
              ))}
            </ul>
            <p className="mt-2 text-[12px] text-sediva">měsíčně bez DPH</p>
          </div>
          <p className="stitek mt-6 border-t border-linka pt-4">{STITEK_CENY}</p>
        </aside>
      </div>

      {/* Co v úrovni uděláte */}
      <section aria-labelledby="co-udelate" className="mt-20">
        <div className="max-w-[42em]">
          <p className="rubrika">Funkce a možnosti</p>
          <h2 id="co-udelate" className="mt-1 text-[28px] md:text-[38px]">
            Co v úrovni {u.nazev} uděláte
          </h2>
        </div>
        <ol className="mt-8 grid gap-4 sm:grid-cols-2">
          {u.coUdelate.map((t, j) => (
            <li
              key={t}
              className="sklo-svetle flex items-start gap-4 rounded-2xl p-6 transition-transform hover:-translate-y-0.5"
            >
              <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-noc text-[15px] font-bold text-white">
                {String(j + 1).padStart(2, '0')}
              </span>
              <span className="text-[16px] font-medium leading-snug text-text">{t}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* Jak vypadá administrace */}
      <section aria-labelledby="obrazovky-admin" className="na-tmave zare relative isolate mt-20 overflow-hidden rounded-[32px] bg-noc px-6 py-14 md:px-14 md:py-16">
        <p className="rubrika">Ukázka prostředí</p>
        <h2 id="obrazovky-admin" className="mt-2 text-[30px] md:text-[42px] text-white">
          Jak vypadá administrace
        </h2>
        <p className="mt-3 max-w-[40em] text-[17px] text-white/80">
          Tři obrazovky, na kterých je úroveň {u.nazev} nejlépe vidět. Všechny si můžete proklikat v ukázce bez nutnosti přihlašování.
        </p>

        <ul className="mt-10 grid gap-6 md:grid-cols-3">
          {u.obrazovky.map((o) => (
            <li key={o.nazev} className="sklo rounded-2xl p-6">
              <h3 className="text-[20px] font-bold text-white">{o.nazev}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-white/80">{o.popis}</p>
            </li>
          ))}
        </ul>

        {admin ? (
          <div className="mt-10 border-t border-white/10 pt-6">
            <a href={admin} className="tlacitko" rel="noopener noreferrer">
              Otevřít živou ukázku administrace
            </a>
          </div>
        ) : null}
      </section>

      {/* Co platí ve všech úrovních */}
      <section aria-labelledby="vsechny-urovne" className="mt-20">
        <div className="max-w-[42em]">
          <p className="rubrika">Společný základ</p>
          <h2 id="vsechny-urovne" className="mt-1 text-[28px] md:text-[38px]">
            Co platí ve všech úrovních
          </h2>
        </div>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            'Úřední deska s archivem a záznamem o vyvěšení, který nejde smazat.',
            'Povinně zveřejňované informace, prohlášení o přístupnosti a GDPR.',
            'Kontrola přístupnosti před publikací, která chybu nepustí na web.',
            'Hlídání lhůt: rozpočet, závěrečný účet, sejmutí z desky.',
            'Aplikace pro občany s oznámeními a krizovými hlášeními.',
            'Přechod na vyšší úroveň kdykoli, obsah se zachová.',
          ].map((t) => (
            <li key={t} className="sklo-svetle flex items-start gap-3 rounded-2xl p-6">
              <span className="mt-1 size-2 rounded-full bg-akcent-tmavy shrink-0" aria-hidden="true" />
              <span className="text-[15px] leading-relaxed text-text font-medium">{t}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Rozdíly oproti vyšší úrovni */}
      {vyssi ? (
        <section aria-labelledby="rozdily-urovni" className="mt-20">
          <div className="max-w-[42em]">
            <p className="rubrika">Srovnání</p>
            <h2 id="rozdily-urovni" className="mt-1 text-[28px] md:text-[38px]">
              Co přidá úroveň {vyssi.nazev}
            </h2>
          </div>

          <div
            className="sklo-svetle mt-8 overflow-x-auto rounded-3xl border border-linka/80 p-4 md:p-6 shadow-xl"
            role="region"
            aria-label={`Rozdíly úrovní ${u.nazev} a ${vyssi.nazev}, posuňte do strany`}
            tabIndex={0}
          >
            <table className="w-full min-w-[560px] border-collapse text-left">
              <caption className="sr-only">
                Rozdíly mezi úrovní {u.nazev} a {vyssi.nazev}
              </caption>
              <thead>
                <tr className="border-b-2 border-linka">
                  <th scope="col" className="pb-3 pr-4 font-bold text-noc">
                    Funkce
                  </th>
                  <th scope="col" className="pb-3 pr-4 font-bold text-noc">
                    {u.nazev}
                  </th>
                  <th scope="col" className="pb-3 pr-4 font-bold text-noc">
                    {vyssi.nazev}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-linka/60 text-[15px]">
                {navic.map((r) => (
                  <tr key={r.funkce} className="hover:bg-white/40">
                    <th scope="row" className="py-3.5 pr-4 font-normal text-text">
                      {r.funkce}
                    </th>
                    {[r.hodnoty[i]!, r.hodnoty[i + 1]!].map((h, k) => (
                      <td key={k} className="py-3.5 pr-4 font-semibold">
                        {h === true ? (
                          <span className="text-akcent-tmavy">Ano</span>
                        ) : h === false ? (
                          <span className="text-sediva">Ne</span>
                        ) : (
                          h
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6">
            <Link href={`/urovne/${vyssi.klic}`} className="font-semibold text-akcent-tmavy underline hover:no-underline">
              Zobrazit podrobnosti o úrovni {vyssi.nazev} &rarr;
            </Link>
          </div>
        </section>
      ) : null}

      {/* Navigace mezi úrovněmi */}
      <nav aria-label="Ostatní úrovně" className="mt-16 flex flex-wrap justify-between gap-4 border-t border-linka pt-6">
        {nizsi ? (
          <Link href={`/urovne/${nizsi.klic}`} className="tlacitko-obrys !min-h-11">
            &larr; Nižší úroveň: {nizsi.nazev}
          </Link>
        ) : (
          <span />
        )}
        <Link href="/urovne" className="tlacitko-obrys !min-h-11">
          Porovnat všechny 3 úrovně
        </Link>
      </nav>
    </div>
  )
}
