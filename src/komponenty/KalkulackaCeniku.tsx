'use client'
import { useState } from 'react'
import {
  HODINOVKA_EXPERTA,
  POPLATEK_NASAZENI,
  STITEK_CENY,
  VELIKOSTI,
  kc,
  spocitej,
  type KlicUrovne,
} from '@/lib/cenik'

const UROVNE: { klic: KlicUrovne; nazev: string }[] = [
  { klic: 'zaklad', nazev: 'Základ' },
  { klic: 'pokrocily', nazev: 'Pokročilý' },
  { klic: 'advance', nazev: 'Advance' },
]

const poleInput =
  'mt-2 block min-h-12 w-full rounded-2xl border border-linka bg-white px-4 text-[16px] text-text transition-all focus:border-akcent-tmavy focus:outline-none focus:ring-2 focus:ring-akcent-tmavy/20'

export function KalkulackaCeniku() {
  const [velikost, setVelikost] = useState(0)
  const [uroven, setUroven] = useState<KlicUrovne>('zaklad')
  const [urad, setUrad] = useState(false)
  const [budovy, setBudovy] = useState(0)

  const mesicniCena = spocitej(velikost, uroven, urad, budovy)
  const poplatekNasazeni = POPLATEK_NASAZENI[uroven]

  return (
    <div className="sklo-svetle my-8 overflow-hidden rounded-3xl border border-white/80 p-6 md:p-8">
      <div className="grid gap-8 lg:grid-cols-12">
        <div className="grid gap-5 lg:col-span-7">
          <label className="block font-medium text-text">
            Velikost obce
            <select
              className={poleInput}
              value={velikost}
              onChange={(e) => setVelikost(Number(e.target.value))}
            >
              {VELIKOSTI.map((v, i) => (
                <option key={v.klic} value={i}>
                  {v.nazev}
                </option>
              ))}
            </select>
          </label>

          <label className="block font-medium text-text">
            Úroveň webu
            <select
              className={poleInput}
              value={uroven}
              onChange={(e) => setUroven(e.target.value as KlicUrovne)}
            >
              {UROVNE.map((u) => (
                <option key={u.klic} value={u.klic}>
                  {u.nazev}
                </option>
              ))}
            </select>
          </label>

          <fieldset>
            <legend className="font-medium text-text">Digitální úřad</legend>
            <div className="mt-2 flex gap-6">
              {[
                [false, 'Ne'],
                [true, 'Ano'],
              ].map(([h, t]) => (
                <label key={String(t)} className="inline-flex min-h-11 cursor-pointer items-center gap-2.5">
                  <input
                    type="radio"
                    name="urad"
                    className="size-5 accent-noc"
                    checked={urad === h}
                    onChange={() => setUrad(h as boolean)}
                  />
                  <span className="text-[16px]">{t}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <label className="block font-medium text-text">
            Počet budov s modulem Chytré budovy
            <input
              type="number"
              min={0}
              max={50}
              inputMode="numeric"
              className={poleInput}
              value={budovy}
              onChange={(e) =>
                setBudovy(Math.max(0, Math.min(50, Number(e.target.value) || 0)))
              }
            />
          </label>
        </div>

        <div className="na-tmave flex flex-col justify-between rounded-2xl bg-noc p-6 text-white lg:col-span-5">
          <div aria-live="polite">
            <span className="text-[14px] uppercase tracking-wider text-sediva-tma font-semibold">
              Pravidelný provoz
            </span>
            <span className="mt-1 block text-sediva-tma">Orientačně od</span>
            <span
              className="block text-[42px] font-extrabold leading-tight text-white"
              style={{ fontFamily: 'var(--font-nadpis)' }}
            >
              {kc(mesicniCena)}
            </span>
            <span className="block text-[15px] text-white/80">měsíčně bez DPH</span>

            <div className="mt-6 border-t border-white/10 pt-4">
              <span className="text-[13px] uppercase tracking-wider text-sediva-tma font-semibold">
                Zavedení a spuštění
              </span>
              <p className="mt-1 text-[17px] font-semibold text-white">
                od {kc(poplatekNasazeni)} jednorázově
              </p>
              <p className="text-[13px] text-sediva-tma">
                nastavení šablony, napojení domény, základní migrace a zaškolení
              </p>
            </div>

            <div className="mt-4 border-t border-white/10 pt-4">
              <span className="text-[13px] uppercase tracking-wider text-sediva-tma font-semibold">
                Práce experta na míru
              </span>
              <p className="mt-1 text-[16px] font-semibold text-white">
                {HODINOVKA_EXPERTA} Kč / hodina
              </p>
              <p className="text-[13px] text-sediva-tma">
                pro individuální zakázkové úpravy, grafiku či dotační konzultace
              </p>
            </div>
          </div>

          <p className="stitek mt-6 border-t border-white/10 pt-4 text-[13px] text-sediva-tma">
            {STITEK_CENY}
          </p>
        </div>
      </div>
    </div>
  )
}
