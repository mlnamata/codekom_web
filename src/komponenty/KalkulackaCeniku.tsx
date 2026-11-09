'use client'
import { useEffect, useState, type ChangeEvent } from 'react'
import {
  HODINOVKA_EXPERTA,
  MESICNI_DOPLNKY,
  POPLATEK_NASAZENI,
  STITEK_CENY,
  VELIKOSTI_KALKULACKY,
  cenaDoplnku,
  cenaHlasovehoBota,
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

const omez = (n: number, max: number) => Math.max(0, Math.min(max, Math.floor(n) || 0))

interface Nastaveni {
  velikost: number
  uroven: KlicUrovne
  urad: boolean
  budovy: number
  hodiny: number
  sekundy: number
  doplnky: string[]
}

const VYCHOZI: Nastaveni = { velikost: 0, uroven: 'zaklad', urad: false, budovy: 0, hodiny: 0, sekundy: 0, doplnky: [] }

/** Nastavení kalkulačky z adresy (?v=1&u=advance…). Web nic neukládá, stav je jen v odkazu. */
function zAdresy(hledat: string): Nastaveni {
  const p = new URLSearchParams(hledat)
  const uroven = UROVNE.find((u) => u.klic === p.get('u'))?.klic ?? VYCHOZI.uroven
  return {
    velikost: omez(Number(p.get('v')), VELIKOSTI_KALKULACKY.length - 1),
    uroven,
    urad: p.get('d') === '1',
    budovy: omez(Number(p.get('b')), 50),
    hodiny: omez(Number(p.get('h')), 500),
    sekundy: omez(Number(p.get('s')), 6000000),
    doplnky: (p.get('x') ?? '').split(',').filter((k) => MESICNI_DOPLNKY.some((d) => d.klic === k)),
  }
}

function doAdresy(n: Nastaveni): string {
  const p = new URLSearchParams()
  if (n.velikost) p.set('v', String(n.velikost))
  if (n.uroven !== VYCHOZI.uroven) p.set('u', n.uroven)
  if (n.urad) p.set('d', '1')
  if (n.budovy) p.set('b', String(n.budovy))
  if (n.hodiny) p.set('h', String(n.hodiny))
  if (n.sekundy) p.set('s', String(n.sekundy))
  if (n.doplnky.length) p.set('x', n.doplnky.join(','))
  const q = p.toString()
  return q ? `?${q}` : ''
}

export function KalkulackaCeniku() {
  const [n, setN] = useState<Nastaveni>(VYCHOZI)
  const [nacteno, setNacteno] = useState(false)
  const [zprava, setZprava] = useState('')
  const zmen = (cast: Partial<Nastaveni>) => setN((stare) => ({ ...stare, ...cast }))

  // Po načtení převezme nastavení z odkazu, pak ho při každé změně zapisuje zpět do adresy.
  useEffect(() => {
    // Adresu zná až prohlížeč; při vykreslení na serveru i při hydrataci musí být výchozí stav stejný.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setN(zAdresy(window.location.search))
    setNacteno(true)
  }, [])
  useEffect(() => {
    if (!nacteno) return
    const adresa = `${window.location.pathname}${doAdresy(n)}${window.location.hash}`
    window.history.replaceState(null, '', adresa)
  }, [n, nacteno])

  const naMiru = jeNaMiru(n.velikost)
  const mesicniCena = spocitej(n.velikost, n.uroven, n.urad, n.budovy)
  const jednorazove = spocitejJednorazove(n.uroven, n.hodiny)
  const bot = cenaHlasovehoBota(n.sekundy)
  const doplnky = cenaDoplnku(n.doplnky)
  const pridavky = bot.cena + doplnky
  const celkem = mesicniCena + pridavky
  const cislo = (max: number, klic: 'budovy' | 'hodiny' | 'sekundy') => (e: ChangeEvent<HTMLInputElement>) =>
    zmen({ [klic]: omez(Number(e.target.value), max) })

  const kopirujOdkaz = async () => {
    const odkaz = `${window.location.origin}${window.location.pathname}${doAdresy(n)}#kalkulacka`
    try {
      await navigator.clipboard.writeText(odkaz)
      setZprava('Odkaz na výpočet je zkopírovaný. Vložte ho do e-mailu pro radu.')
    } catch {
      setZprava(`Odkaz se nepodařilo zkopírovat. Zkopírujte ho z adresního řádku: ${odkaz}`)
    }
  }

  const vytiskni = () => {
    const html = document.documentElement
    html.classList.add('tisk-kalkulacky')
    const uklid = () => {
      html.classList.remove('tisk-kalkulacky')
      window.removeEventListener('afterprint', uklid)
    }
    window.addEventListener('afterprint', uklid)
    window.print()
  }

  const shrnuti = naMiru ? (pridavky > 0 ? `${kc(pridavky)} + web podle nabídky` : 'Cenu pošleme v nabídce') : kc(celkem)

  return (
    <div className="kalkulacka sklo-svetle my-8 rounded-3xl border border-white/80 p-6 md:p-8">
      <div className="grid gap-8 lg:grid-cols-12">
        <div className="grid gap-5 lg:col-span-7">
          <label className="block font-medium text-text">
            Velikost obce
            <select className={poleInput} value={n.velikost} onChange={(e) => zmen({ velikost: Number(e.target.value) })}>
              {VELIKOSTI_KALKULACKY.map((v, i) => (
                <option key={v.klic} value={i}>
                  {v.nazev}
                </option>
              ))}
            </select>
          </label>

          <label className="block font-medium text-text">
            Úroveň webu
            <select className={poleInput} value={n.uroven} onChange={(e) => zmen({ uroven: e.target.value as KlicUrovne })}>
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
              {(
                [
                  [false, 'Ne'],
                  [true, 'Ano'],
                ] as const
              ).map(([h, t]) => (
                <label key={t} className="inline-flex min-h-11 cursor-pointer items-center gap-2.5">
                  <input type="radio" name="urad" className="size-5 accent-noc" checked={n.urad === h} onChange={() => zmen({ urad: h })} />
                  <span className="text-[16px]">{t}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <label className="block font-medium text-text">
            Počet budov s modulem Chytré budovy
            <input type="number" min={0} max={50} inputMode="numeric" className={poleInput} value={n.budovy} onChange={cislo(50, 'budovy')} />
          </label>

          <label className="block font-medium text-text">
            Hodiny práce experta navíc
            <span className="block text-[14px] font-normal text-sediva">{kc(HODINOVKA_EXPERTA)} za hodinu bez DPH, jednorázově</span>
            <input type="number" min={0} max={500} inputMode="numeric" className={poleInput} value={n.hodiny} onChange={cislo(500, 'hodiny')} />
          </label>

          <label className="block font-medium text-text">
            Sekundy hovorů AI hlasového bota za měsíc
            <span className="block text-[14px] font-normal text-sediva">
              Účtuje se po sekundách (100&nbsp;minut = 6&nbsp;000&nbsp;sekund), počítáme nejlevnější variantu
            </span>
            <input type="number" min={0} max={6000000} inputMode="numeric" className={poleInput} value={n.sekundy} onChange={cislo(6000000, 'sekundy')} />
          </label>

          <fieldset>
            <legend className="font-medium text-text">Měsíční digitální doplňky</legend>
            <ul className="mt-2 grid gap-1 sm:grid-cols-2">
              {MESICNI_DOPLNKY.map((d) => (
                <li key={d.klic}>
                  <label className="flex min-h-11 cursor-pointer items-start gap-2.5 py-1.5">
                    <input
                      type="checkbox"
                      className="mt-0.5 size-5 shrink-0 accent-noc"
                      checked={n.doplnky.includes(d.klic)}
                      onChange={(e) =>
                        zmen({ doplnky: e.target.checked ? [...n.doplnky, d.klic] : n.doplnky.filter((k) => k !== d.klic) })
                      }
                    />
                    <span className="text-[15px] leading-snug">
                      {d.nazev} <span className="whitespace-nowrap text-sediva">od {kc(d.cenaOd)}</span>
                    </span>
                  </label>
                </li>
              ))}
            </ul>
          </fieldset>
        </div>

        {/* Na telefonu je výsledek až pod formulářem, proto lišta s cenou drží u spodního okraje obrazovky. */}
        <div className="neTisknout sticky bottom-3 z-20 -mt-2 lg:hidden" aria-hidden="true">
          <div className="na-tmave flex items-center justify-between gap-3 rounded-2xl bg-noc px-5 py-3 text-white shadow-2xl">
            <span className="text-[14px] text-sediva-tma">Měsíčně od</span>
            <span className="text-[20px] font-extrabold">{shrnuti}</span>
          </div>
        </div>

        <div className="vysledek na-tmave flex flex-col justify-between rounded-2xl bg-noc p-6 text-white lg:col-span-5">
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
                  {kc(celkem)}
                </span>
                <span className="block text-[15px] text-white/80">měsíčně bez DPH</span>
              </>
            )}
            {n.sekundy > 0 ? (
              <p className="mt-2 text-[15px] text-white/90">
                {naMiru ? 'Hlasový bot' : 'Z toho hlasový bot'} {kc(bot.cena)}, {bot.nazev}
              </p>
            ) : null}
            {doplnky > 0 ? (
              <p className="mt-1 text-[15px] text-white/90">
                {naMiru ? 'Digitální doplňky' : 'Z toho digitální doplňky'} {kc(doplnky)}
              </p>
            ) : null}

            <div className="mt-6 border-t border-white/10 pt-4">
              <span className="text-[13px] font-semibold uppercase tracking-wider text-sediva-tma">Jednorázově</span>
              <p className="mt-1 text-[24px] font-bold text-white">od {kc(jednorazove)}</p>
              <ul className="mt-1 space-y-1 text-[14px] text-white/85">
                <li>Nasazení od {kc(POPLATEK_NASAZENI[n.uroven])}</li>
                {n.hodiny > 0 ? (
                  <li>
                    Práce experta {n.hodiny} h × {kc(HODINOVKA_EXPERTA)} = {kc(n.hodiny * HODINOVKA_EXPERTA)}
                  </li>
                ) : null}
              </ul>
              <p className="mt-1 text-[13px] text-sediva-tma">bez DPH</p>
            </div>
          </div>

          <div className="neTisknout mt-6 grid gap-2 border-t border-white/10 pt-4">
            <button type="button" onClick={kopirujOdkaz} className="tlacitko-obrys !min-h-11 w-full">
              Zkopírovat odkaz na výpočet
            </button>
            <button type="button" onClick={vytiskni} className="tlacitko-obrys !min-h-11 w-full">
              Vytisknout výpočet
            </button>
            <p className="min-h-5 text-[13px] text-white/85" role="status">
              {zprava}
            </p>
          </div>

          <p className="stitek mt-4 border-t border-white/10 pt-4 text-[13px] text-sediva-tma">{STITEK_CENY}</p>
        </div>
      </div>
    </div>
  )
}
