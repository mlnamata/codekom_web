# Připravenost firemního webu k prodeji

Stav k 20. 11. 2026, repozitář `mlnamata/codekom_web`, adresa https://codekomweb.vercel.app. Web je technicky hotový. Než začnete prodávat, doplňte údaje o firmě, nechte zkontrolovat smlouvy a ověřte položky z druhé části.

## Co je zkontrolované a opravené

| Oblast | Výsledek |
| --- | --- |
| Kontroly kódu | typecheck, lint a 37 testů jednotek projdou |
| Texty | `pnpm obsah` hlásí bez nálezů ve 56 souborech (zakázaná slova, procenta bez záznamu v registru tvrzení, tvar hesla) |
| Sestavení | `pnpm build` projde |
| Prohlížeč | 51 testů projde: klíčové cesty na 375 a 1280 px a přístupnost (axe, WCAG 2.2 AA) všech stránek včetně nových |
| Průchod webem | 43 stránek v sitemap na 375 a 1280 px, 48 interních odkazů: žádný rozbitý odkaz ani obrázek, žádná chyba v konzoli, žádné přetékání do strany, každá stránka má title, description a kanonickou adresu |
| Ceny | ceník, kalkulačka, katalog a PDF mají shodné částky (590 Kč měsíčně, nasazení 4 900 Kč, hodina experta 750 Kč, AI hlasový bot 0,15 Kč za sekundu). Cena pomoci s dotacemi na stránce Dotace byla `[DOPLNIT]`, teď je „od 4 500 Kč za žádost“ jako v ceníku |
| PDF ke stažení | všech 5 přegenerováno podle aktuálního ceníku a smluv (`PW_CHROMIUM=/opt/pw-browsers/chromium pnpm pdf`) |
| Zastaralé texty | omezení „do 2 000 obyvatel“ je pryč, zbylé „2 000“ jsou hranice velikostních pásem ceníku. Počty odpovídají 23 šablonám a 69 variantám, názvy šablon jsou hvězdy |
| Cesta ke kontaktu | odkaz na Kontakt je na každé stránce |
| Spolupráce | nově na úvodu čtyři kroky od výběru šablony ke spuštění, odkaz na celý postup přechodu |
| Právní stránky | nově Obchodní podmínky (`/obchodni-podminky`, návrh k revizi advokátem, text z článků 1 až 11 smlouvy), v patičce, na stránce Ke stažení a v sitemap. Zásady osobních údajů, Cookies a Prohlášení o přístupnosti už byly |
| SEO a provoz | sitemap, robots, kanonické adresy s `https://codekomweb.vercel.app`, favicon, manifest, OpenGraph obrázek a česká stránka 404 jsou v pořádku |

## Co musíte udělat vy

### 1. Vyplnit údaje o firmě (jedním místem)

Údaje se dosadí místo `[DOPLNIT: …]` na celém webu z proměnných ve Vercelu (Settings, Environment Variables) nebo do `.env.production`. Nejsou tajné.

| Proměnná | Kde se objeví |
| --- | --- |
| `FIRMA_ICO` | Kontakt, O nás, Obchodní podmínky, Zásady osobních údajů, patička |
| `FIRMA_SIDLO` | Kontakt, O nás, Obchodní podmínky, Zásady osobních údajů |
| `FIRMA_ADRESA` | Kontakt |
| `FIRMA_EMAIL` | Kontakt, Dotace, Úvod, Prohlášení o přístupnosti, Zásady osobních údajů, odkazy „Napište nám“ |
| `FIRMA_TELEFON` | Kontakt, Prohlášení o přístupnosti |
| `FIRMA_DOBA` | Kontakt |
| `FIRMA_DATOVA_SCHRANKA` | Kontakt |
| `FIRMA_HOLDING` | O nás |

Firma CodeKom s.r.o. zatím není založená, takže IČO, sídlo a datová schránka čekají na založení. Název CodeKom ověřte před založením v ARES, v databázi ochranných známek a u domény. Pozor na podobnost s firmou CODEKON s.r.o. ze Štěpánkovic (`docs/pravni-dokumenty.md`).

### 2. Texty, které zná jen zakladatel

| Soubor | Co chybí |
| --- | --- |
| `obsah/prezentace/o-nas.md` | jména, fotky a krátké životopisy lidí z týmu, pilotní obce |
| `obsah/prezentace/pristupnost.md` | datum přípravy a přezkumu prohlášení, popis ručního průchodu (čtečka, prohlížeč), nedostatky zjištěné při testech |
| `obsah/prezentace/zasady-osobnich-udaju.md` | datum, e-mailová služba a hosting, kde poběží záznamy a jak dlouho se uchovávají |
| `obsah/prezentace/bezpecnost-a-pravo.md` | poskytovatel serveru, e-mailová služba, SMS brána, doložky pro přenos dat mimo EU |
| `obsah/prezentace/obchodni-podminky.md` | ceník jako příloha, platební brána, pojištění |
| `obsah/prezentace/cenik.md` | rozdíl mezi roční a měsíční platbou |
| `obsah/prezentace/prechod.md` | doba migrace |
| `obsah/prezentace/dotace.md` | datum posledního ověření přehledu výzev |
| `obsah/prezentace/katalog.md`, `src/lib/cenik.ts` | ceny zařízení v katalogu (13 zařízení z IoT zadání) |

### 3. Ověřit a nechat zkontrolovat

- Smlouvy a obchodní podmínky musí před podpisem první smlouvy zkontrolovat advokát. Body ke kontrole jsou na konci článku A v `docs/pravni-dokumenty.md` (limit odpovědnosti a pojištění, jednostranná změna podmínek, smluvní pokuty, příloha 4 pro obce podle zákona č. 264/2025 Sb., DPH).
- Registr tvrzení `docs/tvrzeni-prezentace.md` má položky ve stavu `neovereno` a `hypoteza`. Na webu jsou označené `[OVĚŘIT]`. Hlavně ceny hlasového bota (odhad nákladů, ověřit proti ceníkům dodavatelů), funkce zařízení (Nuki bez internetu, Danfoss okno a předtopení, koordinátor ZBT-2 v Zigbee i Thread) a postavení CodeKomu podle CRA.
- Před nasazením nahradit odkazy na zakonyprolidi.cz odkazem na e-Sbírku (poznámka v registru tvrzení).
- Doména: nastavit vlastní doménu CodeKom místo `codekomweb.vercel.app` a změnit `NEXT_PUBLIC_SITE_URL`. Spustit `node scripts/kontrola-doplnit.mjs --prisne`, které končí chybou, dokud na webu zbývá `[DOPLNIT]`.

### 4. Nasazení

Vercel projekt napojit na repozitář `mlnamata/codekom_web`, Root Directory je kořen, region `fra1` je ve `vercel.json`. Proměnné z části 1 přidat do prostředí Production.

## Co zatím není

- Nové fotografie: klíč `GEMINI_API_KEY` v cloudovém prostředí chybí, web používá 23 existujících fotek s vodoznakem AI.
- Poptávkový formulář a newsletter jsou záměrně odložené (web nesbírá žádná data). Kontakt je telefon a e-mail.
- Aplikace a IoT brána jsou v repozitáři `mlnamata/codecom_app`, tento web je jen prezentuje.

## Počty zbývajících značek (`node scripts/kontrola-doplnit.mjs`)

`[DOPLNIT]`: 81, `[OVĚŘIT]`: 43. Většina `[DOPLNIT]` zmizí vyplněním proměnných `FIRMA_*` z části 1 a cen zařízení.
