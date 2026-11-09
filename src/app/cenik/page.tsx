import type { Metadata } from 'next'
import Link from 'next/link'
import { JsonLd } from '@/komponenty/JsonLd'
import { KalkulackaCeniku } from '@/komponenty/KalkulackaCeniku'
import { StrankaHero } from '@/komponenty/StrankaHero'
import { VyzvaSekce } from '@/komponenty/VyzvaSekce'
import {
  CENY_WEBU,
  DIGITALNI_DOPLNKY,
  DOPLNKOVE_SLUZBY,
  HLASOVY_BOT,
  HODINOVKA_EXPERTA,
  POPLATEK_NASAZENI,
  cenaSekundyPausalu,
  cislo,
  kcSekunda,
  DOPLNIT_CENU_ZARIZENI,
  SOUCASTKY_CHYTRA_OBEC,
  STITEK_CENY,
  kc,
} from '@/lib/cenik'
import { nactiStranku } from '@/lib/obsah'
import { sluzbaJsonLd } from '@/lib/seo'

const stranka = nactiStranku('cenik')

export const metadata: Metadata = {
  title: stranka.title,
  description: stranka.description,
  alternates: { canonical: '/cenik' },
}

const UROVNE_KARTY = [
  {
    klic: 'zaklad',
    nazev: 'Základ',
    podtitul: 'Píšu obsah',
    popis: 'Pro starostu nebo účetní, kteří mají na web hodinu až dvě týdně. Články, akce a dokumenty se vkládají do pevných míst šablony. 3 uživatelé.',
    cenaOd: CENY_WEBU.zaklad[0],
    nasazeni: POPLATEK_NASAZENI.zaklad,
    vyhody: [
      'Úřední deska s evidencí a archivem',
      'Mobilní aplikace pro občany',
      'Kontrola přístupnosti před publikací',
      'Hlídání zákonných lhůt',
      'Až 3 redaktoři obce',
    ],
  },
  {
    klic: 'pokrocily',
    nazev: 'Pokročilý',
    podtitul: 'Skládám stránky',
    popis: 'Pro obce s pestřejším životem a spolky. Možnost přeskládat bloky, upravovat menu, schvalovat příspěvky a provozovat podweby organizací. 10 uživatelů.',
    cenaOd: CENY_WEBU.pokrocily[0],
    nasazeni: POPLATEK_NASAZENI.pokrocily,
    vyhody: [
      'Vše z úrovně Základ',
      'Skládání stránek z 15 bloků',
      'Schvalovací kolečko před zveřejněním',
      'Až 3 podweby (škola, hasiči, knihovna)',
      'Až 10 redaktorů',
    ],
  },
  {
    klic: 'advance',
    nazev: 'Advance',
    podtitul: 'Upravuji skoro vše',
    popis: 'Pro větší obce a města s vlastním vizuálním stylem. Volné rozvržení, vlastní barvy, písma, integrovaný AI asistent a neomezený počet uživatelů.',
    cenaOd: CENY_WEBU.advance[0],
    nasazeni: POPLATEK_NASAZENI.advance,
    vyhody: [
      'Vše z úrovně Pokročilý',
      'AI asistent odpovídající z dokumentů',
      'Vlastní barvy, písma a rozvržení',
      'Neomezený počet podwebů a uživatelů',
      'Vlastní kontakt s odpovědí do 4 hodin',
    ],
  },
] as const

const PODMINKY_SMLOUVY = [
  {
    titul: 'Smlouva na dobu neurčitou',
    text: 'Obec může smlouvu vypovědět kdykoli i bez udání důvodu. Výpovědní doba je 3 měsíce u roční licence a 1 měsíc u měsíčního předplatného, začíná prvním dnem měsíce po doručení výpovědi.',
  },
  {
    titul: '30 dní zkušební doba',
    text: 'Prvních 30 dní od zpřístupnění služby je zkušební doba. Vypoví-li obec smlouvu ve zkušební době, vrátíme celou zaplacenou cenu do 14 dní.',
  },
  {
    titul: 'Export dat je vždy zdarma',
    text: 'Export dat je zdarma a za ukončení smlouvy se nic neplatí. Po skončení smlouvy zůstane služba 30 dní v režimu jen pro čtení.',
  },
  {
    titul: 'Úřední deska funguje dál',
    text: 'Při prodlení s platbou delším než 30 dní po upomínce můžeme službu omezit na režim jen pro čtení. Úřední deska, krizová hlášení a export dat zůstávají vždy funkční.',
  },
]

export default function Cenik() {
  return (
    <div className="obal pb-24">
      <JsonLd data={sluzbaJsonLd()} />

      <StrankaHero
        slovoPozadi="CENÍK"
        rubrika="Přehledné ceny pro každou obec"
        nadpis={
          <>
            Ceník webu, služeb{' '}
            <span className="text-gradient">a chytré obce</span>
          </>
        }
        popis="Cena webu se odvíjí od počtu obyvatel a zvolené úrovně editoru. Žádné skryté kličky: smlouva na dobu neurčitou, 30 dní na vyzkoušení s vrácením celé částky a export dat zdarma."
        odznaky={[
          'Smlouva na dobu neurčitou',
          '30 dní zkušební doba',
          'Export dat zdarma',
          'Platba ročně i měsíčně',
        ]}
        tlacitka={[
          { href: '#kalkulacka', text: 'Spočítat orientační cenu', primarni: true },
          { href: '#soucastky', text: 'Katalog součástek pro obec' },
        ]}
        metriky={[
          [`od ${kc(CENY_WEBU.zaklad[0])}`, 'měsíčně bez DPH'],
          ['30 dní', 'zkušební doba s vrácením'],
          ['Výpověď kdykoli', 'smlouva na dobu neurčitou'],
        ]}
      />

      {/* 3 úrovně webu */}
      <section aria-labelledby="urovne-webu" className="mt-14">
        <div className="max-w-[42em]">
          <p className="rubrika">Měsíční provoz a licence</p>
          <h2 id="urovne-webu" className="mt-2 text-[32px] md:text-[44px]">
            Web obce podle úrovně editoru
          </h2>
          <p className="mt-3 text-[17px] text-sediva">
            Všechny tři úrovně běží na stejné stabilní platformě a splňují zákon o přístupnosti i vyhlášku č. 515/2020 Sb. Úroveň jen určuje míru volnosti při úpravách.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {UROVNE_KARTY.map((u) => (
            <div
              key={u.klic}
              className="sklo-svetle flex flex-col justify-between rounded-3xl p-8 transition-transform duration-200 hover:-translate-y-1"
            >
              <div>
                <span className="text-[13px] font-bold uppercase tracking-wider text-akcent-tmavy">
                  {u.podtitul}
                </span>
                <h3 className="mt-1 text-[30px] font-bold">{u.nazev}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-sediva">{u.popis}</p>

                <div className="mt-6 border-y border-linka py-4">
                  <span className="block text-[13px] text-sediva">Měsíčně od (do 500 obyvatel)</span>
                  <span className="text-[34px] font-extrabold text-noc">
                    {kc(u.cenaOd)}
                  </span>
                  <span className="block text-[13px] text-sediva">bez DPH, orientačně</span>
                  <span className="mt-2 block text-[13px] font-medium text-text">
                    Zavedení a spuštění: od {kc(u.nasazeni)}
                  </span>
                </div>

                <ul className="mt-6 space-y-2.5 text-[15px]">
                  {u.vyhody.map((v) => (
                    <li key={v} className="flex items-start gap-2.5">
                      <span className="mt-1 size-2 rounded-full bg-akcent-tmavy shrink-0" aria-hidden="true" />
                      <span>{v}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-4 border-t border-linka">
                <Link href={`/urovne/${u.klic}`} className="tlacitko-obrys w-full !min-h-11 text-center">
                  Podrobně o úrovni {u.nazev}
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-plocha p-5 text-[15px]">
          <p className="text-sediva">
            Ceny se přizpůsobují velikosti obce: do 500 obyvatel, 500–2 000 i 2 000–10 000 obyvatel a pro větší města připravíme individuální kalkulaci.
          </p>
          <Link href="/urovne" className="font-semibold text-akcent-tmavy underline hover:no-underline">
            Zobrazit srovnávací matici všech funkcí
          </Link>
        </div>
      </section>

      {/* Zavedení, hodinovka a doplňkové služby */}
      <section aria-labelledby="zavedeni-sluzby" className="mt-20">
        <div className="max-w-[42em]">
          <p className="rubrika">Zavedení a individuální péče</p>
          <h2 id="zavedeni-sluzby" className="mt-2 text-[32px] md:text-[44px]">
            Poplatek za nasazení a služby experta
          </h2>
          <p className="mt-3 text-[17px] text-sediva">
            Při přechodu na CodeKom se obec nemusí starat o technické detaily. Web nastavíme, převedeme kontakty i úřední desku a obsluhu zaškolíme.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {/* Jednorázové zavedení */}
          <div className="sklo-svetle rounded-3xl p-8">
            <span className="text-[13px] font-bold uppercase tracking-wider text-akcent-tmavy">
              Jednorázově
            </span>
            <h3 className="mt-2 text-[26px] font-bold">Poplatek za nasazení webu</h3>
            <p className="mt-3 text-[16px] text-sediva">
              Kompletní příprava webu na klíč od <strong>{kc(POPLATEK_NASAZENI.zaklad)}</strong> bez DPH podle zvolené úrovně:
            </p>
            <ul className="mt-6 space-y-3 text-[15px]">
              {[
                'Technická příprava a napojení domény obce, zabezpečení a HTTPS certifikát',
                'Výběr a nastavení šablony, naplnění obecními symboly a kontakty',
                'Převod základního obsahu a přesměrování starých adres',
                'Zprovoznění elektronické úřední desky a mobilní aplikace pro občany',
                'Zaškolení obsluhy: video kurz, u Pokročilého navíc 1 hodina online, u Advance 2 hodiny na místě',
              ].map((b) => (
                <li key={b} className="flex items-start gap-2.5">
                  <span className="mt-1.5 size-1.5 rounded-full bg-akcent-tmavy shrink-0" aria-hidden="true" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Hodinová sazba experta */}
          <div className="sklo-svetle rounded-3xl p-8">
            <span className="text-[13px] font-bold uppercase tracking-wider text-akcent-tmavy">
              Zakázková práce
            </span>
            <h3 className="mt-2 text-[26px] font-bold">Hodinová sazba experta: {HODINOVKA_EXPERTA} Kč</h3>
            <p className="mt-3 text-[16px] text-sediva">
              Potřebujete specifické grafické práce, pomoc se starým archivem nebo konzultaci? Náš specialista je k dispozici za pevnou hodinovou sazbu <strong>{HODINOVKA_EXPERTA} Kč / hod</strong> bez DPH.
            </p>
            <div className="mt-6 space-y-3">
              {DOPLNKOVE_SLUZBY.slice(1).map((s) => (
                <div key={s.nazev} className="border-t border-linka pt-3">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <span className="font-semibold text-text">{s.nazev}</span>
                    <span className="text-[14px] font-bold text-akcent-tmavy">{s.cena}</span>
                  </div>
                  <p className="mt-1 text-[14px] text-sediva">{s.popis}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* AI hlasový bot na telefonní lince */}
      <section id="hlasovy-bot" aria-labelledby="nadpis-hlasovy-bot" className="mt-20 scroll-mt-28">
        <div className="max-w-[42em]">
          <p className="rubrika">Doplněk na připlacení</p>
          <h2 id="nadpis-hlasovy-bot" className="mt-2 text-[32px] md:text-[44px]">
            AI hlasový bot na telefonní lince
          </h2>
          <p className="mt-3 text-[17px] text-sediva">
            Bot zvedá hovory na lince obce a odpovídá volajícím. Účtuje se po sekundách, platí se jen čas, kdy bot skutečně hovoří s volajícím. Bez paušálu stojí sekunda {kcSekunda(HLASOVY_BOT.zaSekundu)}, s paušálem vychází levněji.
          </p>
        </div>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <li className="sklo-svetle flex flex-col rounded-3xl p-7">
            <span className="text-[13px] font-bold uppercase tracking-wider text-akcent-tmavy">Bez paušálu</span>
            <p className="mt-3 text-[32px] font-extrabold tracking-tight">
              {kcSekunda(HLASOVY_BOT.zaSekundu)}
              <span className="block text-[15px] font-normal text-sediva">za sekundu hovoru</span>
            </p>
            <p className="mt-4 text-[15px] text-sediva">Žádný měsíční poplatek. Hodí se na vyzkoušení nebo pro linku s málo hovory.</p>
          </li>
          {HLASOVY_BOT.pausaly.map((p) => (
            <li key={p.klic} className="sklo-svetle flex flex-col rounded-3xl p-7">
              <span className="text-[13px] font-bold uppercase tracking-wider text-akcent-tmavy">Paušál {p.nazev}</span>
              <p className="mt-3 text-[32px] font-extrabold tracking-tight">
                {kc(p.mesicne)}
                <span className="block text-[15px] font-normal text-sediva">měsíčně</span>
              </p>
              <ul className="mt-4 space-y-1.5 text-[15px] text-sediva">
                <li>
                  <strong className="text-text">{cislo(p.sekund)} sekund</strong> v ceně ({cislo(p.sekund / 60)} minut), zhruba {cislo(Math.round(p.sekund / HLASOVY_BOT.delkaHovoru))} hovorů po {HLASOVY_BOT.delkaHovoru / 60} minutách
                </li>
                <li>každá další sekunda {kcSekunda(p.dalsiSekunda)}</li>
                <li>při vyčerpání vychází sekunda na {kcSekunda(cenaSekundyPausalu(p))}</li>
              </ul>
            </li>
          ))}
        </ul>
        <ul className="mt-6 grid gap-3 md:grid-cols-2">
          {HLASOVY_BOT.pravidla.map((r) => (
            <li key={r} className="flex items-start gap-2.5 rounded-2xl bg-plocha p-4 text-[16px]">
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-akcent-tmavy" aria-hidden="true" />
              <span>{r}</span>
            </li>
          ))}
        </ul>
        <p className="stitek mt-4">Měsíčně bez DPH. Účtuje se po sekundách. Nevyčerpané sekundy se nepřevádějí do dalšího měsíce. {STITEK_CENY}</p>
      </section>

      {/* Digitální doplňky */}
      <section id="digitalni-doplnky" aria-labelledby="nadpis-doplnky" className="mt-20 scroll-mt-28">
        <div className="max-w-[44em]">
          <p className="rubrika">Digitální doplňky</p>
          <h2 id="nadpis-doplnky" className="mt-2 text-[32px] md:text-[44px]">
            Další digitální služby pro úřad a občany
          </h2>
          <p className="mt-3 text-[17px] text-sediva">
            Doplňky jdou přikoupit ke kterékoli úrovni a kdykoli zrušit. Měsíční doplňky přičte i kalkulačka níže.
          </p>
        </div>
        <ul className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {DIGITALNI_DOPLNKY.map((d) => (
            <li key={d.klic} className="sklo-svetle flex flex-col rounded-3xl p-7">
              <h3 className="text-[20px] font-bold leading-snug">{d.nazev}</h3>
              <p className="mt-2 flex-1 text-[15px] leading-relaxed text-sediva">{d.popis}</p>
              <p className="mt-4 border-t border-linka pt-3">
                <span className="text-[22px] font-bold text-noc">od {kc(d.cenaOd)}</span>{' '}
                <span className="text-[14px] text-sediva">{d.jednotka} bez DPH</span>
              </p>
            </li>
          ))}
        </ul>
        <p className="stitek mt-4">Ceny bez DPH. {STITEK_CENY}</p>
      </section>

      {/* Kalkulačka */}
      <section id="kalkulacka" aria-labelledby="nadpis-kalkulacka" className="mt-20 scroll-mt-28">
        <div className="max-w-[42em]">
          <p className="rubrika">Interaktivní odhad</p>
          <h2 id="nadpis-kalkulacka" className="mt-2 text-[32px] md:text-[44px]">
            Spočítejte orientační cenu
          </h2>
          <p className="mt-3 text-[17px] text-sediva">
            Zvolte parametry vaší obce a zjistěte orientační měsíční i jednorázové náklady. Přesnou nabídku pro radu či zastupitelstvo vám rádi pošleme.
          </p>
        </div>
        <KalkulackaCeniku />
      </section>

      {/* Katalog součástek pro chytrou obec */}
      <section id="soucastky" aria-labelledby="katalog-soucastky" className="mt-24 scroll-mt-28">
        <div className="max-w-[44em]">
          <p className="rubrika">Modul Chytré budovy a IoT</p>
          <h2 id="katalog-soucastky" className="mt-2 text-[32px] md:text-[44px]">
            Katalog součástek pro chytřejší obec
          </h2>
          <p className="mt-3 text-[17px] text-sediva">
            Prvky, které propojují web a aplikaci CodeKom s fyzickým světem v obci. Fungují spolehlivě a samostatně i bez připojení k internetu.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SOUCASTKY_CHYTRA_OBEC.filter((x) => x.cenaOd !== undefined).map((item) => (
            <div
              key={item.klic}
              className="sklo-svetle flex flex-col justify-between rounded-3xl p-7 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
            >
              <div>
                <span className="inline-block rounded-full bg-white px-3 py-1 text-[12px] font-bold uppercase tracking-wider text-akcent-tmavy border border-linka">
                  {item.kategorie}
                </span>
                <h3 className="mt-4 text-[22px] font-bold leading-snug">{item.nazev}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-sediva">{item.popis}</p>

                <div className="mt-4 rounded-2xl bg-white/70 p-4 border border-linka/60">
                  <span className="block text-[12px] font-semibold uppercase tracking-wider text-sediva">
                    Přínos pro obec
                  </span>
                  <p className="mt-1 text-[14px] leading-relaxed text-text font-medium">
                    {item.prinos}
                  </p>
                </div>
              </div>

              <div className="mt-6 border-t border-linka pt-4 flex items-baseline justify-between">
                <div>
                  <span className="block text-[12px] text-sediva">Orientačně od</span>
                  <span className="text-[22px] font-bold text-noc">
                    {item.cenaOd !== undefined ? kc(item.cenaOd) : DOPLNIT_CENU_ZARIZENI}
                  </span>
                  <span className="text-[13px] text-sediva"> / {item.jednotka}</span>
                </div>
                <span className="text-[12px] text-sediva">bez DPH</span>
              </div>
            </div>
          ))}
        </div>
        <p className="stitek mt-4">{STITEK_CENY}</p>
        <p className="mt-6">
          <Link href="/katalog" className="tlacitko">
            Celý katalog zařízení
          </Link>
        </p>
      </section>

      {/* Garance a férová smlouva */}
      <section aria-labelledby="podminky-zaruky" className="mt-24">
        <div className="na-tmave zare relative isolate overflow-hidden rounded-[32px] bg-noc px-6 py-14 md:px-14 md:py-16">
          <p className="rubrika">Jistota pro zastupitele</p>
          <h2 id="podminky-zaruky" className="mt-2 text-[32px] md:text-[46px]">
            Férové podmínky z naší smlouvy
          </h2>
          <p className="mt-3 max-w-[38em] text-[17px] text-white/90">
            Smlouvu navrhujeme tak, aby obec chránila a neuvazovala. Vzorovou smlouvu i podmínky si můžete stáhnout a zkontrolovat.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {PODMINKY_SMLOUVY.map((p) => (
              <div key={p.titul} className="sklo rounded-2xl p-6">
                <h3 className="text-[20px] font-bold text-white">{p.titul}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-white/90">{p.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-4 border-t border-white/10 pt-6">
            <Link href="/ke-stazeni" className="tlacitko">
              Stáhnout vzorovou smlouvu a podklady
            </Link>
            <Link href="/kontakt" className="tlacitko-obrys">
              Požádat o nezávaznou nabídku
            </Link>
          </div>
        </div>
      </section>

      <VyzvaSekce
        nadpis="Připravíme nabídku pro vaši obec"
        perex="Napište nám velikost vaší obce a jaké moduly byste rádi využili. Pošleme přesnou písemnou nabídku pro jednání rady."
      />
    </div>
  )
}
