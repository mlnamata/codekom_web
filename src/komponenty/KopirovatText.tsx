'use client'
import { useState } from 'react'

/** Tlačítko, které zkopíruje daný text do schránky a oznámí výsledek čtečce. */
export function KopirovatText({ text, popisek }: { text: string; popisek: string }) {
  const [zprava, setZprava] = useState('')
  const kopiruj = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setZprava('Zkopírováno do schránky.')
    } catch {
      setZprava('Kopírování se nepodařilo, označte text a zkopírujte ho ručně.')
    }
  }
  return (
    <p className="neTisknout mt-6 flex flex-wrap items-center gap-4">
      <button type="button" onClick={kopiruj} className="tlacitko">
        {popisek}
      </button>
      <span role="status" className="text-[15px] text-sediva">
        {zprava}
      </span>
    </p>
  )
}
