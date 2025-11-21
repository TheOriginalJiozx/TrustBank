# Evaluering af algoritmen og hvordan data bliver håndteret

## 1. Formål med algoritmen
Formålet med algoritmen er at kategorisere transaktioner ved at matche kommentarer og oplysninger fra betalinger med de korrekte virksomheder. Algoritmen kombinerer to tilgange:

- **Direct match**: Hurtig og præcis identifikation af virksomheder via unikke ID’er (`creditorNo` eller `referenceNo`).  
- **Fuzzy match**: Matcher virksomhedens navn med teksten i kommentaren ved at kigge på hele ord og delord. Den kan håndtere sammensatte navne, men retter ikke stavefejl og matcher ikke forkortelser.

Kombinationen sikrer, at transaktioner både kan matches hurtigt og med høj nøjagtighed.

---

## 2. Hvordan data bliver organiseret

- **Set**: `NOISE_TOKENS` og `ALLOWED_SHORT_TOKENS` hjælper med at fjerne “støj” fra teksten. Set gør, at det går hurtigt at tjekke.  
- **Map**: `companyCache` og `companyIndex` gør det hurtigt at finde virksomheder. Direct match er næsten altid instant.  
- **Arrays**: Bruges til at holde styr på ord, delord og lister af virksomheder i kategorier. Det er nemt at loop’e igennem.

---

## 3. Rydder op i data

- `normalizeString` laver al tekst om til lowercase og fjerner specielle tegn.  
- `isNoiseToken` fjerner tal, støjord og enkelte bogstaver, så algoritmen ikke bliver forvirret.

---

## 4. Hvordan matching fungerer

### 4.1 Direct match
- Tjekker ID’er (`creditorNo` eller `referenceNo`) først.  
- Hvis der er et match, er det hurtigt og sikkert.  

### 4.2 Fuzzy match
- Bruges, hvis direct match ikke finder noget.  
- Matcher kommentarens ord med virksomhedens navn. Den kigger på hele ord og ordkombinationer, men matcher ikke forkortelser eller stavefejl.  
- `wholeWordSimilarity` giver point for hvor godt ordene matcher.  
- Algoritmen tjekker også for blokord, `&`-tegn og minimumsgrænser for, hvornår et match er godt nok.  
- Den kan også give ekstra point, hvis historik eller kategori siger, at det er sandsynligt.

---

## 5. Stærke sider

- Direct match rammer altid rigtigt, hvis ID’et er unikt.  
- Fuzzy match kan finde matches, selvom navne er sammensatte eller delt op i flere ord.  
- Datastrukturerne (`Set` og `Map`) gør, at algoritmen er hurtig.  
- Substring fallback gør, at næsten alle betalinger kan kategoriseres.

---

## 6. Svage sider

- Fuzzy match kan tage længere tid, hvis kommentaren er meget lang eller der er mange virksomheder.  
- Blokord og støjlister skal holdes opdateret.  
- Nogle gange skal thresholds justeres for at få bedre matches.  
- Algoritmen kan ikke finde matches, hvis der er stavefejl eller forkortelser.

---

## 7. Konklusion

Kombinationen af direct match og fuzzy match gør, at algoritmen kan kategorisere betalinger ret præcist.  
Direct match håndterer klare ID’er, mens fuzzy match finder det rigtige, selvom kommentaren er kort, lidt rodet eller har ekstra støj, men den finder ikke forkortelser eller stavefejl.