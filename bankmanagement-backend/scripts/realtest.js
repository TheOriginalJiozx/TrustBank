import fs from 'fs';
import csv from 'csv-parser';
import { findCompanyAdvanced } from '../service/categorizeService.js';

const inputFile = '../realdata/bank.csv';
const outputFile = '../realdata/bank_results.csv';
const debugFile = '../realdata/debug_log.txt';

const rows = [];

fs.writeFileSync(debugFile, '=== DEBUG LOG START ===\n\n', 'utf8');

fs.createReadStream(inputFile)
  .pipe(csv({ separator: ';' }))
  .on('data', (row) => {
    const comment = row["Tekst"];
    const actualCategory = row["Kategori"];

    // --- DEBUG LOG START ---
    let debugText = '';
    debugText += "=== DEBUG COMMENT ===\n";
    debugText += `Original comment: ${comment}\n`;

    const result = findCompanyAdvanced("", "", "", comment);

    debugText += "Result fra findCompanyAdvanced:\n";
    debugText += `  Matched company: ${result.name}\n`;
    debugText += `  Matched category: ${result.category}\n`;
    debugText += `  Match score: ${result.matchScore || 0}\n`;
    debugText += "=====================\n\n";

    // Append til debugfil
    fs.appendFileSync(debugFile, debugText, 'utf8');
    // --- DEBUG LOG END ---

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

    console.log(`\n✔ Test gennemført!\nResultater gemt i:\n${outputFile}\nDebug-log gemt i:\n${debugFile}\n`);
  });
