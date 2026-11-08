import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { FotoAi } from '@/komponenty/FotoAi'
import { PrepinacPalet } from '@/komponenty/PrepinacPalet'
import { StrankaHero } from '@/komponenty/StrankaHero'
import { VyzvaSekce } from '@/komponenty/VyzvaSekce'
import { odkazAplikace, odkazDema } from '@/lib/demo'
import { najdiSablonu, sablonyGalerie } from '@/lib/sablony'

export const dynamicParams = false
export const generateStaticParams = () => sablonyGalerie().map((s) => ({ klic: s.klic }))

export async function generateMetadata({ params }: { params: Promise<{ klic: string }> }): Promise<Metadata> {
  const s = najdiSablonu((await params).klic)
  if (!s) return {}
  return {
    title: `Šablona ${s.nazev} pro web obce – CodeKom`,
    description: `${s.proKoho} ${s.cimSeLisi}`.slice(0, 155),
    alternates: { canonical: `/ukazky/${s.klic}` },
  }
}

export default async function DetailSablony({ params }: { params: Promise<{ klic: string }> }) {
  const { klic } = await params
  const vse = sablonyGalerie()
  const i = vse.findIndex((s) => s.klic === klic)
  const s = vse[i]
  if (!s) notFound()
  const dalsi = vse[(i + 1) % vse.length]!
  const predchozi = vse[(i - 1 + vse.length) % vse.length]!
  const odkazy = s.palety.map((p) => odkazDema(s.klic, p.index))

  return (
    <div className="obal pb-24">
      <nav aria-label="Drobečková navigace" className="pt-6 text-[14px] text-sediva">
        <Link href="/ukazky" className="hover:text-text hover:underline">
          Šablony
        </Link>
        <span className="mx-2 text-linka" aria-hidden="true">
          /
        </span>
        <span aria-current="page" className="font-medium text-text">
          {s.nazev}
        </span>
      </nav>

      <StrankaHero
        slovoPozadi={s.nazev.toUpperCase()}
        rubrika={`Šablona ${s.cislo} z ${sablonyGalerie().length}`}
        nadpis={
          <>
            Šablona <span className="text-gradient">{s.nazev}</span>
          </>
        }
        popis={s.proKoho}
        odznaky={[
          '3 barevné palety',
          'Elektronická úřední deska',
          'Aplikace pro občany',
          'Přístupnost WCAG 2.2 AA',
        ]}
        tlacitka={[
          { href: '/cenik', text: 'Spočítat cenu v kalkulačce', primarni: true },
          { href: '/kontakt', text: 'Poptat tuto šablonu' },
        ]}
        metriky={[
          ['3 palety', 'barevné varianty šablony'],
          ['Mobilní verze', 'rychlé načítání na telefonu'],
          ['Úřední deska', 's automatickým archivem'],
        ]}
      />

      {/* Interaktivní přepínač a velký náhled */}
      <section aria-label="Ukázka šablony a barevné palety">
        <PrepinacPalet
          nazev={s.nazev}
          palety={s.palety}
          odkazyDema={odkazy}
          aplikace={odkazAplikace()}
        />
      </section>

      {/* Podrobnosti: Čím se liší, mobilní náhled a fotografie */}
      <div className="mt-20 grid gap-8 lg:grid-cols-12">
        <section aria-labelledby="cim-se-lisi" className="sklo-svetle rounded-3xl p-8 lg:col-span-7">
          <span className="text-[13px] font-bold uppercase tracking-wider text-akcent-tmavy">
            Charakteristika
          </span>
          <h2 id="cim-se-lisi" className="mt-2 text-[28px] font-bold">
            Čím se šablona liší
          </h2>
          <p className="mt-3 text-[17px] leading-relaxed text-text font-medium">{s.cimSeLisi}</p>
          <p className="mt-4 text-[15px] leading-relaxed text-sediva">
            Všechny šablony mají úřední desku s evidencí a archivem, rychlé úkony pro občany, kontakty úřadu, povinnou patičku a na telefonu přehledné sbalené menu.
          </p>

          <div className="mt-8 border-t border-linka pt-6">
            <h3 className="text-[20px] font-bold">Zobrazení na telefonu</h3>
            <p className="mt-2 text-[15px] text-sediva">
              Mobilní rozvržení je optimalizované pro rychlé načítání i při slabém signálu a snadné ovládání jednou rukou.
            </p>
            <div className="mt-5 inline-block overflow-hidden rounded-2xl border-4 border-noc/80 bg-white p-1 shadow-xl">
              <img
                src={s.snimekMobil}
                alt={`Úvodní stránka šablony ${s.nazev} na telefonu, paleta ${s.palety[0]!.nazev}.`}
                width={375}
                height={800}
                loading="lazy"
                className="h-auto w-[240px] rounded-xl"
              />
            </div>
          </div>
        </section>

        <section aria-labelledby="foto-uvod" className="sklo-svetle flex flex-col justify-between rounded-3xl p-8 lg:col-span-5">
          <div>
            <span className="text-[13px] font-bold uppercase tracking-wider text-akcent-tmavy">
              Obrazová výbava
            </span>
            <h2 id="foto-uvod" className="mt-2 text-[28px] font-bold">
              Fotografie v úvodu
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-sediva">
              Obec do šablony vloží vlastní fotografie svého katastru, náměstí či přírody. V této ukázce je vygenerovaná ilustrační fotografie pro představu o atmosféře šablony.
            </p>
            <div className="mt-6">
              <FotoAi src={s.foto} alt={`Fotografie z úvodu šablony ${s.nazev}.`} />
            </div>
          </div>

          <div className="mt-8 border-t border-linka pt-6">
            <Link href="/cenik" className="tlacitko w-full text-center">
              Spočítat cenu pro naši obec
            </Link>
          </div>
        </section>
      </div>

      {/* Navigace na předchozí a další šablonu */}
      <nav aria-label="Další šablony" className="mt-16 grid gap-4 sm:grid-cols-2">
        <Link
          href={`/ukazky/${predchozi.klic}`}
          className="sklo-svetle group flex items-center justify-between rounded-2xl p-6 no-underline transition-all hover:-translate-y-1 hover:shadow-lg"
        >
          <div>
            <span className="block text-[13px] text-sediva">Předchozí šablona</span>
            <span className="text-[20px] font-bold text-noc group-hover:text-akcent-tmavy transition-colors">
              {predchozi.nazev}
            </span>
          </div>
          <span className="text-[24px] text-sediva group-hover:text-akcent-tmavy" aria-hidden="true">
            &larr;
          </span>
        </Link>
        <Link
          href={`/ukazky/${dalsi.klic}`}
          className="sklo-svetle group flex items-center justify-between rounded-2xl p-6 no-underline transition-all hover:-translate-y-1 hover:shadow-lg"
        >
          <div className="sm:text-right sm:order-2">
            <span className="block text-[13px] text-sediva">Další šablona</span>
            <span className="text-[20px] font-bold text-noc group-hover:text-akcent-tmavy transition-colors">
              {dalsi.nazev}
            </span>
          </div>
          <span className="text-[24px] text-sediva group-hover:text-akcent-tmavy sm:order-1" aria-hidden="true">
            &rarr;
          </span>
        </Link>
      </nav>

      <div className="mt-12 flex flex-wrap gap-4">
        <Link href="/urovne" className="tlacitko">
          Vybrat úroveň editoru
        </Link>
        <Link href="/cenik" className="tlacitko-obrys">
          Spočítat cenu v kalkulačce
        </Link>
      </div>

      <VyzvaSekce
        nadpis={`Zaujala vás šablona ${s.nazev}?`}
        perex="Rádi vám připravíme nezávaznou nabídku přímo v této šabloně s vašimi obecními symboly a kontakty."
      />
    </div>
  )
}
