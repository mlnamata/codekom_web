import { expect, test } from '@playwright/test'

test('úvod vede na šablony a úrovně', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  await expect(page.locator('img[alt^="Úvodní stránka šablony"]')).toHaveCount(23)
  await page.getByRole('link', { name: 'Prohlédnout 23 šablon' }).click()
  await expect(page).toHaveURL(/\/ukazky$/)
  await expect(page.locator('main li a[href^="/ukazky/"]')).toHaveCount(23)
})

test('karusel šablon se posouvá tlačítky', async ({ page }) => {
  await page.goto('/')
  const karusel = page.getByRole('region', { name: 'Karusel šablon' })
  const predchozi = karusel.getByRole('button', { name: 'Předchozí' })
  const dalsi = karusel.getByRole('button', { name: 'Další' })
  const pas = karusel.getByRole('list', { name: 'Seznam 23 šablon' })
  await expect(predchozi).toBeDisabled()
  await dalsi.click()
  await expect.poll(() => pas.evaluate((el) => el.scrollLeft)).toBeGreaterThan(0)
  await expect(predchozi).toBeEnabled()
  await predchozi.click()
  await expect.poll(() => pas.evaluate((el) => el.scrollLeft)).toBe(0)
})

test('hlavička na telefonu ukáže jen logo a menu', async ({ page }) => {
  await page.goto('/')
  const napiste = page.locator('header').getByRole('link', { name: 'Napište nám' })
  if ((page.viewportSize()?.width ?? 0) < 1024) await expect(napiste).toBeHidden()
  else await expect(napiste).toBeVisible()
})

test('přepínač palet změní snímek a odkaz do ukázky', async ({ page }) => {
  await page.goto('/ukazky/lipa')
  await page.getByRole('button', { name: 'Obloha' }).click()
  await expect(page.getByRole('button', { name: 'Obloha' })).toHaveAttribute('aria-pressed', 'true')
  await expect(page.getByAltText('Úvodní stránka šablony Deneb pro obec Javoří Lhota, paleta Obloha.')).toBeVisible()
  const demo = page.getByRole('link', { name: 'Prohlédnout živou ukázku' })
  if (await demo.count()) await expect(demo).toHaveAttribute('href', /\?sablona=lipa&paleta=1$/)
})

test('kalkulačka přepočítá cenu se štítkem', async ({ page }) => {
  await page.goto('/cenik')
  const vysledek = page.locator('[aria-live="polite"]').filter({ hasText: 'Orientačně od' })
  await expect(vysledek).toContainText('590')
  await page.getByLabel('Velikost obce').selectOption({ index: 1 })
  await page.getByLabel('Úroveň webu').selectOption('advance')
  await page.getByLabel('Ano').check()
  await expect(vysledek).toContainText('3 290')
  await expect(page.getByText('Orientační cena, přesnou pošleme v nabídce').first()).toBeVisible()
})

test('kalkulačka sečte jednorázové náklady a hodiny experta', async ({ page }) => {
  await page.goto('/cenik')
  const vysledek = page.locator('[aria-live="polite"]').filter({ hasText: 'Jednorázově' })
  await expect(vysledek).toContainText('4 900')
  await page.getByLabel('Hodiny práce experta navíc').fill('2')
  await expect(vysledek).toContainText('6 400')
  await page.getByLabel('Sekundy hovorů AI hlasového bota za měsíc').fill('6000')
  await expect(vysledek).toContainText('1 080')
  await expect(vysledek).toContainText('paušál Malý')
  await page.getByLabel('Velikost obce').selectOption('3')
  await expect(vysledek).toContainText('Cenu pošleme v nabídce')
  await expect(page.getByText('Na začátku každého hovoru řekne, že je umělá inteligence').first()).toBeVisible()
})

test('katalog zařízení z ceníku', async ({ page }) => {
  await page.goto('/cenik')
  await page.getByRole('link', { name: 'Celý katalog zařízení' }).click()
  await expect(page).toHaveURL(/\/katalog$/)
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Katalog')
  for (const nadpis of ['Úspora vytápění', 'Přístup a rezervace', 'Hlídání energií', 'Čidla', 'Brána a sítě']) await expect(page.getByRole('heading', { level: 2, name: nadpis })).toBeVisible()
  await expect(page.getByText('Funguje bez internetu').first()).toBeVisible()
  await expect(page.getByText('Ne, závisí na cloudu')).toBeVisible()
  await expect(page.getByRole('heading', { level: 3, name: 'Venkovní webkamera pro web obce' })).toBeVisible()
})

test('fotky mají vodoznak AI místo nápisu', async ({ page }) => {
  for (const cesta of ['/', '/ukazky/naves', '/co-umime']) {
    await page.goto(cesta)
    const fotky = page.locator('figure:has(img[src*="foto"])')
    const n = await fotky.count()
    for (let i = 0; i < n; i++) {
      // Vodoznak AI je vidět, poznámka je jen pro čtečky obrazovky.
      await expect(fotky.nth(i).locator('img[src*="ai-odznak"]')).toBeVisible()
      await expect(fotky.nth(i).getByText('Ilustrační fotografie vytvořená umělou inteligencí')).toHaveClass(/sr-only/)
    }
  }
})

test('kontakt nemá formulář', async ({ page }) => {
  await page.goto('/kontakt')
  await expect(page.locator('form')).toHaveCount(0)
})

test('úvodní pás podstránky nemá surový markdown ani HTML', async ({ page }) => {
  await page.goto('/kontakt')
  const pas = page.locator('section:has(h1)')
  await expect(pas).not.toContainText('<a href')
  await expect(pas).not.toContainText('- Telefon')
  // Kontakty z úvodu jsou pod pásem jako seznam.
  await expect(page.locator('main li', { hasText: 'Telefon' }).first()).toBeVisible()
})

test('kalkulačka přičte digitální doplňky a nastavení je v odkazu', async ({ page }) => {
  await page.goto('/cenik')
  const vysledek = page.locator('[aria-live="polite"]').filter({ hasText: 'Orientačně od' })
  await page.getByLabel('Úroveň webu').selectOption('advance')
  await page.getByLabel(/AI kontrola osobních údajů před vyvěšením/).check()
  // Advance do 500 obyvatel 1 490 Kč + doplněk 290 Kč.
  await expect(vysledek).toContainText('1 780')
  await expect(vysledek).toContainText('Z toho digitální doplňky 290')
  await expect(page).toHaveURL(/u=advance/)
  await expect(page).toHaveURL(/x=anonymizace/)
  // Stejný odkaz otevře stejný výpočet.
  await page.goto(page.url())
  await expect(page.locator('[aria-live="polite"]').filter({ hasText: 'Orientačně od' })).toContainText('1 780')
  await expect(page.getByRole('heading', { name: 'Další digitální služby pro úřad a občany' })).toBeVisible()
})

test('časté otázky se rozbalují a vzor usnesení jde zkopírovat', async ({ page }) => {
  await page.goto('/ke-stazeni')
  const otazka = page.locator('details.otazka').first()
  await expect(otazka).not.toHaveAttribute('open', '')
  await otazka.locator('summary').click()
  await expect(otazka).toHaveAttribute('open', '')
  await expect(page.getByRole('button', { name: 'Zkopírovat text usnesení' })).toBeVisible()
})

test('neexistující adresa ukáže českou stránku 404', async ({ page }) => {
  const odpoved = await page.goto('/tahle-stranka-neni')
  expect(odpoved?.status()).toBe(404)
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Tuhle stránku jsme nenašli')
})
