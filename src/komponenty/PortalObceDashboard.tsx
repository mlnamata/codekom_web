'use client'

import { useState } from 'react'

/** Typ pro aktivní sekci boční navigace */
type NavigacniPolozka =
  | 'aktuality'
  | 'uredni-deska'
  | 'samosprava'
  | 'portal-obcana'
  | 'hlaseni-zavad'
  | 'gis-mapy'
  | 'pujcovna'
  | 'iot-senzory'
  | 'bazar'
  | 'odpady'

interface PolozkaDesky {
  id: string
  nazev: string
  datum: string
  stitek: string
  barva: string
}

interface ZavadaBod {
  id: string
  nazev: string
  stav: 'reseno' | 'nove' | 'hotovo'
  x: number
  y: number
  popis: string
}

const DESKA_POLOZKY: PolozkaDesky[] = [
  { id: '1', nazev: 'Záměr směny obecního pozemku parc. č. 182/4', datum: '28. 11. 2025', stitek: 'Záměr', barva: 'bg-amber-100 text-amber-900' },
  { id: '2', nazev: 'Obecně závazná vyhláška o místních poplatcích', datum: '28. 11. 2025', stitek: 'Vyhláška', barva: 'bg-blue-100 text-blue-900' },
  { id: '3', nazev: 'Návrh rozpočtu obce Veselá pro rok 2026', datum: '28. 11. 2025', stitek: 'Rozpočet', barva: 'bg-emerald-100 text-emerald-900' },
  { id: '4', nazev: 'Opatření obecné povahy – přechodná úprava provozu', datum: '28. 11. 2025', stitek: 'Doprava', barva: 'bg-purple-100 text-purple-900' },
  { id: '5', nazev: 'Pozvánka na 18. veřejné zasedání zastupitelstva', datum: '28. 11. 2025', stitek: 'Jednání', barva: 'bg-slate-100 text-slate-900' },
]

const BODY_ZAVAD: ZavadaBod[] = [
  { id: 'z1', nazev: 'Nesvítící lampa VO č. 14', stav: 'nove', x: 28, y: 34, popis: 'Nesvítí pouliční lampa u křižovatky v Nových domcích.' },
  { id: 'z2', nazev: 'Výtluk na krajnici', stav: 'reseno', x: 58, y: 46, popis: 'Hluboká díra u nájezdu k rybníku, předáno technickým službám.' },
  { id: 'z3', nazev: 'Zlomená větev na chodníku', stav: 'hotovo', x: 74, y: 62, popis: 'Po silném větru, odstraněno jednotkou SDH.' },
  { id: 'z4', nazev: 'Sypač Traktor 01 (aktivní trasa)', stav: 'reseno', x: 44, y: 22, popis: 'Komunální technika právě protahuje ulici K Lesu.' },
]

const KALENDAR_AKCI = [
  { den: '18. nov', nazev: 'Setkání občanů s vedením obce', misto: 'Sál obecního úřadu' },
  { den: '25. nov', nazev: 'Slavnostní rozsvícení vánočního stromu', misto: 'Náves u kapličky' },
  { den: '28. nov', nazev: '18. zasedání zastupitelstva obce', misto: 'Zasedací místnost' },
  { den: '30. nov', nazev: 'Sousedská brigáda v obecním sadu', misto: 'Sraz u hasičárny' },
  { den: '5. pro', nazev: 'Mikulášská nadílka pro děti', misto: 'Kulturní dům' },
  { den: '12. pro', nazev: 'Svoz nebezpečného a velkého odpadu', misto: 'Sběrný dvůr' },
]

/**
 * Interaktivní komponenta vizuálního návrhu portálu obce (podle předlohy Veselá / Javoří Lhota).
 * Zobrazuje tmavý skleněný rám, levou navigaci a 6 bento widgetů s reálnou interaktivitou.
 */
export function PortalObceDashboard() {
  const [aktivniSekce, setAktivniSekce] = useState<NavigacniPolozka>('portal-obcana')
  const [vybranaZavada, setVybranaZavada] = useState<ZavadaBod | null>(BODY_ZAVAD[0] ?? null)
  const [dialogPlatba, setDialogPlatba] = useState(false)
  const [dialogNahlaseni, setDialogNahlaseni] = useState(false)
  const [dialogRezervace, setDialogRezervace] = useState(false)
  const [hledanyText, setHledanyText] = useState('')
  const [hlaseniOdeslano, setHlaseniOdeslano] = useState(false)
  const [rezervaceOdeslana, setRezervaceOdeslana] = useState(false)

  return (
    <div className="na-tmave relative isolate overflow-hidden rounded-3xl border border-white/15 bg-[#070c1a] text-white shadow-[0_24px_80px_rgba(0,0,0,0.65)]">
      {/* Horní lišta portálu */}
      <div className="border-b border-white/10 bg-[#0a1329]/95 px-4 py-3 backdrop-blur-md md:px-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Logo a název obce se znakem */}
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-emerald-600 p-0.5 shadow-md">
              <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-[#070c1a]">
                <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 text-amber-400" aria-hidden="true">
                  <path d="M12 2L4 5V11C4 16.5 7.4 21.6 12 23C16.6 21.6 20 16.5 20 11V5L12 2Z" fill="currentColor" fillOpacity="0.25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M12 7V17M8 11H16" stroke="#10b981" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-emerald-400">Oficiální informační systém</p>
              <h3 className="!text-white text-[17px] font-bold tracking-tight md:text-[20px]">PORTÁL OBCE VESELÁ</h3>
            </div>
          </div>

          {/* Vyhledávací pole */}
          <div className="order-3 w-full sm:order-2 sm:w-auto sm:flex-1 sm:max-w-xs md:max-w-sm">
            <label htmlFor="portal-hledani" className="sr-only">
              Vyhledat na portálu obce
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-white/50">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                id="portal-hledani"
                type="search"
                value={hledanyText}
                onChange={(e) => setHledanyText(e.target.value)}
                placeholder="Vyhledat formulář, poplatek, vyhlášku..."
                className="w-full rounded-xl border border-white/10 bg-white/5 py-2 pl-9 pr-3 text-[13px] text-white placeholder-white/40 backdrop-blur-sm transition focus:border-emerald-400 focus:bg-white/10 focus:outline-none focus:ring-1 focus:ring-emerald-400"
              />
            </div>
          </div>

          {/* Přihlášení přes BankID a živé senzory */}
          <div className="order-2 flex items-center gap-2.5 sm:order-3">
            {/* Tlačítko BankID */}
            <button
              type="button"
              onClick={() => alert('Ukázka přihlášení: V produkci probíhá ověření přes BankID nebo Identitu občana (NIA) bezpečně bez nutnosti pamatovat si heslo.')}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-emerald-800 px-3.5 py-2 text-[13px] font-bold text-white shadow-sm transition hover:bg-emerald-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <span>Přihlášení (BankID)</span>
            </button>

            {/* Živý widget prostředí */}
            <div className="hidden rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-[12px] text-white/90 lg:flex lg:items-center lg:gap-3">
              <span className="flex items-center gap-1.5 font-medium text-amber-300">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                12 °C
              </span>
              <span className="h-3 w-px bg-white/20" aria-hidden="true" />
              <span className="flex items-center gap-1.5 font-medium text-emerald-300">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                Ovzduší: Dobré
              </span>
              <span className="h-3 w-px bg-white/20" aria-hidden="true" />
              <span className="flex items-center gap-1.5 font-medium text-sky-300">
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
                Potok: Normální
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tělo portálu: levý panel + hlavní plocha */}
      <div className="flex flex-col lg:flex-row">
        {/* Levý postranní navigační sloupec */}
        <div
          aria-label="Navigace portálu obce"
          className="w-full shrink-0 border-b border-white/10 bg-[#080f24] p-3 lg:w-64 lg:border-b-0 lg:border-r lg:p-4"
        >
          <div className="flex flex-row flex-wrap gap-1 lg:flex-col">
            {[
              { id: 'aktuality', nazev: 'Aktuality', ikona: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z' },
              { id: 'uredni-deska', nazev: 'Úřední deska', ikona: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
              { id: 'samosprava', nazev: 'Samospráva', ikona: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
              { id: 'portal-obcana', nazev: 'Portál občana (Poplatky)', ikona: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z' },
              { id: 'hlaseni-zavad', nazev: 'Hlášení závad', ikona: 'M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z' },
              { id: 'gis-mapy', nazev: 'Katastr a GIS mapy', ikona: 'M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7' },
              { id: 'pujcovna', nazev: 'Obecní půjčovna', ikona: 'M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z' },
              { id: 'iot-senzory', nazev: 'IoT a Senzory', ikona: 'M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z' },
              { id: 'bazar', nazev: 'Sousedský bazar', ikona: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
              { id: 'odpady', nazev: 'Odpadové hospodářství', ikona: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15' },
            ].map((polozka) => {
              const jeAktivni = aktivniSekce === polozka.id
              return (
                <button
                  key={polozka.id}
                  type="button"
                  onClick={() => setAktivniSekce(polozka.id as NavigacniPolozka)}
                  className={`flex min-h-[44px] items-center gap-2.5 rounded-xl px-3 py-2 text-left text-[13px] font-medium transition ${
                    jeAktivni
                      ? 'bg-emerald-600/20 text-emerald-300 shadow-sm ring-1 ring-emerald-500/40'
                      : 'text-white/70 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <svg className={`h-4 w-4 shrink-0 ${jeAktivni ? 'text-emerald-400' : 'text-white/50'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={polozka.ikona} />
                  </svg>
                  <span className="truncate">{polozka.nazev}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Hlavní obsahová bento plocha se 6 widgety */}
        <div className="flex-1 bg-[#0a142c] p-4 md:p-6">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {/* 1. KARTA: Portál občana a poplatky */}
            <article className="flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0e1b3d] shadow-lg">
              <div className="border-b border-white/10 bg-[#12234f] px-4 py-3">
                <h4 className="!text-white text-[15px] font-bold">Portál občana a poplatky</h4>
              </div>
              <div className="flex flex-1 flex-col justify-between bg-white p-4 !text-slate-900">
                <div>
                  <button
                    type="button"
                    onClick={() => setDialogPlatba(true)}
                    className="flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl bg-emerald-800 px-4 py-2.5 text-[14px] font-bold text-white shadow transition hover:bg-emerald-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                    Zaplatit poplatek online
                  </button>

                  <div className="mt-4">
                    <p className="text-[12px] font-bold uppercase tracking-wider text-slate-700">Platby za odpady a psy</p>
                    <ul className="mt-2 divide-y divide-slate-100 text-[13px]">
                      <li className="flex items-center justify-between py-2">
                        <span className="font-medium text-slate-800">Poplatek za svoz odpadu 2025</span>
                        <span className="font-semibold text-emerald-900">850 Kč</span>
                      </li>
                      <li className="flex items-center justify-between py-2">
                        <span className="font-medium text-slate-800">Místní poplatek ze psů (1 pes)</span>
                        <span className="font-semibold text-emerald-900">200 Kč</span>
                      </li>
                    </ul>
                  </div>

                  <div className="mt-3 border-t border-slate-100 pt-3">
                    <p className="text-[12px] font-bold uppercase tracking-wider text-slate-700">Platby online</p>
                    <ul className="mt-2 space-y-1.5 text-[13px]">
                      <li>
                        <button
                          type="button"
                          onClick={() => setDialogPlatba(true)}
                          className="flex min-h-[44px] w-full items-center justify-between rounded-lg p-2 text-left font-medium text-slate-800 hover:bg-slate-50"
                        >
                          <span>Platba poplatku za psa</span>
                          <span className="text-slate-400" aria-hidden="true">&gt;</span>
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          onClick={() => setDialogPlatba(true)}
                          className="flex min-h-[44px] w-full items-center justify-between rounded-lg p-2 text-left font-medium text-slate-800 hover:bg-slate-50"
                        >
                          <span>Platba svozu bioodpadu</span>
                          <span className="text-slate-400" aria-hidden="true">&gt;</span>
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          onClick={() => setDialogPlatba(true)}
                          className="flex min-h-[44px] w-full items-center justify-between rounded-lg p-2 text-left font-medium text-slate-800 hover:bg-slate-50"
                        >
                          <span>Generovat platbu QR kódem</span>
                          <span className="text-slate-400" aria-hidden="true">&gt;</span>
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>

                <p className="mt-3 text-[11px] text-slate-600">
                  Peníze jdou přímo na účet obce. CodeKom peníze nikdy nedrží.
                </p>
              </div>
            </article>

            {/* 2. KARTA: Elektronická úřední deska */}
            <article className="flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0e1b3d] shadow-lg">
              <div className="border-b border-white/10 bg-[#12234f] px-4 py-3">
                <h4 className="!text-white text-[15px] font-bold">Elektronická úřední deska</h4>
              </div>
              <div className="flex flex-1 flex-col justify-between bg-white p-4 !text-slate-900">
                <ul className="divide-y divide-slate-100 text-[13px]">
                  {DESKA_POLOZKY.map((pol) => (
                    <li key={pol.id} className="py-2.5 first:pt-0 last:pb-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="font-semibold leading-snug text-slate-900 hover:text-emerald-800">
                            {pol.nazev}
                          </p>
                          <p className="mt-0.5 text-[11px] text-slate-600">Vyvěšeno: {pol.datum}</p>
                        </div>
                        <span className={`shrink-0 rounded-md px-2 py-0.5 text-[11px] font-bold ${pol.barva}`}>
                          {pol.stitek}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="mt-4 border-t border-slate-100 pt-3">
                  <p className="text-[11px] text-slate-600">
                    Dokument, který visel na desce, nejde smazat. Evidence lhůt podle vyhlášky č. 515/2020 Sb.
                  </p>
                </div>
              </div>
            </article>

            {/* 3. KARTA: Mapa hlášení závad */}
            <article className="flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0e1b3d] shadow-lg">
              <div className="border-b border-white/10 bg-[#12234f] px-4 py-3">
                <h4 className="!text-white text-[15px] font-bold">Mapa hlášení závad a údržby</h4>
              </div>
              <div className="flex flex-1 flex-col justify-between bg-white p-4 !text-slate-900">
                {/* Interaktivní vektorová mapa obce */}
                <div>
                  <div className="relative h-44 w-full overflow-hidden rounded-xl border border-slate-200 bg-[#eef7ee]">
                    {/* Řeka a potok */}
                    <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 100" aria-hidden="true">
                      {/* Louky a lesy */}
                      <rect x="0" y="0" width="100" height="100" fill="#f0fdf4" />
                      <path d="M0 65 Q 30 75, 60 55 T 100 70 L 100 100 L 0 100 Z" fill="#dcfce7" opacity="0.6" />
                      {/* Potok */}
                      <path d="M0 45 Q 35 30, 65 60 T 100 50" fill="none" stroke="#7dd3fc" strokeWidth="3.5" strokeLinecap="round" />
                      {/* Silniční síť */}
                      <path d="M10 0 L 35 100 M 0 35 L 100 40 M 35 60 L 90 10 M 20 80 L 80 85" fill="none" stroke="#cbd5e1" strokeWidth="3" strokeLinecap="round" />
                      {/* Zástavba / parcely */}
                      <rect x="25" y="25" width="8" height="6" fill="#fecaca" stroke="#f87171" strokeWidth="0.5" />
                      <rect x="36" y="28" width="7" height="6" fill="#fef08a" stroke="#eab308" strokeWidth="0.5" />
                      <rect x="48" y="22" width="9" height="7" fill="#fed7aa" stroke="#f97316" strokeWidth="0.5" />
                      <rect x="65" y="65" width="10" height="8" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="0.5" />
                    </svg>

                    {/* Ovládací prvky mapy (+ / -) */}
                    <div className="absolute left-2 top-2 flex flex-col gap-1">
                      <span className="flex h-6 w-6 items-center justify-center rounded bg-white text-[12px] font-bold text-slate-700 shadow">
                        +
                      </span>
                      <span className="flex h-6 w-6 items-center justify-center rounded bg-white text-[12px] font-bold text-slate-700 shadow">
                        -
                      </span>
                    </div>

                    {/* GPS špendlíky závad */}
                    {BODY_ZAVAD.map((bod) => {
                      const jeVybrany = vybranaZavada?.id === bod.id
                      const barvaPinu =
                        bod.stav === 'nove'
                          ? 'bg-rose-500 ring-rose-300'
                          : bod.stav === 'reseno'
                          ? 'bg-amber-500 ring-amber-300'
                          : 'bg-emerald-600 ring-emerald-300'
                      return (
                        <button
                          key={bod.id}
                          type="button"
                          onClick={() => setVybranaZavada(bod)}
                          style={{ left: `${bod.x}%`, top: `${bod.y}%` }}
                          aria-label={`Špendlík: ${bod.nazev}`}
                          className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full p-1.5 shadow-md ring-2 transition hover:scale-125 focus:scale-125 ${barvaPinu} ${
                            jeVybrany ? 'scale-125 ring-4' : ''
                          }`}
                        >
                          <span className="block h-2 w-2 rounded-full bg-white" />
                        </button>
                      )
                    })}
                  </div>

                  {/* Informace o vybraném bodu na mapě */}
                  {vybranaZavada ? (
                    <div className="mt-2.5 rounded-lg border border-slate-200 bg-slate-50 p-2 text-[12px]">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900">{vybranaZavada.nazev}</span>
                        <span
                          className={`rounded px-1.5 py-0.5 text-[10px] font-semibold ${
                            vybranaZavada.stav === 'nove'
                              ? 'bg-rose-100 text-rose-800'
                              : vybranaZavada.stav === 'reseno'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-emerald-100 text-emerald-800'
                          }`}
                        >
                          {vybranaZavada.stav === 'nove' ? 'Nové' : vybranaZavada.stav === 'reseno' ? 'V řešení' : 'Vyřešeno'}
                        </span>
                      </div>
                      <p className="mt-1 text-slate-700">{vybranaZavada.popis}</p>
                    </div>
                  ) : null}
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    onClick={() => setDialogNahlaseni(true)}
                    className="flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl bg-emerald-800 px-4 py-2.5 text-[14px] font-bold text-white shadow transition hover:bg-emerald-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Nahlásit závadu s fotkou
                  </button>
                </div>
              </div>
            </article>

            {/* 4. KARTA: Chytrá obec (IoT živá data) */}
            <article className="flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0e1b3d] shadow-lg">
              <div className="border-b border-white/10 bg-[#12234f] px-4 py-3">
                <h4 className="!text-white text-[15px] font-bold">Chytrá obec (IoT)</h4>
              </div>
              <div className="flex flex-1 flex-col justify-between bg-white p-4 !text-slate-900">
                <div className="space-y-3">
                  {/* Obsazenost parkovišť */}
                  <div className="flex items-center justify-between rounded-xl bg-slate-50 p-2.5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100 text-blue-800">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-[13px] font-semibold text-slate-900">Obsazenost parkovišť</p>
                        <p className="text-[11px] text-slate-600">Centrum u nádraží</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[16px] font-extrabold text-slate-900">12 / 50</p>
                      <p className="text-[10px] text-slate-600">volných míst</p>
                    </div>
                  </div>

                  {/* Poloha komunální techniky */}
                  <div className="flex items-center justify-between rounded-xl bg-slate-50 p-2.5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-100 text-emerald-800">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-[13px] font-semibold text-slate-900">Komunální technika</p>
                        <p className="text-[11px] text-slate-600">Zimní sypač v terénu</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[16px] font-extrabold text-slate-900">1 vůz</p>
                      <p className="text-[10px] text-slate-600">v provozu</p>
                    </div>
                  </div>

                  {/* Zaplněnost kontejnerů s barevným grafem */}
                  <div className="rounded-xl bg-slate-50 p-2.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <svg className="h-4 w-4 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        <span className="text-[13px] font-semibold text-slate-900">Zaplněnost kontejnerů</span>
                      </div>
                      <span className="text-[11px] font-bold text-slate-700">stav čidel</span>
                    </div>

                    {/* Sloupcový diagram jednotlivých komodit */}
                    <div className="mt-3 grid grid-cols-6 items-end gap-1.5 h-16 pt-2">
                      {[
                        { barva: 'bg-rose-500', vyska: 'h-8', label: 'Směs' },
                        { barva: 'bg-amber-500', vyska: 'h-14', label: 'Plast' },
                        { barva: 'bg-blue-600', vyska: 'h-10', label: 'Papír' },
                        { barva: 'bg-emerald-600', vyska: 'h-6', label: 'Sklo' },
                        { barva: 'bg-amber-800', vyska: 'h-13', label: 'Bio' },
                        { barva: 'bg-purple-700', vyska: 'h-5', label: 'Kov' },
                      ].map((sloupec) => (
                        <div key={sloupec.label} className="flex flex-col items-center gap-1">
                          <div className={`w-full rounded-t-md ${sloupec.barva} ${sloupec.vyska} transition-all`} />
                          <span className="text-[9px] font-medium text-slate-600">{sloupec.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-3 border-t border-slate-100 pt-2 text-[11px] text-slate-600">
                  Přenos probíhá po síti LoRaWAN a NB-IoT s výdrží čidel až 5 let.
                </div>
              </div>
            </article>

            {/* 5. KARTA: Obecní půjčovna nářadí */}
            <article className="flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0e1b3d] shadow-lg">
              <div className="border-b border-white/10 bg-[#12234f] px-4 py-3">
                <h4 className="!text-white text-[15px] font-bold">Obecní půjčovna nářadí</h4>
              </div>
              <div className="flex flex-1 flex-col justify-between bg-white p-4 !text-slate-900">
                <div className="space-y-3">
                  {/* Položka 1: Přívěsný vozík */}
                  <div className="flex items-center gap-3 rounded-xl border border-slate-200 p-2.5">
                    <div className="flex h-14 w-16 shrink-0 items-center justify-center rounded-lg bg-slate-100 p-1">
                      <svg viewBox="0 0 48 32" fill="none" className="h-9 w-12 text-slate-600" aria-hidden="true">
                        <rect x="4" y="6" width="34" height="14" rx="2" fill="#94a3b8" />
                        <path d="M4 12H38" stroke="#cbd5e1" strokeWidth="1" />
                        <circle cx="21" cy="23" r="5" fill="#334155" stroke="#fff" strokeWidth="2" />
                        <path d="M38 16L46 19" stroke="#64748b" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[13px] font-bold text-slate-900">Přívěsný vozík Agados</p>
                      <p className="text-[11px] text-slate-600">Nosnost 750 kg, sklopný</p>
                      <p className="mt-0.5 text-[12px] font-semibold text-emerald-900">250 Kč / den</p>
                    </div>
                  </div>

                  {/* Položka 2: Štípačka na dřevo */}
                  <div className="flex items-center gap-3 rounded-xl border border-slate-200 p-2.5">
                    <div className="flex h-14 w-16 shrink-0 items-center justify-center rounded-lg bg-slate-100 p-1">
                      <svg viewBox="0 0 48 32" fill="none" className="h-9 w-12 text-slate-600" aria-hidden="true">
                        <rect x="12" y="4" width="8" height="22" rx="1" fill="#0284c7" />
                        <rect x="8" y="24" width="16" height="4" fill="#334155" />
                        <path d="M16 10L16 20" stroke="#f8fafc" strokeWidth="2" />
                        <rect x="26" y="12" width="14" height="14" rx="2" fill="#d97706" />
                      </svg>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[13px] font-bold text-slate-900">Štípačka dřeva 10 t</p>
                      <p className="text-[11px] text-slate-600">Hydraulická, motor 3 kW</p>
                      <p className="mt-0.5 text-[12px] font-semibold text-emerald-900">350 Kč / den</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    onClick={() => setDialogRezervace(true)}
                    className="flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl bg-emerald-800 px-4 py-2.5 text-[14px] font-bold text-white shadow transition hover:bg-emerald-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Rezervovat termín výpůjčky
                  </button>
                </div>
              </div>
            </article>

            {/* 6. KARTA: Kalendář akcí */}
            <article className="flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0e1b3d] shadow-lg">
              <div className="border-b border-white/10 bg-[#12234f] px-4 py-3">
                <h4 className="!text-white text-[15px] font-bold">Kalendář akcí v obci</h4>
              </div>
              <div className="flex flex-1 flex-col justify-between bg-white p-4 !text-slate-900">
                <ul className="space-y-2.5 text-[13px]">
                  {KALENDAR_AKCI.map((akce) => (
                    <li key={akce.nazev} className="flex items-start gap-2.5">
                      <span className="mt-0.5 block h-7 w-1 shrink-0 rounded-full bg-emerald-700" aria-hidden="true" />
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold leading-tight text-slate-900">{akce.nazev}</p>
                        <p className="mt-0.5 text-[11px] text-slate-600">
                          <span className="font-medium text-emerald-900">{akce.den}</span> | {akce.misto}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="mt-3 border-t border-slate-100 pt-3">
                  <p className="text-[11px] text-slate-600">
                    Akce spolků a obce se synchronizují s mobilní aplikací CodeKom.
                  </p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>

      {/* DIALOG: Ukázka QR platby */}
      {dialogPlatba ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="titul-platba"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
        >
          <div className="w-full max-w-md rounded-2xl border border-white/20 bg-[#0c1630] p-6 text-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h4 id="titul-platba" className="!text-white text-[17px] font-bold">
                Rychlá platba poplatku (QR kód)
              </h4>
              <button
                type="button"
                onClick={() => setDialogPlatba(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-white/70 hover:bg-white/10 hover:text-white"
                aria-label="Zavřít okno"
              >
                ✕
              </button>
            </div>
            <div className="mt-4 space-y-3 text-[14px]">
              <div className="flex justify-center p-3">
                <div className="rounded-xl bg-white p-3 shadow-inner">
                  {/* Simulace QR kódu pro platbu */}
                  <div className="flex h-36 w-36 flex-col items-center justify-center border-2 border-dashed border-slate-300 bg-slate-50 text-slate-700">
                    <svg className="h-16 w-16 text-slate-800" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M3 3h6v6H3V3zm2 2v2h2V5H5zm8-2h6v6h-6V3zm2 2v2h2V5h-2zM3 13h6v6H3v-6zm2 2v2h2v-2H5zm13-2h3v2h-3v-2zm-5 0h2v3h-2v-3zm3 3h3v3h-3v-3zm-3 2h2v2h-2v-2zm-5-2h2v2H7v-2zm8-10h2v2h-2V5zm-4 4h2v2h-2V9zm-2 2h2v2H9v-2zm2 2h2v2h-2v-2zm2-2h2v2h-2v-2z" />
                    </svg>
                    <span className="mt-1 text-[10px] font-bold uppercase tracking-wider text-slate-600">SPAYD QR KÓD</span>
                  </div>
                </div>
              </div>
              <div className="rounded-xl bg-white/5 p-3 text-[13px] space-y-1">
                <p><span className="text-white/60">Příjemce:</span> Obec Veselá</p>
                <p><span className="text-white/60">Účet:</span> 123456789/0800 (Česká spořitelna)</p>
                <p><span className="text-white/60">Částka:</span> 850 Kč</p>
                <p><span className="text-white/60">Variabilní symbol:</span> 13410042</p>
              </div>
              <p className="text-[12px] text-white/70">
                Peníze jdou z vaší banky přímo na bankovní účet obce. CodeKom není platební zprostředkovatel.
              </p>
            </div>
            <div className="mt-6">
              <button
                type="button"
                onClick={() => setDialogPlatba(false)}
                className="min-h-[44px] w-full rounded-xl bg-emerald-800 px-4 py-2 font-bold text-white hover:bg-emerald-900"
              >
                Rozumím, zavřít ukázku
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {/* DIALOG: Hlášení závady */}
      {dialogNahlaseni ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="titul-nahlaseni"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
        >
          <div className="w-full max-w-md rounded-2xl border border-white/20 bg-[#0c1630] p-6 text-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h4 id="titul-nahlaseni" className="!text-white text-[17px] font-bold">
                Nahlásit závadu v obci
              </h4>
              <button
                type="button"
                onClick={() => { setDialogNahlaseni(false); setHlaseniOdeslano(false); }}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-white/70 hover:bg-white/10 hover:text-white"
                aria-label="Zavřít hlášení"
              >
                ✕
              </button>
            </div>
            {hlaseniOdeslano ? (
              <div className="mt-6 text-center py-4">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                  ✓
                </div>
                <p className="mt-3 text-[16px] font-bold">Hlášení bylo předáno obci</p>
                <p className="mt-1 text-[13px] text-white/70">Přidělené evidenční číslo: #2025-084. Stav řešení můžete sledovat na mapě.</p>
                <button
                  type="button"
                  onClick={() => { setDialogNahlaseni(false); setHlaseniOdeslano(false); }}
                  className="mt-5 min-h-[44px] w-full rounded-xl bg-emerald-800 px-4 py-2 font-bold text-white hover:bg-emerald-900"
                >
                  Hotovo
                </button>
              </div>
            ) : (
              <div className="mt-4 space-y-3 text-[13px]">
                <div>
                  <label htmlFor="druh-zavady" className="block font-semibold text-white/90">Druh závady</label>
                  <select id="druh-zavady" className="mt-1 w-full rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-white">
                    <option className="bg-[#0c1630]">Veřejné osvětlení</option>
                    <option className="bg-[#0c1630]">Komunikace a chodníky</option>
                    <option className="bg-[#0c1630]">Zeleň a stromy</option>
                    <option className="bg-[#0c1630]">Černá skládka / plný kontejner</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="popis-zavady" className="block font-semibold text-white/90">Popis a upřesnění místa</label>
                  <textarea id="popis-zavady" rows={2} defaultValue="Nesvítí lampa na rohu u autobusové zastávky." className="mt-1 w-full rounded-lg border border-white/20 bg-white/10 p-2 text-white" />
                </div>
                <div className="rounded-lg border border-dashed border-white/30 p-3 text-center text-white/70">
                  <span className="text-[12px]">GPS poloha automaticky zaměřena (50.1234 N, 14.5678 E)</span>
                </div>
                <div className="mt-5 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setHlaseniOdeslano(true)}
                    className="min-h-[44px] flex-1 rounded-xl bg-emerald-800 px-4 py-2 font-bold text-white hover:bg-emerald-900"
                  >
                    Odeslat hlášení
                  </button>
                  <button
                    type="button"
                    onClick={() => setDialogNahlaseni(false)}
                    className="min-h-[44px] rounded-xl border border-white/20 px-4 py-2 text-white/80 hover:bg-white/10"
                  >
                    Zrušit
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : null}

      {/* DIALOG: Rezervace nářadí */}
      {dialogRezervace ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="titul-rezervace"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
        >
          <div className="w-full max-w-md rounded-2xl border border-white/20 bg-[#0c1630] p-6 text-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h4 id="titul-rezervace" className="!text-white text-[17px] font-bold">
                Rezervace obecního vybavení
              </h4>
              <button
                type="button"
                onClick={() => { setDialogRezervace(false); setRezervaceOdeslana(false); }}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-white/70 hover:bg-white/10 hover:text-white"
                aria-label="Zavřít rezervaci"
              >
                ✕
              </button>
            </div>
            {rezervaceOdeslana ? (
              <div className="mt-6 text-center py-4">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                  ✓
                </div>
                <p className="mt-3 text-[16px] font-bold">Rezervace byla odeslána ke schválení</p>
                <p className="mt-1 text-[13px] text-white/70">Potvrzení a kód pro vyzvednutí vám přijde do e-mailu po potvrzení správcem.</p>
                <button
                  type="button"
                  onClick={() => { setDialogRezervace(false); setRezervaceOdeslana(false); }}
                  className="mt-5 min-h-[44px] w-full rounded-xl bg-emerald-800 px-4 py-2 font-bold text-white hover:bg-emerald-900"
                >
                  Hotovo
                </button>
              </div>
            ) : (
              <div className="mt-4 space-y-3 text-[13px]">
                <div>
                  <label htmlFor="vyber-vybaveni" className="block font-semibold text-white/90">Zvolené vybavení</label>
                  <select id="vyber-vybaveni" className="mt-1 w-full rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-white">
                    <option className="bg-[#0c1630]">Přívěsný vozík Agados (250 Kč / den)</option>
                    <option className="bg-[#0c1630]">Štípačka na dřevo 10 t (350 Kč / den)</option>
                    <option className="bg-[#0c1630]">Párty stan 6x3 m s pivními sety (500 Kč / víkend)</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="datum-vypujcky" className="block font-semibold text-white/90">Termín výpůjčky</label>
                  <input type="text" id="datum-vypujcky" defaultValue="Pátek 28. 11. až Neděle 30. 11. 2025" className="mt-1 w-full rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-white" />
                </div>
                <p className="text-[12px] text-white/70">
                  Předání probíhá na sběrném dvoře obce po předložení občanského průkazu nebo ověření v aplikaci.
                </p>
                <div className="mt-5 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setRezervaceOdeslana(true)}
                    className="min-h-[44px] flex-1 rounded-xl bg-emerald-800 px-4 py-2 font-bold text-white hover:bg-emerald-900"
                  >
                    Odeslat rezervaci
                  </button>
                  <button
                    type="button"
                    onClick={() => setDialogRezervace(false)}
                    className="min-h-[44px] rounded-xl border border-white/20 px-4 py-2 text-white/80 hover:bg-white/10"
                  >
                    Zrušit
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  )
}
