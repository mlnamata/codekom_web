# Rozpracovaná práce

| Úkol | Oblast souborů | Stav | Poznámka |
| --- | --- | --- | --- |
| Nasazení na codekomweb.vercel.app | nastavení Vercelu | čeká na zakladatele | projekt napojit na tento repozitář, Root Directory = kořen |

## Hotovo

- Přesun z `codecom/apps/prezentace` do samostatného repozitáře (4. 11. 2026): typecheck, lint, 23 testů, build, 33 testů v prohlížeči (e2e 375 a 1280 px, axe) prošly.
- Test produkčních adres (`tests/jednotky/adresy.test.ts`): hlídá `.env.production` (firemní web codekomweb.vercel.app, ukázka obce codekom.vercel.app) a odkazy do ukázky z `src/lib/demo.ts`. Typecheck, lint, 28 jednotkových testů, build a 33 testů v prohlížeči prošly.
- Úvod: fotka v hero nahrazena pozadím `.zare` bez fotky. Karusel na úvodu ukazuje všech 20 šablon (komponenta `Karusel`). Typecheck, lint, build, 33 testů v prohlížeči prošlo.
- Úvod: pozadí hero je skutečná fotka cesty za úsvitu (`public/fotky/uvod-cesta.webp`, bez poznámky o AI, je to fotka, ne vygenerovaný obrázek). Přidán slogan „Ukážeme vám cestu.“. Typecheck, lint, 28 jednotkových testů, build a 33 testů v prohlížeči prošlo.
