<a id="readme-top"></a>

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/TheOriginalJiozx/TrustBank">
    <img src="readme_images/logo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">TrustBank README</h3>

  <p align="center">
    An awesome README template to jumpstart your projects!
    <br />
    <a href="https://github.com/TheOriginalJiozx/TrustBank"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/TheOriginalJiozx/TrustBank">View Demo</a>
    &middot;
    <a href="https://github.com/TheOriginalJiozx/TrustBank/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    &middot;
    <a href="https://github.com/TheOriginalJiozx/TrustBank/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]](https://localhost:3000)

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

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

This section should list any major frameworks/libraries used to bootstrap your project. Leave any add-ons/plugins for the acknowledgements section. Here are a few examples.

* [![Next][Next.js]][Next-url]
* [![React][React.js]][React-url]
* [![Lucide-React][Lucide-React.ts]][Lucide-React-url]
* [![Tailwind][TailwindCSS]][TailwindCSS-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->
## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/TheOriginalJiozx/TrustBank.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Change git remote url to avoid accidental pushes to base project
   ```sh
   git remote set-url origin github_username/repo_name
   git remote -v # confirm the changes
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Run project

1. Start frontend in a terminal
   ```sh
   npm start
   ```
2. Start backend in another terminal
   ```sh
   npm run dev
   ```

<!-- USAGE EXAMPLES -->
## Usage

Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->
## Roadmap

- [x] CRUD for transaktioner
- [ ] Test algoritmerne på rigtig data

See the [open issues](https://github.com/TheOriginalJiozx/TrustBank/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Top contributors:

<a href="https://github.com/TheOriginalJiozx/TrustBank/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=TheOriginalJiozx/TrustBank&nocache=1" alt="contrib.rocks image" />
</a>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->
## Contact

Omar Al-Ali - [TheOriginalJiozx](https://github.com/TheOriginalJiozx)<p />
Yasin Dhalin - [Dhalinn](https://github.com/Dhalinn) <p />
Maksym Yuzefovych - [Maksyuze](https://github.com/maksyuze456)

Project Link: [https://github.com/TheOriginalJiozx/TrustBank](https://github.com/TheOriginalJiozx/TrustBank)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

Use this space to list resources you find helpful and would like to give credit to. I've included a few of my favorites to kick things off!

* [Img Shields](https://shields.io)
* [Lucide React Icons](https://react-icons.github.io/react-icons/icons/lu/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

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
