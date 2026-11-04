/** Orientační ceny „od“ podle docs/navrh-platformy/04-admin-editor.md, platí ke 4. 11. 2026. */
export const STITEK_CENY = 'Orientační cena, přesnou pošleme v nabídce. Platí ke 4. 11. 2026.'

export const VELIKOSTI = [
  { klic: 'do500', nazev: 'do 500 obyvatel' },
  { klic: '500-2000', nazev: '500–2 000 obyvatel' },
  { klic: '2000-10000', nazev: '2 000–10 000 obyvatel' },
] as const

export type KlicUrovne = 'zaklad' | 'pokrocily' | 'advance'

export const CENY_WEBU: Record<KlicUrovne, [number, number, number]> = {
  zaklad: [590, 990, 1690],
  pokrocily: [890, 1490, 2490],
  advance: [1490, 2290, 3790],
}

export const CENA_URADU: [number, number, number] = [600, 1000, 2000]
export const CENA_BUDOVY = 390

/** Jednorázový poplatek za zavedení, nastavení šablony a základní migraci. */
export const POPLATEK_NASAZENI: Record<KlicUrovne, number> = {
  zaklad: 4900,
  pokrocily: 8900,
  advance: 14900,
}

/** Hodinová sazba specialisty pro individuální zakázkové úpravy a konzultace. */
export const HODINOVKA_EXPERTA = 750

export interface SoucastkaKatalogu {
  klic: string
  nazev: string
  cenaOd: number
  jednotka: string
  kategorie: string
  popis: string
  prinos: string
}

/** Katalog hardwarových komponent pro modul Chytré budovy a chytrou obec. */
export const SOUCASTKY_CHYTRA_OBEC: SoucastkaKatalogu[] = [
  {
    klic: 'hlavice',
    nazev: 'Chytrá termostatická hlavice',
    cenaOd: 1490,
    jednotka: 'ks',
    kategorie: 'Úspora vytápění',
    popis: 'Bezdrátová digitální hlavice na radiátory v obecních budovách (sál, knihovna, hasičárna, úřad).',
    prinos: 'Vytápí pouze podle kalendáře akcí a úředních hodin. Zabraňuje přetápění prázdných prostor a šetří obecní rozpočet.',
  },
  {
    klic: 'zamek',
    nazev: 'Elektronická klika s PIN klávesnicí',
    cenaOd: 4800,
    jednotka: 'ks',
    kategorie: 'Přístup a rezervace',
    popis: 'Autonomní kódový zámek pro dveře do sálu, klubovny, tělocvičny nebo na víceúčelové hřiště.',
    prinos: 'Jednorázový kód platí jen po dobu rezervace přes Digitální úřad. Starosta nemusí nikomu předávat fyzické klíče.',
  },
  {
    klic: 'odecet',
    nazev: 'Dálkový odečet vodoměru a elektroměru',
    cenaOd: 2900,
    jednotka: 'ks',
    kategorie: 'Hlídání energií',
    popis: 'Impulzní snímač pro měřidla v obecních objektech s baterií a dálkovým přenosem.',
    prinos: 'Průběžný přehled o spotřebě a okamžité upozornění na havárii potrubí nebo protékající vodu v obecní budově.',
  },
  {
    klic: 'cidlo-hladiny',
    nazev: 'Záplavové a hladinové čidlo vodoteče',
    cenaOd: 3900,
    jednotka: 'ks',
    kategorie: 'Ochrana a bezpečí',
    popis: 'Ultrazvukové měření výšky hladiny potoka, rybníka či retenční nádrže napojené na krizový systém.',
    prinos: 'Při prudkém vzestupu hladiny ihned odešle krizové hlášení starostovi a do mobilní aplikace občanů.',
  },
  {
    klic: 'meteostanice',
    nazev: 'Obecní meteostanice s živými daty',
    cenaOd: 6900,
    jednotka: 'ks',
    kategorie: 'Informace pro občany',
    popis: 'Senzorická meteostanice měřící teplotu, vítr, srážky a vlhkost přímo v katastru obce.',
    prinos: 'Aktuální údaje na úvodní stránce obecního webu pro hasiče, místní zemědělce, zahrádkáře a pořadatele akcí.',
  },
  {
    klic: 'infokiosek',
    nazev: 'Venkovní elektronická úřední deska',
    cenaOd: 45000,
    jednotka: 'ks',
    kategorie: 'Veřejný prostor 24/7',
    popis: 'Odolný venkovní e-ink nebo dotykový panel s nízkou spotřebou chráněný proti vandalismu a počasí.',
    prinos: 'Zajišťuje nepřetržitý přístup k vyvěšeným dokumentům a zprávám přímo před budovou úřadu pro všechny občany.',
  },
]

export const DOPLNKOVE_SLUZBY = [
  {
    nazev: 'Hodinová sazba experta',
    cena: `${HODINOVKA_EXPERTA} Kč / hodina`,
    popis: 'Zakázkové grafické úpravy, asistence s obsahem, konzultace přístupnosti a individuální práce nad rámec běžné podpory.',
  },
  {
    nazev: 'AI hlasový bot na telefonní lince',
    cena: 'účtuje se podle využitých minut, cenu pošleme v nabídce',
    popis: 'Hlasový bot, který odpovídá na hovory obce. Platí se jen za minuty, které bot skutečně využije.',
  },
  {
    nazev: 'Přenesení rozsáhlého archivu ze starého webu',
    cena: 'od 2 900 Kč jednorázově',
    popis: 'Ruční kontrola, vyčištění a přenesení stovek starších dokumentů, vyhlášek a fotografií z dosavadního systému.',
  },
  {
    nazev: 'Prezenční školení na obecním úřadě',
    cena: 'od 3 500 Kč za půlden',
    popis: 'Praktický workshop pro starostu, účetní, zastupitele a redaktory místních spolků přímo u vás na úřadě.',
  },
  {
    nazev: 'Balíček SMS zpráv pro občany',
    cena: 'od 990 Kč za 1 000 SMS',
    popis: 'Rychlé doručení krizových hlášení a důležitých zpráv občanům, kteří nemají chytrý telefon.',
  },
  {
    nazev: 'Příprava podkladů pro dotaci na digitalizaci',
    cena: 'od 4 500 Kč za žádost',
    popis: 'Příprava technické a projektové specifikace pro dotační tituly (IROP, Národní plán obnovy a krajské programy).',
  },
]

const NBSP = String.fromCharCode(160)
export const kc = (n: number) => `${n.toLocaleString('cs-CZ').replace(/\s/g, NBSP)}${NBSP}Kč`

export function spocitej(velikost: number, uroven: KlicUrovne, urad: boolean, budovy: number): number {
  const v = Math.min(2, Math.max(0, velikost))
  return CENY_WEBU[uroven][v]! + (urad ? CENA_URADU[v]! : 0) + Math.max(0, Math.floor(budovy)) * CENA_BUDOVY
}
