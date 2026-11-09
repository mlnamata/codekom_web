/**
 * Údaje o firmě na jednom místě. Vyplňte je v `.env.production` nebo v nastavení Vercelu
 * (proměnné FIRMA_*, nejsou tajné). Při sestavení se dosadí místo odpovídajících
 * `[DOPLNIT: …]` v celém obsahu webu. Nevyplněný údaj zůstane jako zvýrazněné `[DOPLNIT: …]`.
 */

const hodnota = (klic: string): string | null => {
  const v = process.env[klic]?.trim()
  return v ? v : null
}

/** Adresa webu bez koncového lomítka, jen když je to veřejná https adresa. */
const adresaWebu = (): string | null => {
  const v = hodnota('NEXT_PUBLIC_SITE_URL')
  return v && v.startsWith('https://') ? v.replace(/\/$/, '') : null
}

/** Klíč je text za „DOPLNIT: “ v obsahu, hodnota je název proměnné prostředí. */
export const PROMENNE_FIRMY = {
  'IČO': 'FIRMA_ICO',
  'sídlo': 'FIRMA_SIDLO',
  'adresa': 'FIRMA_ADRESA',
  'e-mail': 'FIRMA_EMAIL',
  'telefon': 'FIRMA_TELEFON',
  'úřední doba': 'FIRMA_DOBA',
  'ID datové schránky': 'FIRMA_DATOVA_SCHRANKA',
  'název holdingu': 'FIRMA_HOLDING',
} as const

export type UdajFirmy = keyof typeof PROMENNE_FIRMY | 'adresa webu CodeKom'

/** Vrátí vyplněný údaj o firmě, nebo null. */
export function udajFirmy(udaj: UdajFirmy): string | null {
  if (udaj === 'adresa webu CodeKom') return adresaWebu()
  return hodnota(PROMENNE_FIRMY[udaj])
}

/** Dosadí vyplněné údaje o firmě místo `[DOPLNIT: …]`. Ostatní značky nechá být. */
export function dosadFirmu(text: string): string {
  return text.replace(/\[DOPLNIT: ([^\]]+)\]/g, (cela, udaj: string) => {
    const klic = udaj.trim() as UdajFirmy
    if (klic !== 'adresa webu CodeKom' && !(klic in PROMENNE_FIRMY)) return cela
    return udajFirmy(klic) ?? cela
  })
}
