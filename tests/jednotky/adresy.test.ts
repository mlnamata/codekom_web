import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it, vi } from 'vitest'

const ROOT = join(__dirname, '..', '..')

function produkcniPromenne(): Record<string, string> {
  const obsah = readFileSync(join(ROOT, '.env.production'), 'utf8')
  const vysledek: Record<string, string> = {}
  for (const radek of obsah.split('\n')) {
    const cisty = radek.trim()
    if (!cisty || cisty.startsWith('#')) continue
    const i = cisty.indexOf('=')
    vysledek[cisty.slice(0, i)] = cisty.slice(i + 1)
  }
  return vysledek
}

describe('produkční adresy (.env.production)', () => {
  const env = produkcniPromenne()

  it('firemní web a ukázka obce jsou platné https adresy bez koncového lomítka', () => {
    for (const klic of ['NEXT_PUBLIC_SITE_URL', 'NEXT_PUBLIC_DEMO_URL']) {
      expect(env[klic], klic).toMatch(/^https:\/\/[a-z0-9.-]+\.[a-z]{2,}$/)
    }
  })

  it('firemní web a ukázka obce nesmí ukazovat na stejnou doménu', () => {
    expect(env.NEXT_PUBLIC_SITE_URL).not.toBe(env.NEXT_PUBLIC_DEMO_URL)
  })

  it('firemní adresa je codekomweb.vercel.app, ukázka obce codekom.vercel.app', () => {
    expect(env.NEXT_PUBLIC_SITE_URL).toBe('https://codekomweb.vercel.app')
    expect(env.NEXT_PUBLIC_DEMO_URL).toBe('https://codekom.vercel.app')
  })
})

describe('odkazy do ukázky (src/lib/demo.ts)', () => {
  it('sestaví odkaz na šablonu a paletu z NEXT_PUBLIC_DEMO_URL', async () => {
    vi.resetModules()
    vi.stubEnv('NEXT_PUBLIC_DEMO_URL', 'https://codekom.vercel.app/')
    const { odkazDema } = await import('@/lib/demo')
    expect(odkazDema()).toBe('https://codekom.vercel.app/')
    expect(odkazDema('naves', 2)).toBe('https://codekom.vercel.app/?sablona=naves&paleta=2')
    vi.unstubAllEnvs()
  })

  it('bez NEXT_PUBLIC_DEMO_URL nevrací žádný odkaz', async () => {
    vi.resetModules()
    vi.stubEnv('NEXT_PUBLIC_DEMO_URL', '')
    const { odkazDema, odkazAdministrace } = await import('@/lib/demo')
    expect(odkazDema('naves')).toBeNull()
    expect(odkazAdministrace('zaklad')).toBeNull()
    vi.unstubAllEnvs()
  })
})
