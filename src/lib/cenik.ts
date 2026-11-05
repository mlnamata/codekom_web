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

/** Funguje zařízení bez internetu: ano, ne, nebo to ještě ověřujeme. */
export type BezInternetu = 'ano' | 'ne' | 'overit'

export interface SoucastkaKatalogu {
  klic: string
  nazev: string
  /** Bez ceny se zobrazí [DOPLNIT: cena zařízení]. */
  cenaOd?: number
  jednotka: string
  kategorie: string
  popis: string
  prinos: string
  /** Rádiový nebo síťový standard (Zigbee, Matter, Wi-Fi, LAN…). */
  standard?: string
  bezInternetu?: BezInternetu
  /** Neověřené vlastnosti z prompty/04-iot-budovy.md, s [OVĚŘIT]. */
  poznamka?: string
}

export const TEXT_BEZ_INTERNETU: Record<BezInternetu, string> = {
  ano: 'Ano',
  ne: 'Ne, závisí na cloudu',
  overit: 'Ověřujeme',
}

export const DOPLNIT_CENU_ZARIZENI = '[DOPLNIT: cena zařízení]'

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
  // Webkamery: přání zakladatele z 5. 11. 2026, kamerový systém v obsah/prezentace/co-umime.md.
  {
    klic: 'webkamera',
    nazev: 'Venkovní webkamera obce',
    jednotka: 'ks',
    kategorie: 'Informace pro občany',
    popis: 'Venkovní kamera s živým obrazem na webu obce, například sníh na návsi nebo hladina potoka.',
    prinos: 'Občané a hasiči vidí aktuální stav na místě bez cesty ven.',
    standard: 'LAN nebo Wi-Fi [OVĚŘIT]',
    bezInternetu: 'overit',
    poznamka: 'Umístění a záběr kamery v souladu s pravidly na ochranu osobních údajů [OVĚŘIT]. Model [DOPLNIT].',
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
  // Zařízení z prompty/04-iot-budovy.md (codecom), poznámky [OVĚŘIT] převzaté odtud.
  { klic: 'danfoss-ally', nazev: 'Danfoss Ally, termostatická hlavice', jednotka: 'ks', kategorie: 'Úspora vytápění', popis: 'Hlavice na radiátor řízená bránou v budově podle plánu.', prinos: 'Při ztrátě spojení drží nastavenou teplotu.', standard: 'Zigbee, přímo k bráně bez Ally Gateway', bezInternetu: 'ano', poznamka: 'Funkce otevřeného okna a předehřevu v hlavici [OVĚŘIT]. Chování přes ZHA [OVĚŘIT].' },
  { klic: 'shelly-blu-trv', nazev: 'Shelly BLU TRV, termostatická hlavice', jednotka: 'ks', kategorie: 'Úspora vytápění', popis: 'Varianta hlavice s nejlépe doloženým místním ovládáním.', prinos: 'Topí podle plánu i bez cloudu.', standard: 'Bluetooth LE přes Shelly BLU Gateway Gen3', bezInternetu: 'ano' },
  { klic: 'nuki-pro', nazev: 'Nuki Smart Lock Pro 5. generace', jednotka: 'ks', kategorie: 'Přístup a rezervace', popis: 'Motorický zámek na vložku s nouzovou funkcí.', prinos: 'Časový kód z rezervace, mechanický klíč zůstává.', standard: 'Matter, nebo místně přes Nuki Bridge API', bezInternetu: 'overit', poznamka: 'Místní API a to, zda kódy fungují bez cloudu [OVĚŘIT].' },
  { klic: 'nuki-keypad', nazev: 'Nuki Keypad 2.0', jednotka: 'ks', kategorie: 'Přístup a rezervace', popis: 'Klávesnice u dveří k zámku Nuki.', prinos: 'Nájemce sálu zadá kód, nikdo nepředává klíče.', standard: 'Bluetooth k zámku Nuki [OVĚŘIT]', bezInternetu: 'overit', poznamka: 'Zda kódy fungují bez cloudu [OVĚŘIT].' },
  { klic: 'salto-ks', nazev: 'Salto KS, cloudová varianta', jednotka: 'ks', kategorie: 'Přístup a rezervace', popis: 'Přístupový systém jen s předplatným. Není výchozí volba.', prinos: 'Pro budovy, kde ho obec už má.', standard: 'Cloud Salto', bezInternetu: 'ne', poznamka: 'Závisí na cloudu výrobce. Místní API a chování bez internetu [OVĚŘIT].' },
  { klic: 'shelly-pro-em', nazev: 'Shelly Pro EM nebo Pro 3EM, elektroměr do rozvaděče', jednotka: 'ks', kategorie: 'Hlídání energií', popis: 'Měří spotřebu elektřiny budovy, Pro 3EM ve třech fázích.', prinos: 'Spotřeba po budovách a porovnání s minulým obdobím.', standard: 'LAN, místní API', bezInternetu: 'ano' },
  { klic: 'cidlo-teploty', nazev: 'Čidlo teploty a vlhkosti', jednotka: 'ks', kategorie: 'Čidla', popis: 'Měří teplotu a vlhkost v místnosti.', prinos: 'Upozorní na mráz v budově.', standard: 'Zigbee', bezInternetu: 'ano', poznamka: 'Konkrétní model [DOPLNIT].' },
  { klic: 'cidlo-co2', nazev: 'Čidlo CO2', jednotka: 'ks', kategorie: 'Čidla', popis: 'Měří CO2 ve třídě, sále nebo kanceláři.', prinos: 'Ukáže, kdy je potřeba vyvětrat.', standard: 'Zigbee', bezInternetu: 'ano', poznamka: 'Konkrétní model [DOPLNIT].' },
  { klic: 'cidlo-zaplaveni', nazev: 'Čidlo zaplavení', jednotka: 'ks', kategorie: 'Čidla', popis: 'Pod kotlem nebo u vodoměru.', prinos: 'Hned hlásí únik vody.', standard: 'Zigbee', bezInternetu: 'ano', poznamka: 'Konkrétní model [DOPLNIT].' },
  { klic: 'kontakt-okna', nazev: 'Kontakt okna', jednotka: 'ks', kategorie: 'Čidla', popis: 'Hlídá otevřené okno.', prinos: 'Při otevřeném okně zavře hlavici, po zavření vrátí topení.', standard: 'Zigbee', bezInternetu: 'ano', poznamka: 'Konkrétní model [DOPLNIT].' },
  { klic: 'mini-pc', nazev: 'Mini PC s Home Assistant OS', jednotka: 'ks', kategorie: 'Brána a sítě', popis: 'Brána budovy, běží na ní agent CodeKom.', prinos: 'Vykonává plán topení, protimrazovou ochranu a platnost kódů i bez internetu.', standard: 'LAN, ven šifrovaně přes MQTT s TLS', bezInternetu: 'ano', poznamka: 'Konkrétní model [DOPLNIT].' },
  { klic: 'zbt-2', nazev: 'Home Assistant Connect ZBT-2', jednotka: 'ks', kategorie: 'Brána a sítě', popis: 'Rádio do brány pro hlavice a čidla.', prinos: 'Zařízení v budově mluví s bránou bez cloudu.', standard: 'Zigbee, Thread', bezInternetu: 'ano', poznamka: 'Zda pracuje současně v Zigbee i Thread [OVĚŘIT].' },
  // Webkamery: nabídka podle zakladatele z 5. 11. 2026, model a cena zatím [DOPLNIT].
  { klic: 'webkamera', nazev: 'Venkovní webkamera pro web obce', jednotka: 'ks', kategorie: 'Webkamery', popis: 'Kamera na obecní budově pravidelně posílá snímek na web obce: náves, sníh na silnici nebo hladinu potoka.', prinos: 'Občané vidí aktuální stav bez telefonování na úřad. Starosta ji vidí i v řídicím panelu.', standard: 'LAN nebo PoE k bráně v budově [OVĚŘIT]', bezInternetu: 'overit', poznamka: 'Konkrétní model [DOPLNIT]. Na web obce snímek bez internetu nedojde, zda v budově nahrává dál [OVĚŘIT]. Záběr jen na veřejný prostor, obličeje a SPZ rozmazané před zveřejněním, informační tabulka u kamery a posouzení podle GDPR [OVĚŘIT].' },
  { klic: 'webkamera-ptz', nazev: 'Otočná webkamera s přiblížením', jednotka: 'ks', kategorie: 'Webkamery', popis: 'Kamera, kterou úřad z řídicího panelu natočí a přiblíží, např. na křižovatku nebo vodočet.', prinos: 'Jedna kamera pohlídá víc míst. Na web jde vždy jen schválený záběr.', standard: 'LAN nebo PoE k bráně v budově [OVĚŘIT]', bezInternetu: 'overit', poznamka: 'Konkrétní model [DOPLNIT]. Pravidla zveřejnění záběrů jako u webkamery pro web obce [OVĚŘIT].' },
  { klic: 'blu-gateway', nazev: 'Shelly BLU Gateway Gen3', jednotka: 'ks', kategorie: 'Brána a sítě', popis: 'Propojí hlavice Shelly BLU TRV s bránou.', prinos: 'Místní ovládání hlavic Shelly.', standard: 'Bluetooth LE, Wi-Fi', bezInternetu: 'ano' },
]

export interface PausalVolani {
  klic: string
  nazev: string
  mesicne: number
  sekund: number
  dalsiSekunda: number
}

/**
 * AI hlasový bot na telefonní lince, účtuje se po sekundách.
 * Odhad ceny viz docs/odhad-hlasovy-bot.md (4. 11. 2026).
 */
export const HLASOVY_BOT = {
  zaSekundu: 0.15,
  /** Průměrná délka hovoru v sekundách pro přepočet na počet hovorů. */
  delkaHovoru: 120,
  /** Pravidla hovoru: čl. 50 AI Actu a pravidlo „Úřad je fallback“ z CLAUDE.md codecom. */
  pravidla: [
    'Na začátku každého hovoru řekne, že je umělá inteligence (čl. 50 AI Actu).',
    'Odpovídá jen z dokumentů a údajů dané obce.',
    'Na přání volajícího, nebo když si neví rady, přepojí hovor na pracovníka úřadu.',
    'Mimo úřední hodiny řekne úřední hodiny a telefon úřadu, aby se volající mohl ozvat člověku.',
  ],
  pausaly: [
    { klic: 'maly', nazev: 'Malý', mesicne: 490, sekund: 6000, dalsiSekunda: 0.12 },
    { klic: 'stredni', nazev: 'Střední', mesicne: 1290, sekund: 18000, dalsiSekunda: 0.1 },
    { klic: 'velky', nazev: 'Velký', mesicne: 2990, sekund: 48000, dalsiSekunda: 0.08 },
  ] satisfies PausalVolani[],
}

/** Cena za sekundu při vyčerpání paušálu, zaokrouhlená na tisíciny koruny. */
export const cenaSekundyPausalu = (p: PausalVolani) => Math.round((p.mesicne / p.sekund) * 1000) / 1000

/** Cena za sekundu vždy aspoň na haléře: 0,10 Kč, 0,082 Kč. */
export const kcSekunda = (n: number) => `${n.toLocaleString('cs-CZ', { minimumFractionDigits: 2, maximumFractionDigits: 3 })}${String.fromCharCode(160)}Kč`

/** Číslo s českým oddělovačem tisíců a pevnou mezerou. */
export const cislo = (n: number) => n.toLocaleString('cs-CZ').replace(/\s/g, String.fromCharCode(160))

const NBSP = String.fromCharCode(160)
export const kc = (n: number) => `${n.toLocaleString('cs-CZ').replace(/\s/g, NBSP)}${NBSP}Kč`

export const DOPLNKOVE_SLUZBY = [
  {
    nazev: 'Hodinová sazba experta',
    cena: `${HODINOVKA_EXPERTA} Kč / hodina`,
    popis: 'Zakázkové grafické úpravy, asistence s obsahem, konzultace přístupnosti a individuální práce nad rámec běžné podpory.',
  },
  {
    nazev: 'AI hlasový bot na telefonní lince',
    cena: `${kcSekunda(HLASOVY_BOT.zaSekundu)} / sekunda nebo paušál od ${kc(HLASOVY_BOT.pausaly[0]!.mesicne)}`,
    popis: 'Hlasový bot, který odpovídá na hovory obce. Účtuje se po sekundách hovoru, s paušálem je sekunda levnější.',
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

/** Nejlevnější varianta hlasového bota pro daný počet sekund hovorů za měsíc (celé koruny). */
export function cenaHlasovehoBota(sekund: number): { nazev: string; cena: number } {
  const s = Math.max(0, Math.floor(sekund))
  const varianty = [
    { nazev: 'bez paušálu', cena: s * HLASOVY_BOT.zaSekundu },
    ...HLASOVY_BOT.pausaly.map((p) => ({ nazev: `paušál ${p.nazev}`, cena: p.mesicne + Math.max(0, s - p.sekund) * p.dalsiSekunda })),
  ]
  const nej = varianty.reduce((a, b) => (b.cena < a.cena ? b : a))
  return { nazev: nej.nazev, cena: Math.round(nej.cena) }
}

/** Kalkulačka nabízí i obce nad 10 000 obyvatel: měsíční cenu pro ně pošleme v nabídce. */
export const VELIKOSTI_KALKULACKY = [...VELIKOSTI, { klic: 'nad10000', nazev: 'nad 10 000 obyvatel' }] as const
export const jeNaMiru = (velikost: number) => velikost >= VELIKOSTI.length

/** Jednorázově: nasazení podle úrovně a hodiny práce experta. */
export function spocitejJednorazove(uroven: KlicUrovne, hodinyExperta: number): number {
  return POPLATEK_NASAZENI[uroven] + Math.max(0, Math.floor(hodinyExperta)) * HODINOVKA_EXPERTA
}

export function spocitej(velikost: number, uroven: KlicUrovne, urad: boolean, budovy: number): number {
  const v = Math.min(2, Math.max(0, velikost))
  return CENY_WEBU[uroven][v]! + (urad ? CENA_URADU[v]! : 0) + Math.max(0, Math.floor(budovy)) * CENA_BUDOVY
}
