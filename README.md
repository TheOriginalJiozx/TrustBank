Klik [her](EVALUERING.md) for at læse vores EVALUERING.md.

<a id="readme-top"></a>

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]

<!-- PROJEKT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/TheOriginalJiozx/TrustBank">
    <img src="readme_images/logo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">TrustBank README</h3>

<p align="center">
    <br />
    <a href="https://github.com/TheOriginalJiozx/TrustBank"><strong>Udforsk dokumentationen »</strong></a>
    <br />
    <br />
    <a href="https://github.com/TheOriginalJiozx/TrustBank">Se Demo</a>
    &middot;
    <a href="https://github.com/TheOriginalJiozx/TrustBank/issues/new?labels=bug&template=bug-report---.md">Rapporter fejl</a>
    &middot;
    <a href="https://github.com/TheOriginalJiozx/TrustBank/issues/new?labels=enhancement&template=feature-request---.md">Anmod om funktion</a>
  </p>
</div>

<!-- INDHOLDSFORTEGNELSE -->
<details>
  <summary>Indholdsfortegnelse</summary>
  <ol>
    <li>
      <a href="#about-the-project">Om Projektet</a>
      <ul>
        <li><a href="#built-with">Bygget Med</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Kom Godt I Gang</a>
      <ul>
        <li><a href="#prerequisites">Forudsætninger</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Brug</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Bidrag</a></li>
    <li><a href="#contact">Kontakt</a></li>
    <li><a href="#acknowledgments">Tak</a></li>
  </ol>
</details>

<!-- OM PROJEKTET -->
## Om Projektet

[![Produkt Skærmbillede][product-screenshot]](https://localhost:3000)

# Intelligent Virksomhedskategorisering for Banktransaktioner

Dette projekt har til formål at automatisere og forbedre kategorisering af banktransaktioner. Systemet identificerer virksomheder ud fra forskellige betalingsdata som `creditorNo`, `referenceNo` og `fikNo`, samt information fra kommentarer på transaktioner.

## Funktioner

- **Hurtigt opslag via Map-struktur**
  - Virksomheder gemmes i en mappe-struktur for hurtig og effektiv adgang, selv ved store datamængder.

- **Intelligent matchscore**
  - Direkte match på betalingsdata foretrækkes.
  - Hvis direkte match ikke findes, beregnes et score-baseret match baseret på:
    - Tekstlig lighed mellem transaktion og virksomhedsnavn
    - Historiske matches
    - Kategoriforhold og prioritering
  - Højest scorende match vælges.

- **Adaptiv cache og læring**
  - Tidligere matches gemmes for at optimere fremtidige søgninger.
  - Cachen forbedrer både performance og præcision over tid.

- **Kategorisering og rapportering**
  - Virksomheder grupperes i relevante kategorier som Dagligvarer, Transport, Streaming, Bank & Økonomi osv.
  - Understøtter analyser, rapporter og kundeindsigt.

## Formål

Denne løsning hjælper banken med at:  

- Automatisere store dele af transaktionshåndteringen  
- Reducere manuel indsats  
- Tilbyde kunderne mere præcise kategoriseringer og bedre indsigt i deres forbrug

<p align="right">(<a href="#readme-top">til toppen</a>)</p>

### Bygget Med

Dette afsnit viser de vigtigste frameworks/biblioteker brugt til at starte projektet. Eventuelle ekstra plugins kan nævnes under tak. Her er nogle eksempler:

* [![Next][Next.js]][Next-url]
* [![React][React.js]][React-url]
* [![Lucide-React][Lucide-React.ts]][Lucide-React-url]
* [![Tailwind][TailwindCSS]][TailwindCSS-url]

<p align="right">(<a href="#readme-top">til toppen</a>)</p>

## Kom Godt I Gang

### Forudsætninger

Installér seneste version af npm

* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Klon repositoriet
   ```sh
   git clone https://github.com/TheOriginalJiozx/TrustBank.git
   ```
2. Installér NPM packages
   ```sh
   npm install
   ```
3. Skift git remote url for at undgå uheldige pushes til base project
   ```sh
   git remote set-url origin github_username/repo_name
   git remote -v # confirm the changes
   ```

<p align="right">(<a href="#readme-top">til toppen</a>)</p>

### Kør projektet

1. Start frontend i en terminal
   ```sh
   npm start
   ```
2. Start backend i en anden terminal
   ```sh
   npm run dev
   ```

<!-- BRUGSEKSEMPLER -->
## Brug

Brug dette afsnit til at vise nyttige eksempler på, hvordan projektet kan anvendes. Skærmbilleder, kodeeksempler og demoer fungerer godt her. Du kan også linke til yderligere ressourcer.

<p align="right">(<a href="#readme-top">til toppen</a>)</p>

<!-- ROADMAP -->
## Roadmap

- [x] CRUD for transaktioner
- [x] Test algoritmerne på rigtig data

Se [åbne issues](https://github.com/TheOriginalJiozx/TrustBank/issues) for en komplet liste over foreslåede funktioner (og kendte problemer).

<p align="right">(<a href="#readme-top">til toppen</a>)</p>

<!-- BIDRAG -->
## Bidrag

Bidrag er det, der gør open source-community så fantastisk at lære, inspirere og skabe. Enhver form for bidrag er meget værdsat.

Hvis du har en idé til forbedringer, kan du fork repoen og lave en pull request. Du kan også blot oprette en issue med tagget "enhancement".  
Glem ikke at give projektet en stjerne! Tak!

1. Fork projektet
2. Opret din feature-branch (`git checkout -b feature/AmazingFeature`)
3. Commit dine ændringer (`git commit -m 'Tilføj AmazingFeature'`)
4. Push til branchen (`git push origin feature/AmazingFeature`)
5. Lav en Pull Request

### Top contributors:

<a href="https://github.com/TheOriginalJiozx/TrustBank/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=TheOriginalJiozx/TrustBank&nocache=1" alt="contrib.rocks image" />
</a>

<p align="right">(<a href="#readme-top">til toppen</a>)</p>

<!-- KONTAKT -->
## Kontakt

Omar Al-Ali - [TheOriginalJiozx](https://github.com/TheOriginalJiozx)<p />
Yasin Dhalin - [Dhalinn](https://github.com/Dhalinn) <p />
Maksym Yuzefovych - [Maksyuze](https://github.com/maksyuze456)

Projekt Link: [https://github.com/TheOriginalJiozx/TrustBank](https://github.com/TheOriginalJiozx/TrustBank)

<p align="right">(<a href="#readme-top">til toppen</a>)</p>

<!-- SPECIELT TAK TIL -->
## Specielt tak til

* [Img Shields](https://shields.io)
* [Lucide React Icons](https://react-icons.github.io/react-icons/icons/lu/)

<p align="right">(<a href="#readme-top">til toppen</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/TheOriginalJiozx/TrustBank.svg?style=for-the-badge
[contributors-url]: https://github.com/TheOriginalJiozx/TrustBank/graphs/contributor
[forks-shield]: https://img.shields.io/github/forks/TheOriginalJiozx/TrustBank.svg?style=for-the-badge
[forks-url]: https://github.com/TheOriginalJiozx/TrustBank/network/members
[stars-shield]: https://img.shields.io/github/stars/TheOriginalJiozx/TrustBank.svg?style=for-the-badge
[stars-url]: https://github.com/TheOriginalJiozx/TrustBank/stargazers
[issues-shield]: https://img.shields.io/github/issues/TheOriginalJiozx/TrustBank.svg?style=for-the-badge
[issues-url]: https://github.com/TheOriginalJiozx/TrustBank/issues&nocache=1
[product-screenshot]: readme_images/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React.js-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Lucide-React.ts]: https://img.shields.io/badge/-LUCIDE--REACT-000000?style=for-the-badge&logo=lucide
[Lucide-React-url]: https://lucide.dev/
[TailwindCSS]: https://img.shields.io/badge/Tailwind_CSS-black?style=for-the-badge&logo=tailwind-css
[TailwindCSS-url]: https://tailwindcss.com/
