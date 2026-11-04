# Odhad ceny: AI hlasový bot na telefonní lince

Odhad ze 4. 11. 2026 na pokyn zakladatele. Není to změřený náklad ani nabídka dodavatele. Před prvním podpisem smlouvy ho ověřte proti skutečným ceníkům dodavatelů (`[OVĚŘIT]`). Kurzy: 1 USD ≈ 23 Kč, 1 EUR ≈ 25 Kč. Ceny bez DPH.

## Náklad na jednu minutu hovoru

| Položka | Předpoklad | Kč za minutu |
|---|---|---|
| Příchozí hovor přes VoIP operátora a české číslo | běžný ceník českých VoIP operátorů | 0,30 |
| Rozpoznání řeči (přepis hlasu volajícího) | streamovací přepis kolem 0,01 USD za minutu | 0,25 |
| Jazykový model (odpovědi z dokumentů obce) | 1 000 až 2 000 tokenů za minutu hovoru | 0,30 |
| Syntéza hlasu (kvalitní český hlas) | bot mluví zhruba polovinu hovoru, kolem 0,05 USD za minutu | 1,20 |
| Provoz, záznamy a monitoring | podíl na serverech a úložišti | 0,25 |
| **Celkem** | | **≈ 2,30, počítáme 2,50** |

## Ceny pro obec

Účtuje se po sekundách: obec platí jen čas, kdy bot skutečně hovoří s volajícím, bez zaokrouhlení na celé minuty. Náklad 2,50 Kč za minutu je zhruba 0,042 Kč za sekundu.

Bez paušálu: **0,15 Kč za sekundu** (9 Kč za minutu), žádný měsíční poplatek. Marže kryje nastavení znalostí bota, podporu a výkyvy v cenách dodavatelů.

| Paušál | Měsíčně | Sekund v ceně | Další sekunda | Vychází na sekundu při vyčerpání | Hrubá marže při vyčerpání |
|---|---|---|---|---|---|
| Malý | 490 Kč | 6 000 (100 min) | 0,12 Kč | 0,082 Kč | ≈ 49 % |
| Střední | 1 290 Kč | 18 000 (300 min) | 0,10 Kč | 0,072 Kč | ≈ 42 % |
| Velký | 2 990 Kč | 48 000 (800 min) | 0,08 Kč | 0,062 Kč | ≈ 33 % |

Další sekunda nad paušál dává marži 48–65 % (náklad 0,042 Kč). Nevyčerpané sekundy se nepřevádějí do dalšího měsíce. Počet hovorů na webu je přepočet při průměrné délce hovoru 120 sekund.
