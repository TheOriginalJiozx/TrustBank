import fs from 'fs';
import csv from 'csv-parser';
import { findCompanyAdvanced } from '../service/categorizeService.js';

const inputFile = '../realdata/bank.csv';
const outputFile = '../realdata/bank_results.csv';

const rows = [];

fs.createReadStream(inputFile)
  .pipe(csv({ separator: ';' }))
  .on('data', (row) => {
    const comment = row["Tekst"];
    const actualCategory = row["Kategori"];

    const result = findCompanyAdvanced("", "", "", comment);

    rows.push({
      dato: row["Dato"],
      tekst: comment,
      kategori_bank: actualCategory,
      kategori_algoritme: result.category,
      virksomhed_algoritme: result.name,
      matchscore: result.matchScore || 0,
    });
  })
  .on('end', () => {
    console.log("✔ CSV indlæst. Skriver resultater...");

    const header = "Dato;Tekst;Kategori_Bank;Kategori_Algoritme;Virksomhed_Algoritme;MatchScore\n";
    const lines = rows.map(r =>
      `${r.dato};"${r.tekst}";${r.kategori_bank};${r.kategori_algoritme};${r.virksomhed_algoritme};${r.matchscore}`
    );

    fs.writeFileSync(outputFile, header + lines.join("\n"), "utf8");

    console.log(`\n✔ Test gennemført!\nResultater gemt i:\n${outputFile}\n`);
  });