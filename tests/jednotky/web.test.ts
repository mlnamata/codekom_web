import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'
import sharp from 'sharp'
import { describe, expect, it } from 'vitest'
import soubory from '@/data/ke-stazeni.json'
import { DIGITALNI_DOPLNKY, HLASOVY_BOT, MESICNI_DOPLNKY, cenaDoplnku, HODINOVKA_EXPERTA, SOUCASTKY_CHYTRA_OBEC, STITEK_CENY, cenaHlasovehoBota, cenaSekundyPausalu, jeNaMiru, spocitej, spocitejJednorazove } from '@/lib/cenik'
import { otazky } from '@/lib/seo'

const APP = join(__dirname, '..', '..')
const ROOT = APP

describe('kalkulačka', () => {
  it('sečte web, úřad a budovy', () => {
    expect(spocitej(0, 'zaklad', false, 0)).toBe(590)
    expect(spocitej(1, 'advance', true, 0)).toBe(3290)
    expect(spocitej(2, 'pokrocily', true, 3)).toBe(2490 + 2000 + 3 * 390)
  })
  it('paušál hlasového bota je levnější než sekunda bez paušálu a větší paušál vychází levněji', () => {
    const ceny = HLASOVY_BOT.pausaly.map(cenaSekundyPausalu)
    expect(ceny).toEqual([0.082, 0.072, 0.062])
    for (const p of HLASOVY_BOT.pausaly) expect(p.dalsiSekunda).toBeLessThan(HLASOVY_BOT.zaSekundu)
    for (let i = 1; i < ceny.length; i++) expect(ceny[i]!).toBeLessThan(ceny[i - 1]!)
  })
  it('sečte jednorázově nasazení a hodiny experta', () => {
    expect(HODINOVKA_EXPERTA).toBe(750)
    expect(spocitejJednorazove('zaklad', 0)).toBe(4900)
    expect(spocitejJednorazove('advance', 3)).toBe(14900 + 3 * 750)
    expect(spocitejJednorazove('zaklad', -2)).toBe(4900)
    expect(jeNaMiru(3)).toBe(true)
    expect(jeNaMiru(2)).toBe(false)
  })
  it('hlasový bot vybere nejlevnější variantu', () => {
    expect(cenaHlasovehoBota(0)).toEqual({ nazev: 'bez paušálu', cena: 0 })
    expect(cenaHlasovehoBota(1000)).toEqual({ nazev: 'bez paušálu', cena: 150 })
    expect(cenaHlasovehoBota(6000)).toEqual({ nazev: 'paušál Malý', cena: 490 })
    expect(cenaHlasovehoBota(48000)).toEqual({ nazev: 'paušál Velký', cena: 2990 })
  })
  it('digitální doplňky: jedinečné klíče, kladné ceny a součet jen měsíčních', () => {
    expect(new Set(DIGITALNI_DOPLNKY.map((d) => d.klic)).size).toBe(DIGITALNI_DOPLNKY.length)
    for (const d of DIGITALNI_DOPLNKY) expect(d.cenaOd).toBeGreaterThan(0)
    expect(cenaDoplnku([])).toBe(0)
    expect(cenaDoplnku(['anonymizace', 'svoz'])).toBe(290 + 190)
    // Doplněk placený za kus ani neznámý klíč se do měsíční ceny nepočítá.
    expect(cenaDoplnku(['zapis', 'neexistuje'])).toBe(0)
    expect(MESICNI_DOPLNKY.every((d) => d.platba === 'mesicne')).toBe(true)
  })
  it('hlasový bot ohlásí AI a přepojí na úřad', () => {
    expect(HLASOVY_BOT.pravidla.join(' ')).toMatch(/umělá inteligence \(čl\. 50 AI Actu\)/)
    expect(HLASOVY_BOT.pravidla.join(' ')).toMatch(/přepojí hovor na pracovníka úřadu/)
    expect(HLASOVY_BOT.pravidla.join(' ')).toMatch(/úřední hodiny a telefon úřadu/)
  })
  it('katalog: zařízení bez ceny mají standard a údaj o provozu bez internetu', () => {
    for (const z of SOUCASTKY_CHYTRA_OBEC.filter((x) => x.cenaOd === undefined)) {
      expect(z.standard).toBeTruthy()
      expect(z.bezInternetu).toBeTruthy()
    }
    expect(SOUCASTKY_CHYTRA_OBEC.map((z) => z.klic)).toEqual(expect.arrayContaining(['danfoss-ally', 'shelly-blu-trv', 'shelly-pro-em', 'nuki-pro', 'nuki-keypad', 'salto-ks', 'zbt-2', 'mini-pc', 'blu-gateway']))
  })
  it('štítek ceny má datum', () => {
    expect(STITEK_CENY).toMatch(/orientační cena, přesnou pošleme v nabídce/i)
    expect(STITEK_CENY).toContain('4. 11. 2026')
  })
})

describe('značka', () => {
  it('SVG odpovídá PNG pod limity', () => {
    const text = readFileSync(join(ROOT, 'brand', 'svg', 'porovnani.txt'), 'utf8')
    expect(text).not.toContain('NAD LIMITEM')
    for (const n of ['znak', 'nazev', 'logo']) for (const b of ['cerne', 'bile']) expect(existsSync(join(ROOT, 'brand', 'svg', `${n}-${b}.svg`))).toBe(true)
  })
  it('SVG nemají rastrové vložky', () => {
    for (const f of readdirSync(join(ROOT, 'brand', 'svg')).filter((x) => x.endsWith('.svg'))) {
      const svg = readFileSync(join(ROOT, 'brand', 'svg', f), 'utf8')
      expect(svg).toContain('viewBox')
      expect(svg).not.toContain('<image')
    }
  })
  it('favicony mají správné rozměry', async () => {
    for (const [f, n] of [
      ['src/app/apple-icon.png', 180],
      ['public/icon-192.png', 192],
      ['public/icon-512.png', 512],
    ] as const) {
      const m = await sharp(join(APP, f)).metadata()
      expect([m.width, m.height]).toEqual([n, n])
    }
    const ico = readFileSync(join(APP, 'src', 'app', 'favicon.ico'))
    expect(ico.readUInt16LE(4)).toBe(3)
    expect([ico[6], ico[22], ico[38]]).toEqual([16, 32, 48])
  })
})

describe('PDF ke stažení', () => {
  it('je jich 5, jsou označené a v češtině', () => {
    expect(soubory).toHaveLength(5)
    for (const s of soubory) {
      const cesta = join(APP, 'public', 'ke-stazeni', s.soubor)
      const pdf = readFileSync(cesta).toString('latin1')
      expect(pdf).toContain('/StructTreeRoot')
      expect(pdf).toMatch(/\/Lang\s*\(cs\)/)
      expect(Math.max(1, Math.round(statSync(cesta).size / 1024))).toBe(s.velikostKb)
    }
  })
})

describe('FAQ', () => {
  it('vytáhne otázky a odpovědi', () => {
    expect(otazky('### Kdo rozhoduje?\nRada [obce](/x).\n### Poznámka\ntext')).toEqual([{ otazka: 'Kdo rozhoduje?', odpoved: 'Rada obce.' }])
  })
})
