# Prezentační web CodeKom

Web pro starosty a účetní: úvod, galerie 20 šablon s barevnými variantami, tři úrovně editoru, ceník s kalkulačkou a texty z `obsah/prezentace`. Nic nesbírá: žádný formulář, cookies ani měření.

## Spuštění

Z kořene repozitáře:

```bash
pnpm install
```

```bash
pnpm dev
```

Web běží na http://localhost:3000. Odkazy do živé ukázky vedou na `NEXT_PUBLIC_DEMO_URL` (v `.env.development` je http://localhost:3100). Ukázka webu obce je v repozitáři [mlnamata/codecom](https://github.com/mlnamata/codecom) (`apps/web`), spusťte ji tam na portu 3100.

Před `dev` a `build` se do `public/` zkopírují snímky šablon (`design/snimky`), fotky (`design/obrazky/foto`) a logo (`brand/`).

## Odkud co pochází

Web vznikl v monorepu `mlnamata/codecom` (`apps/prezentace`) a 4. 11. 2026 se přesunul sem jako samostatný projekt. Tyto složky jsou kopie z `codecom` a zdrojem pravdy zůstávají tam: `packages/tokeny` (barvy a seznam šablon, generuje `design/generator/tokeny.py`), `design/snimky` (snímky šablon), `design/obrazky/foto` (fotky AI), `brand/` (logo), `docs/pravni-dokumenty.md` a `docs/navrh-platformy/04-admin-editor.md`. Když se v `codecom` změní, zkopírujte je sem znovu. Texty webu (`obsah/prezentace`) a registr tvrzení (`docs/tvrzeni-prezentace.md`) už patří jen sem.

## Cesta návštěvníka

1. Úvod `/`: co obec získá, 4 snímky šablon, tři úrovně, důvody, moduly.
2. Šablony `/ukazky` a detail `/ukazky/<klic>`: přepínač 3 palet, odkaz do živé ukázky.
3. Úrovně `/urovne` a `/urovne/<zaklad|pokrocily|advance>`: matice funkcí, role, bloky a odkaz do ukázky administrace dané úrovně.
4. Ceník `/cenik` s kalkulačkou, Ke stažení, Kontakt.

## Kontroly

```bash
pnpm typecheck
```

```bash
pnpm lint
```

```bash
pnpm test
```

```bash
pnpm build
```

```bash
pnpm e2e
```

```bash
pnpm a11y
```

```bash
pnpm obsah
```

```bash
pnpm lighthouse
```

Kontrola odkazů potřebuje běžící `next start` na portu 3300 (`ODKAZY_URL` změní adresu):

```bash
pnpm odkazy
```

## Generované soubory

| Příkaz | Co vyrobí |
| --- | --- |
| `pnpm logo` | `brand/svg/*.svg`, porovnání s PNG, favicony |
| `pnpm pdf` | 5 PDF v `public/ke-stazeni` a `src/data/ke-stazeni.json` |
| `pnpm obsah` | `docs/tvrzeni-prezentace.md`, kontrola textů, výpis `[DOPLNIT]` |

## Nasazení

Vercel: projekt s Root Directory = kořen repozitáře, framework Next.js, region `fra1` (`vercel.json`). Produkční adresa je https://codekomweb.vercel.app, ukázka obce https://codekom.vercel.app (obojí v `.env.production`, proměnné nastavené ve Vercelu mají přednost). Před ostrým spuštěním doplňte `NEXT_PUBLIC_SITE_URL` (doména [DOPLNIT]), `NEXT_PUBLIC_DEMO_URL` a `NEXT_PUBLIC_APP_DEMO_URL` a spusťte `node scripts/kontrola-doplnit.mjs --prisne`, který skončí chybou, dokud zbývá nějaké `[DOPLNIT]`.
