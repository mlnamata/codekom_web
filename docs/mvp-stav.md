# Stav MVP prezentačního webu

Celkový test 6. 11. 2026 nad commitem z `main`. Web je technicky hotový: všechny kontroly prošly a ve 39 stránkách nebyla nalezena žádná technická chyba. Před ostrým spuštěním chybí jen údaje o firmě a rozhodnutí níže. Kód je nemají jak vymyslet.

## Co se testovalo

| Kontrola | Výsledek |
|---|---|
| `pnpm typecheck` | prošlo |
| `pnpm lint` | prošlo |
| `pnpm test` | 33 testů prošlo |
| `pnpm obsah` (tvrzení, kontrola obsahu) | prošlo, [DOPLNIT] 72, [OVĚŘIT] 39 ve zdrojích |
| `pnpm build` | prošlo, 39 stránek ze sitemapy |
| `pnpm e2e` (375 a 1280 px) a `pnpm a11y` (axe, WCAG 2.2 AA) | 38 testů prošlo |
| `pnpm odkazy` | 44 interních cílů, 0 chyb. 26 odkazů do ukázky obce (codekom.vercel.app) se z testovacího kontejneru nedalo načíst, protože jeho síť adresu nepouští. Na webu je potřeba je ověřit ručně. |
| Průchod všech 39 stránek v prohlížeči (375 a 1280 px) | bez chyb v konzoli, bez rozbitých obrázků, bez vodorovného přetékání, na každé stránce právě jeden nadpis h1, žádný viditelný nápis „Ilustrační fotografie…“, žádný surový markdown |

Poznámka pro další AI: Playwright v `node_modules` může mít jinou verzi než prohlížeč v kontejneru. Pak testy spusť s `launchOptions.executablePath: '/opt/pw-browsers/chromium'` v dočasném configu, který necommituj.

## Opraveno při testu

- Bezpečnost a právo: tabulka podzpracovatelů roztahovala kartu a stránka na mobilu přetékala do strany. Karta má teď `min-w-0` a tabulka se posouvá uvnitř.
- Bezpečnost a právo: v úvodním pásu byl vidět surový markdown „[Ke stažení](/ke-stazeni)“. Odkazy v perexu se teď vykreslují jako odkazy.
- Číslování karet v přehledech od 10 výše by ukazovalo „010“, teď „10“.

## Blokuje spuštění: údaje o firmě

Na webu jsou vidět jako `[DOPLNIT: …]`. Potřebuji je od zakladatele:

- **IČO** (patička na všech 39 stránkách), **sídlo**, **ID datové schránky**, **adresa** a **úřední doba** (Kontakt, O nás, Zásady osobních údajů).
- **E-mail a telefon** (Kontakt, Prohlášení o přístupnosti, Zásady osobních údajů).
- **Adresa webu CodeKom** do prohlášení o přístupnosti a zásad. Zatím běží na codekomweb.vercel.app, má zůstat, nebo bude vlastní doména?
- **Tým**: jména, fotky a krátký životopis, **název holdingu**, **pilotní obce** (O nás).
- **Dodavatelé**: poskytovatel serveru pro AI asistenta, e-mailová služba, SMS brána (Bezpečnost a právo, Zásady osobních údajů).

## Blokuje spuštění: prohlášení o přístupnosti

Zákon č. 99/2019 Sb. vyžaduje datum přípravy a přezkumu prohlášení, popis ručního průchodu (čtečka, prohlížeč) a seznam nedostatků. Automatické testy prošly, ruční průchod se čtečkou je potřeba udělat a zapsat.

## Může jít ven s označením, doplnit později

- Ceny zařízení ze značkového katalogu a webkamer (`[DOPLNIT: cena zařízení]`).
- Doba migrace (Přechod), cena pomoci s dotacemi a datum ověření dotačních titulů (Dotace).
- Položky `[OVĚŘIT]`: region Vercelu, předání dat mimo EU, GDPR u webkamer, vlastnosti zařízení.

## Čeká na rozhodnutí

- Ceny hlasového bota jsou odhad (`docs/odhad-hlasovy-bot.md`). Před první smlouvou je ověřit proti nabídkám dodavatelů.
- Které doplňky z `docs/navrh-doplnky.md` dát na web.
- ~~Věta o provozu bez internetu~~ opraveno 8. 11. 2026: na úvodu, v Co umíme, FAQ a katalogu teď stojí, že bez internetu jedou topení a čidla a u zámků to záleží na zařízení podle katalogu.
