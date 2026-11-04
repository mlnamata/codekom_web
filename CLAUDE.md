# CodeKom web – kontext pro Claude Code

Firemní prezentační web CodeKom pro starosty a účetní obcí do 2 000 obyvatel (https://codekom.vercel.app). Platforma samotná (weby obcí, aplikace, IoT) je v repozitáři `mlnamata/codecom`, ukázka webu obce běží na https://codecom-psi.vercel.app. Zadání webu je v `docs/zadani-prezentacni-web.md`.

## Stack

Next.js 16.4 (App Router), React 19.3, TypeScript strict s `noUncheckedIndexedAccess`, Tailwind CSS 4.3, pnpm 10. Testy: Vitest, Playwright (375 a 1280 px), axe-core. Hosting Vercel v regionu `fra1`.

## Pravidla

- Texty nevymýšlej. Berou se z `obsah/prezentace`. Co chybí, označ `[DOPLNIT]`, neověřené `[OVĚŘIT]`. Tvrzení o produktu musí být v `docs/tvrzeni-prezentace.md` (generuje `pnpm obsah`).
- Komentáře a texty česky, commity česky v rozkazovacím způsobu. Doménové názvy česky bez diakritiky.
- Vzhled: moderní, se skleněnými efekty, přechody, tučnějším písmem a animacemi (přání zakladatele ze 4. 11. 2026). Kontrast textu aspoň 4,5 : 1, cíle pro dotyk aspoň 44 × 44 px, `prefers-reduced-motion` musí animace vypnout.
- Fotky z `design/obrazky/foto` jsou vygenerované AI. Každá zobrazená fotka má poznámku „Ilustrační fotografie vytvořená umělou inteligencí“.
- Web nic nesbírá: žádný formulář, analytika ani cookies třetích stran (§ 89 odst. 3 zákona č. 127/2005 Sb.). Fonty jsou lokální (`@fontsource`).
- Přístupnost podle WCAG 2.2 AA.
- Tajné klíče jen do `.env`, nikdy do kódu ani commitu.
- Kopie z `codecom` (`packages/tokeny`, `design/`, `brand/`, část `docs/`) neupravuj tady, změň je v `codecom` a zkopíruj (viz README).

## Práce více agentů najednou

Na repozitáři může pracovat víc instancí Claude současně:

1. Po každém ověřeném kroku (kontroly prošly) hned commitni a pushni na `main`.
2. Přidávej jen svoje soubory (`git add <cesty>`, nikdy `git add -A`).
3. Před pushem `git pull --rebase --autostash origin main`. Při konfliktu se zastav a napiš, s čím je konflikt. Nikdy force push.
4. Na začátku si přečti `docs/progress.md`, zapiš tam svůj úkol a při každém commitu ho aktualizuj.

## Kontrola hotovo

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
