## Dokumentation af AI-brug i projektet

### Oversigt

I dette projekt har AI været brugt til forskellige formål, herunder:

* Styling af frontend
* Forslag til fejlrettelser, især ved fuzzy matching
* Oprettelse af datastrukturer (arrays med virksomheder og `referenceNo` m.m.)
* Oprettelse af tests

### Beskrivelse af AI-brugen

1. **Fuzzy matching**

   * AI blev brugt til at analysere og forbedre vores fuzzy match-algoritme, som havde problemer med skæve matches.
   * Vi fik idéen til at implementere `wholeWordSimilarity` i stedet for `StringSimilarity` for at forbedre matchingen.

   **Typiske prompts:**

   * "Vores fuzzy match algoritme matcher Cooking med Booking, hvorfor gør den det?"
   * "Vores fuzzy match læser (...) og af den grund matcher den ikke med noget." (fx "&")
   * "Hvordan kan vi tilføje (...) som støj så den ikke læser det?"

   **Andre prompts:**

   * "Hvordan kan vi få vores fuzzy match til at ignore virksomhedsnavne med mindre end 3 bogstaver pånær hvis det er hele virksomhedens navn?"
   * "Hvordan kan vi få fuzzy match til at finde virksomhedens navn og så ignorere resten hvis der f.eks står "LIDL204KBHHUNDIGE" eller lign."
   * "Vi vil gerne tilføje et boost for enkelte-ord firmaer"
   * "Kan du tilføje nogle kommentarer på dansk"

2. **Kodegenerering og styling**

   * AI blev brugt til at forbedre kodestilen og sikre bedre læsbarhed.
   * AI blev brugt til styling af frontend.
   * AI blev anvendt til at tilføje kommentarer.

3. **Dataoprettelse**

   * AI blev brugt til at generere et array med virksomheder samt tildele dem `referenceNo` og andre attributter.

4. **Tests**

   * AI blev brugt til at oprette tests, hvilket hjalp med at sikre korrekt funktionalitet af algoritmerne.

5. **Micrebenchmarking**

   * AI blev brugt til at lave vores microbenchmarking, hvilket hjalp os med at bekræfte de tænkte asymptotiske kompleksiteter, så vi havde en form for belæg (3 i alt).

### AI-værktøjer brugt

* Vi har brugt AI gennem chatbots (ChatGPT).
* Prompts blev brugt løbende under udviklingen, men blev ikke gemt i commit-beskeder.

### Konklusion

AI har primært fungeret som et værktøj til idéudvikling, fejlsøgning og kodestøtte, hvilket har forbedret vores fuzzy matching, datahåndtering, testdækning og frontend-styling.
