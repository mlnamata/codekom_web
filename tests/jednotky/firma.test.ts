import { afterEach, describe, expect, it, vi } from 'vitest'
import { dosadFirmu, udajFirmy } from '@/lib/firma'

afterEach(() => vi.unstubAllEnvs())

describe('údaje o firmě', () => {
  it('dosadí vyplněné údaje místo [DOPLNIT: …]', () => {
    vi.stubEnv('FIRMA_EMAIL', 'obce@example.cz')
    vi.stubEnv('FIRMA_ICO', '12345678')
    expect(dosadFirmu('E-mail: [DOPLNIT: e-mail], IČO [DOPLNIT: IČO]')).toBe('E-mail: obce@example.cz, IČO 12345678')
    expect(dosadFirmu('<a href="mailto:[DOPLNIT: e-mail]?subject=Dotaz">')).toBe('<a href="mailto:obce@example.cz?subject=Dotaz">')
  })

  it('nevyplněný údaj a jiné značky nechá být', () => {
    vi.stubEnv('FIRMA_TELEFON', '')
    expect(dosadFirmu('[DOPLNIT: telefon]')).toBe('[DOPLNIT: telefon]')
    expect(dosadFirmu('[DOPLNIT: cena zařízení] [OVĚŘIT]')).toBe('[DOPLNIT: cena zařízení] [OVĚŘIT]')
  })

  it('adresu webu vezme jen z veřejné https adresy', () => {
    vi.stubEnv('NEXT_PUBLIC_SITE_URL', 'http://localhost:3000')
    expect(udajFirmy('adresa webu CodeKom')).toBeNull()
    vi.stubEnv('NEXT_PUBLIC_SITE_URL', 'https://codekomweb.vercel.app/')
    expect(dosadFirmu('web [DOPLNIT: adresa webu CodeKom]')).toBe('web https://codekomweb.vercel.app')
  })
})
