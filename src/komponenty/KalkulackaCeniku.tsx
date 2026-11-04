'use client'
import { useState, type ChangeEvent } from 'react'
import {
  HODINOVKA_EXPERTA,
  POPLATEK_NASAZENI,
  STITEK_CENY,
  cenaHlasovehoBota,
  VELIKOSTI_KALKULACKY,
  jeNaMiru,
  kc,
  spocitej,
  spocitejJednorazove,
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
  const [hodiny, setHodiny] = useState(0)
  const [sekundy, setSekundy] = useState(0)

  const naMiru = jeNaMiru(velikost)
  const mesicniCena = spocitej(velikost, uroven, urad, budovy)
  const jednorazove = spocitejJednorazove(uroven, hodiny)
  const bot = cenaHlasovehoBota(sekundy)
  const cislo = (max: number, set: (n: number) => void) => (e: ChangeEvent<HTMLInputElement>) =>
    set(Math.max(0, Math.min(max, Math.floor(Number(e.target.value)) || 0)))

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
              {VELIKOSTI_KALKULACKY.map((v, i) => (
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
              onChange={cislo(50, setBudovy)}
            />
          </label>

          <label className="block font-medium text-text">
            Hodiny práce experta navíc
            <span className="block text-[14px] font-normal text-sediva">{kc(HODINOVKA_EXPERTA)} za hodinu bez DPH, jednorázově</span>
            <input type="number" min={0} max={500} inputMode="numeric" className={poleInput} value={hodiny} onChange={cislo(500, setHodiny)} />
          </label>

          <label className="block font-medium text-text">
            Sekundy hovorů AI hlasového bota za měsíc
            <span className="block text-[14px] font-normal text-sediva">Účtuje se po sekundách (100 minut = 6 000 sekund), počítáme nejlevnější variantu</span>
            <input type="number" min={0} max={6000000} inputMode="numeric" className={poleInput} value={sekundy} onChange={cislo(6000000, setSekundy)} />
          </label>
        </div>

        <div className="na-tmave flex flex-col justify-between rounded-2xl bg-noc p-6 text-white lg:col-span-5">
          <div aria-live="polite">
            <span className="text-[14px] font-semibold uppercase tracking-wider text-sediva-tma">Měsíční poplatek</span>
            {naMiru ? (
              <>
                <span className="mt-1 block text-[28px] font-extrabold leading-tight text-white">Cenu pošleme v nabídce</span>
                <span className="block text-[15px] text-white/80">pro obce nad 10 000 obyvatel</span>
              </>
            ) : (
              <>
                <span className="mt-1 block text-sediva-tma">Orientačně od</span>
                <span className="block text-[42px] font-extrabold leading-tight text-white" style={{ fontFamily: 'var(--font-nadpis)' }}>
                  {kc(mesicniCena + bot.cena)}
                </span>
                <span className="block text-[15px] text-white/80">měsíčně bez DPH</span>
              </>
            )}
            {sekundy > 0 ? (
              <p className="mt-2 text-[15px] text-white/90">
                {naMiru ? 'Hlasový bot' : 'Z toho hlasový bot'} {kc(bot.cena)}, {bot.nazev}
              </p>
            ) : null}

            <div className="mt-6 border-t border-white/10 pt-4">
              <span className="text-[13px] font-semibold uppercase tracking-wider text-sediva-tma">Jednorázově</span>
              <p className="mt-1 text-[24px] font-bold text-white">od {kc(jednorazove)}</p>
              <ul className="mt-1 space-y-1 text-[14px] text-white/85">
                <li>
                  Nasazení od {kc(POPLATEK_NASAZENI[uroven])}
                </li>
                {hodiny > 0 ? (
                  <li>
                    Práce experta {hodiny} h × {kc(HODINOVKA_EXPERTA)} = {kc(hodiny * HODINOVKA_EXPERTA)}
                  </li>
                ) : null}
              </ul>
              <p className="mt-1 text-[13px] text-sediva-tma">bez DPH</p>
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
