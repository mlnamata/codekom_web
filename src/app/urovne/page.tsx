import type { Metadata } from 'next'
import Link from 'next/link'
import { StrankaHero } from '@/komponenty/StrankaHero'
import { VyzvaSekce } from '@/komponenty/VyzvaSekce'
import { STITEK_CENY, VELIKOSTI, kc } from '@/lib/cenik'
import { BLOKY, MATICE, ROLE, UROVNE, type Hodnota } from '@/lib/urovne'

export const metadata: Metadata = {
  title: 'Tři úrovně editoru webu obce – CodeKom',
  description:
    'Základ: píšu obsah. Pokročilý: skládám stránky. Advance: upravuji skoro vše. Porovnání funkcí, rolí a cen všech tří úrovní editoru.',
  alternates: { canonical: '/urovne' },
}

function Bunka({ h }: { h: Hodnota }) {
  if (h === true)
    return (
      <span className="inline-flex items-center gap-1.5 font-semibold text-akcent-tmavy">
        <span className="size-2 rounded-full bg-akcent-tmavy" aria-hidden="true" />
        Ano
      </span>
    )
  if (h === false) return <span className="text-sediva">Ne</span>
  return <span className="font-medium text-text">{h}</span>
}

export default function Urovne() {
  return (
    <div className="obal pb-24">
      <StrankaHero
        slovoPozadi="ÚROVNĚ"
        rubrika="Tři úrovně editoru"
        nadpis={
          <>
            Vyberte si, co chcete <span className="text-gradient">na webu sami ovládat</span>
          </>
        }
        popis="Úroveň určuje, co obec smí na webu změnit. Všechny tři jsou jedna aplikace, úroveň jen zapíná funkce. Ani v nejvyšší úrovni nejde rozbít přístupnost ani povinné části webu: editor takovou změnu nepustí do publikace."
        odznaky={[
          'Základ: píšu obsah (3 uživatelé)',
          'Pokročilý: skládám stránky (10 uživatelů)',
          'Advance: upravuji skoro vše (neomezeně)',
          'Přechod na vyšší úroveň kdykoli se zachováním obsahu',
        ]}
        tlacitka={[
          { href: '#matice', text: 'Podrobné srovnání funkcí', primarni: true },
          { href: '/cenik', text: 'Ceník a kalkulačka' },
        ]}
        metriky={[
          ['3 úrovně', 'podle vašeho času'],
          ['WCAG 2.2 AA', 'přístupnost v každé úrovni'],
          ['Přechod kdykoli', 'obsah zůstává zachován'],
        ]}
      />

      {/* 3 karty úrovní */}
      <section aria-labelledby="tri-urovne" className="mt-14">
        <h2 id="tri-urovne" className="sr-only">
          Přehled tří úrovní editoru
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {UROVNE.map((u) => (
            <div
              key={u.klic}
              className="sklo-svetle flex flex-col rounded-3xl p-8 transition-transform duration-200 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex-1">
                <span className="text-[13px] font-bold uppercase tracking-wider text-akcent-tmavy">
                  „{u.princip}“
                </span>
                <h3 className="mt-1 text-[32px] font-bold">{u.nazev}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-text">{u.popis}</p>
                <p className="mt-4 text-[14px] text-sediva">{u.proKoho}</p>
              </div>

              <div className="mt-6 border-t border-linka pt-4">
                <span className="block text-[13px] text-sediva">Cena od</span>
                <span className="text-[34px] font-extrabold text-noc">{kc(u.ceny[0])}</span>
                <span className="block text-[13px] text-sediva">měsíčně bez DPH, obec do 500 obyvatel</span>
              </div>

              <div className="mt-6 space-y-3">
                <Link href={`/urovne/${u.klic}`} className="tlacitko w-full !px-4">
                  Podrobně o úrovni {u.nazev}
                </Link>
                <Link href="/cenik" className="tlacitko-obrys w-full !min-h-11 !px-4">
                  Ceník a kalkulačka
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Matice funkcí */}
      <section id="matice" aria-labelledby="porovnani-funkci" className="mt-24 scroll-mt-28">
        <div className="max-w-[42em]">
          <p className="rubrika">Kompletní srovnání</p>
          <h2 id="porovnani-funkci" className="mt-1 text-[28px] md:text-[40px]">
            Podrobné porovnání funkcí
          </h2>
          <p className="mt-3 text-[16px] text-sediva">
            Přehledná tabulka možností jednotlivých úrovní. Tabulku lze na telefonu posouvat do stran.
          </p>
        </div>

        <div
          className="sklo-svetle mt-8 overflow-x-auto rounded-3xl border border-linka/80 p-4 md:p-6 shadow-xl"
          role="region"
          aria-label="Porovnání tří úrovní, tabulku posuňte do strany"
          tabIndex={0}
        >
          <table className="w-full min-w-[620px] border-collapse text-left">
            <caption className="sr-only">Podrobné porovnání funkcí tří úrovní editoru</caption>
            <thead>
              <tr className="border-b-2 border-linka">
                <th scope="col" className="pb-4 pr-6 text-[17px] font-bold text-noc">
                  Funkce
                </th>
                {UROVNE.map((u) => (
                  <th key={u.klic} scope="col" className="pb-4 pr-6 text-[17px] font-bold text-noc">
                    {u.nazev}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-linka/60 text-[15px]">
              {MATICE.map((r) => (
                <tr key={r.funkce} className="transition-colors hover:bg-white/40">
                  <th scope="row" className="py-3.5 pr-6 font-normal text-text">
                    {r.funkce}
                  </th>
                  {r.hodnoty.map((h, j) => (
                    <td key={j} className="py-3.5 pr-6">
                      <Bunka h={h} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Ceny podle velikosti obce */}
      <section aria-labelledby="ceny-podle-velikosti" className="mt-24">
        <div className="max-w-[42em]">
          <p className="rubrika">Financování</p>
          <h2 id="ceny-podle-velikosti" className="mt-1 text-[28px] md:text-[38px]">
            Ceny podle velikosti obce
          </h2>
          <p className="mt-3 text-[16px] text-sediva">
            Orientační měsíční ceny bez DPH. Přesnou kalkulaci s ohledem na počet obyvatel a přídavné moduly vám připravíme v písemné nabídce.
          </p>
        </div>

        <div
          className="sklo-svetle mt-8 overflow-x-auto rounded-3xl border border-linka/80 p-4 md:p-6 shadow-xl"
          role="region"
          aria-label="Ceny úrovní podle velikosti obce"
          tabIndex={0}
        >
          <table className="w-full min-w-[560px] border-collapse text-left">
            <caption className="sr-only">Ceny úrovní podle velikosti obce</caption>
            <thead>
              <tr className="border-b-2 border-linka">
                <th scope="col" className="pb-4 pr-6 text-[17px] font-bold text-noc">
                  Úroveň
                </th>
                {VELIKOSTI.map((v) => (
                  <th key={v.klic} scope="col" className="pb-4 pr-6 text-[17px] font-bold text-noc">
                    {v.nazev}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-linka/60 text-[16px]">
              {UROVNE.map((u) => (
                <tr key={u.klic} className="transition-colors hover:bg-white/40">
                  <th scope="row" className="py-4 pr-6 font-semibold text-noc">
                    {u.nazev}
                  </th>
                  {u.ceny.map((c, j) => (
                    <td key={j} className="py-4 pr-6 font-medium text-text">
                      od {kc(c)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="stitek mt-4">{STITEK_CENY}</p>
      </section>

      {/* Role a bloky */}
      <div className="mt-24 grid gap-8 lg:grid-cols-2">
        <section aria-labelledby="role-uzivatelu" className="sklo-svetle rounded-3xl p-8 shadow-xl">
          <p className="rubrika">Správa práv</p>
          <h2 id="role-uzivatelu" className="mt-1 text-[26px] font-bold">
            Role uživatelů
          </h2>
          <p className="mt-2 text-[15px] text-sediva">
            Přidělujte oprávnění přesně podle toho, kdo v obci za co odpovídá.
          </p>
          <ul className="mt-6 space-y-3.5 divide-y divide-linka/60 text-[15px]">
            {ROLE.map((r) => (
              <li key={r.role} className="pt-3.5 first:pt-0">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <span className="font-bold text-text">{r.role}</span>
                  <span className="text-[13px] font-semibold text-akcent-tmavy">od úrovně {r.od}</span>
                </div>
                <p className="mt-1 text-[14px] text-sediva leading-relaxed">{r.coSmi}</p>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="bloky-stranek" className="sklo-svetle rounded-3xl p-8 shadow-xl">
          <p className="rubrika">Obsahové prvky</p>
          <h2 id="bloky-stranek" className="mt-1 text-[26px] font-bold">
            Bloky do stránek
          </h2>
          <p className="mt-2 text-[15px] text-sediva">
            Připravené komponenty pro tvorbu moderních a přehledných stránek obce.
          </p>
          <ul className="mt-6 space-y-3.5 divide-y divide-linka/60 text-[15px]">
            {BLOKY.map((b) => (
              <li key={b.nazev} className="pt-3.5 first:pt-0">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <span className="font-bold text-text">{b.nazev}</span>
                  <span className="text-[13px] font-semibold text-akcent-tmavy">od úrovně {b.od}</span>
                </div>
                <p className="mt-1 text-[14px] text-sediva leading-relaxed">{b.k}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="mt-16 flex flex-wrap gap-4">
        <Link href="/ukazky" className="tlacitko">
          Prohlédnout šablony webů
        </Link>
        <Link href="/cenik" className="tlacitko-obrys">
          Spočítat orientační cenu
        </Link>
      </div>

      <VyzvaSekce
        nadpis="Pomůžeme vybrat správnou úroveň"
        perex="Zavolejte nebo napište. Společně projdeme, kolik lidí bude na webu pracovat a jaká úroveň bude pro vaši obec nejvhodnější."
      />
    </div>
  )
}
