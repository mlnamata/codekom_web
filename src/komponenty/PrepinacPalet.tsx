'use client'
import Image from 'next/image'
import { useState } from 'react'

interface Paleta {
  index: number
  nazev: string
  barvy: { nazev: string; hodnota: string }[]
  snimek: string
}

/** Přepínač 3 barevných variant: mění snímek, alt text a odkaz do živé ukázky. */
export function PrepinacPalet({
  nazev,
  palety,
  odkazyDema,
  aplikace,
}: {
  nazev: string
  palety: Paleta[]
  odkazyDema: (string | null)[]
  aplikace: string | null
}) {
  const [vybrana, setVybrana] = useState(0)
  const p = palety[vybrana] ?? palety[0]!
  const demo = odkazyDema[vybrana] ?? null

  return (
    <div className="mt-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div role="group" aria-label="Barevná varianta" className="flex flex-wrap gap-2.5">
          {palety.map((x) => (
            <button
              key={x.index}
              type="button"
              aria-pressed={x.index === vybrana}
              onClick={() => setVybrana(x.index)}
              className={`inline-flex min-h-11 items-center gap-2.5 rounded-full border px-5 text-[15px] font-semibold transition-all duration-200 ${
                x.index === vybrana
                  ? 'border-noc bg-noc text-white shadow-md'
                  : 'border-linka bg-white text-text hover:border-text hover:bg-plocha'
              }`}
            >
              <span
                className="size-4 rounded-full border border-black/20"
                style={{ background: x.barvy[3]!.hodnota }}
                aria-hidden="true"
              />
              <span>{x.nazev}</span>
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-3">
          {demo ? (
            <a href={demo} className="tlacitko" rel="noopener noreferrer">
              Prohlédnout živou ukázku
            </a>
          ) : null}
          {aplikace ? (
            <a href={aplikace} className="tlacitko-obrys" rel="noopener noreferrer">
              Vyzkoušet aplikaci
            </a>
          ) : null}
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        Zobrazená varianta {p.nazev}
      </p>

      <div className="mt-6 overflow-hidden rounded-3xl border border-linka/80 bg-plocha shadow-2xl">
        <Image
          src={p.snimek}
          alt={`Úvodní stránka šablony ${nazev} pro obec Javoří Lhota, paleta ${p.nazev}.`}
          width={1280}
          height={900}
          sizes="(min-width: 1120px) 1056px, 100vw"
          priority
          className="block h-auto w-full transition-opacity duration-300"
        />
      </div>

      <ul
        className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-[14px] text-sediva"
        aria-label={`Barvy palety ${p.nazev}`}
      >
        {p.barvy.map((b) => (
          <li key={b.nazev} className="inline-flex items-center gap-2">
            <span
              className="size-4 rounded-full border border-black/20"
              style={{ background: b.hodnota }}
              aria-hidden="true"
            />
            <span>{b.nazev}</span>
            <span className="font-mono text-[13px] text-sediva">{b.hodnota}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
