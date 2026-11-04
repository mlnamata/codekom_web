# Rozpracovaná práce

| Úkol | Oblast souborů | Stav | Poznámka |
| --- | --- | --- | --- |
| Nasazení na codekomweb.vercel.app | nastavení Vercelu | čeká na zakladatele | projekt napojit na tento repozitář, Root Directory = kořen |

## Hotovo

- Interaktivní návrh portálu a dashboardu obce (4. 11. 2026): vytvořena komponenta `PortalObceDashboard` implementující zaslaný mockup (Portál obce Veselá) s tmavým skleněným rámem, levou navigací a 6 bento widgety (Portál občana a poplatky s rychlou QR platbou, Elektronická úřední deska s vyhláškou 515/2020 Sb., Interaktivní mapa závad se sypačem na trase, Chytrá obec s IoT telemetrií parkování a kontejnerů, Obecní půjčovna nářadí s rezervací a Kalendář akcí). Integrováno do `/co-umime`. Typecheck, lint, testy, obsah, build a 33 testů v prohlížeči (14 e2e a 19 axe a11y) prošly bez chyb.
- Rozšíření možností platformy v Co umíme (4. 11. 2026): přidáno 5 tematických celků (Senzorika a IoT, Komunitní sdílení a lokální ekonomika, Pokročilá správa majetku a infrastruktury, Bezpečnost a krizové situace, Zákulisní portály a zapojení občanů) včetně registru tvrzení. Typecheck, lint, testy, obsah, build, 14 e2e a 19 a11y testů prošly.
- Zlepšení designu záhlaví a sjednocení podstránek na úroveň landing page (4. 11. 2026): tmavé skleněné záhlaví s aktivním stavem a vylepšeným mobilním menu, sjednocení designu všech 19 podstránek pomocí StrankaHero a skleněných bento karet, rozšíření ceníku o jednorázový poplatek za nasazení (od 4 900 Kč), hodinovku experta (750 Kč / h), doplňkové služby a katalog součástek pro chytrou obec. Typecheck, lint, 28 jednotkových testů, kontrola obsahu, build a 33 testů v prohlížeči (14 e2e a 19 axe a11y) prošly.

- Přesun z `codecom/apps/prezentace` do samostatného repozitáře (4. 11. 2026): typecheck, lint, 23 testů, build, 33 testů v prohlížeči (e2e 375 a 1280 px, axe) prošly.
- Test produkčních adres (`tests/jednotky/adresy.test.ts`): hlídá `.env.production` (firemní web codekomweb.vercel.app, ukázka obce codekom.vercel.app) a odkazy do ukázky z `src/lib/demo.ts`. Typecheck, lint, 28 jednotkových testů, build a 33 testů v prohlížeči prošly.
- Úvod: fotka v hero nahrazena pozadím `.zare` bez fotky. Karusel na úvodu ukazuje všech 20 šablon (komponenta `Karusel`). Typecheck, lint, build, 33 testů v prohlížeči prošlo.
- Úvod: pozadí hero je skutečná fotka cesty za úsvitu (`public/fotky/uvod-cesta.webp`, bez poznámky o AI, je to fotka, ne vygenerovaný obrázek). Přidán slogan „Ukážeme vám cestu.“. Typecheck, lint, 28 jednotkových testů, build a 33 testů v prohlížeči prošlo.
