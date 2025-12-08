import fs from 'fs';
import csv from 'csv-parser';
import { findCompanyAdvanced, companyCache, previousMatches } from '../service/categorizeService.js';

const inputFile = '../realdata/bank.csv';
const outputFile = '../realdata/bank_results.csv';
const debugFile = '../realdata/debug_log.txt';
const benchmarkFile = '../realdata/benchmark_results.json';
const chartFile = '../../public/benchmark_charts.html';

const dataset = [];
const resultsPerPass = [];

fs.writeFileSync(debugFile, '=== DEBUG LOG START ===\n\n', 'utf8');

fs.createReadStream(inputFile)
  .pipe(csv({ separator: ';' }))
  .on('data', (row) => {
    dataset.push({
      dato: row["Dato"],
      tekst: row["Tekst"],
      kategori_bank: row["Kategori"],
    });
  })
  .on('end', () => {
    console.log("✔ CSV indlæst. Kører cold og warm cache tests...");

    runPass("cold-cache", true);
    runPass("warm-cache", false);

    writeOutputs();
  });

function resetCacheState() {
  companyCache.clear();
  previousMatches.clear();
  delete global.companyIndex;
}

function runPass(passName, resetCacheFirst) {
  if (resetCacheFirst) resetCacheState();

  const rows = [];
  const timings = [];

  for (const row of dataset) {
    const { tekst: comment, kategori_bank: actualCategory, dato } = row;

    const startTime = Date.now();
    const result = findCompanyAdvanced("", "", "", comment);
    const duration = Date.now() - startTime;
    timings.push(duration);

    let debugText = '';
    debugText += `=== DEBUG COMMENT (${passName}) ===\n`;
    debugText += `Original comment: ${comment}\n`;
    debugText += `Kørselstid: ${duration}ms\n`;
    debugText += "Result fra findCompanyAdvanced:\n";
    debugText += `  Matched company: ${result.name}\n`;
    debugText += `  Matched category: ${result.category}\n`;
    debugText += `  Match score: ${result.matchScore || 0}\n`;
    debugText += "=====================\n\n";

    fs.appendFileSync(debugFile, debugText, 'utf8');

    rows.push({
      pass: passName,
      dato,
      tekst: comment,
      kategori_bank: actualCategory,
      kategori_algoritme: result.category,
      virksomhed_algoritme: result.name,
      matchscore: result.matchScore || 0,
      kørselstid_ms: duration,
    });
  }

  resultsPerPass.push({
    pass: passName,
    timings,
    rows,
    stats: buildStats(timings),
  });
}

function buildStats(timings) {
  const sorted = [...timings].sort((a, b) => a - b);
  const min = Math.min(...timings);
  const max = Math.max(...timings);
  const avg = timings.reduce((a, b) => a + b, 0) / timings.length;
  const median = sorted[Math.floor(sorted.length / 2)];
  const stdDev = Math.sqrt(
    timings.reduce((sq, n) => sq + Math.pow(n - avg, 2), 0) / timings.length
  );

  return {
    totalRuns: timings.length,
    minTime_ms: min,
    maxTime_ms: max,
    avgTime_ms: Number(avg.toFixed(4)),
    medianTime_ms: median,
    stdDev_ms: Number(stdDev.toFixed(4)),
    totalTime_ms: timings.reduce((a, b) => a + b, 0),
  };
}

function writeOutputs() {
  const header = "Pass;Dato;Tekst;Kategori_Bank;Kategori_Algoritme;Virksomhed_Algoritme;MatchScore;Kørselstid_ms\n";
  const lines = resultsPerPass.flatMap(({ rows }) =>
    rows.map(r => `${r.pass};${r.dato};"${r.tekst}";${r.kategori_bank};${r.kategori_algoritme};${r.virksomhed_algoritme};${r.matchscore};${r.kørselstid_ms}`)
  );

  fs.writeFileSync(outputFile, header + lines.join("\n"), "utf8");

  const benchmarkResults = {
    timestamp: new Date().toISOString(),
    passes: resultsPerPass.map(({ pass, stats }) => ({ pass, ...stats })),
  };

  fs.writeFileSync(benchmarkFile, JSON.stringify(benchmarkResults, null, 2), 'utf8');

  generateCharts(benchmarkResults);

  console.log(`\n✔ Test gennemført!\n`);
  for (const stats of benchmarkResults.passes) {
    console.log(`📊 ${stats.pass}:`);
    console.log(`   Antal kørsler: ${stats.totalRuns}`);
    console.log(`   Min tid: ${stats.minTime_ms}ms`);
    console.log(`   Max tid: ${stats.maxTime_ms}ms`);
    console.log(`   Gennemsnit: ${stats.avgTime_ms}ms`);
    console.log(`   Median: ${stats.medianTime_ms}ms`);
    console.log(`   Std Dev: ${stats.stdDev_ms}ms`);
    console.log(`   Total tid: ${stats.totalTime_ms}ms\n`);
  }

  console.log(`Resultater gemt i:\n${outputFile}\nDebug-log gemt i:\n${debugFile}\nBenchmark gemt i:\n${benchmarkFile}\nGrafer gemt i:\n${chartFile}\n`);
}

function generateCharts(benchmarkResults) {
  const coldPass = resultsPerPass.find(p => p.pass === 'cold-cache');
  const warmPass = resultsPerPass.find(p => p.pass === 'warm-cache');

  const coldStats = coldPass.stats;
  const warmStats = warmPass.stats;

  // Calculate percentiles
  function calculatePercentiles(timings) {
    const sorted = [...timings].sort((a, b) => a - b);
    return {
      p50: sorted[Math.floor(sorted.length * 0.50)],
      p75: sorted[Math.floor(sorted.length * 0.75)],
      p95: sorted[Math.floor(sorted.length * 0.95)],
      p99: sorted[Math.floor(sorted.length * 0.99)],
    };
  }

  const coldPercentiles = calculatePercentiles(coldPass.timings);
  const warmPercentiles = calculatePercentiles(warmPass.timings);

  // Create histogram data
  function createHistogram(timings, binSize = 1) {
    const max = Math.max(...timings);
    const bins = Math.ceil(max / binSize) + 1;
    const histogram = new Array(bins).fill(0);
    
    timings.forEach(t => {
      const binIndex = Math.floor(t / binSize);
      histogram[binIndex]++;
    });

    return histogram.map((count, i) => ({ x: i * binSize, y: count }));
  }

  const coldHistogram = createHistogram(coldPass.timings, 0.5);
  const warmHistogram = createHistogram(warmPass.timings, 0.5);

  const html = `<!DOCTYPE html>
<html lang="da">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Benchmark Results - Cache Performance Analysis</title>
  <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 20px;
      min-height: 100vh;
    }
    .container {
      max-width: 1400px;
      margin: 0 auto;
      background: white;
      border-radius: 16px;
      padding: 40px;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    }
    h1 {
      color: #2d3748;
      margin-bottom: 10px;
      font-size: 2.5em;
      font-weight: 700;
    }
    .subtitle {
      color: #718096;
      margin-bottom: 30px;
      font-size: 1.1em;
    }
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      margin-bottom: 40px;
    }
    .stat-card {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 25px;
      border-radius: 12px;
      color: white;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .stat-card h3 {
      font-size: 0.9em;
      opacity: 0.9;
      margin-bottom: 10px;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    .stat-card .value {
      font-size: 2.5em;
      font-weight: 700;
      margin-bottom: 5px;
    }
    .stat-card .label {
      font-size: 0.85em;
      opacity: 0.8;
    }
    .chart-container {
      margin-bottom: 50px;
      background: #f7fafc;
      padding: 30px;
      border-radius: 12px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    }
    .chart-container h2 {
      color: #2d3748;
      margin-bottom: 20px;
      font-size: 1.5em;
    }
    .chart-wrapper {
      position: relative;
      height: 400px;
    }
    .comparison-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 30px;
      background: white;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    }
    .comparison-table th,
    .comparison-table td {
      padding: 15px;
      text-align: left;
      border-bottom: 1px solid #e2e8f0;
    }
    .comparison-table th {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      font-weight: 600;
      text-transform: uppercase;
      font-size: 0.85em;
      letter-spacing: 1px;
    }
    .comparison-table tr:hover {
      background: #f7fafc;
    }
    .improvement {
      color: #48bb78;
      font-weight: 600;
    }
    .metric-name {
      font-weight: 600;
      color: #2d3748;
    }
    footer {
      text-align: center;
      margin-top: 40px;
      padding-top: 20px;
      border-top: 2px solid #e2e8f0;
      color: #718096;
      font-size: 0.9em;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Microbenchmark Results</h1>
    <p class="subtitle">Cache Performance Analysis - Generated ${new Date().toLocaleString('da-DK')}</p>

    <div class="stats-grid">
      <div class="stat-card">
        <h3>Speedup Factor</h3>
        <div class="value">${(coldStats.avgTime_ms / warmStats.avgTime_ms).toFixed(1)}x</div>
        <div class="label">Hurtigere med warm cache</div>
      </div>
      <div class="stat-card">
        <h3>Runtime Reduction</h3>
        <div class="value">${(((coldStats.totalTime_ms - warmStats.totalTime_ms) / coldStats.totalTime_ms) * 100).toFixed(1)}%</div>
        <div class="label">Mindre total runtime</div>
      </div>
      <div class="stat-card">
        <h3>Latency Reduction</h3>
        <div class="value">${(((coldStats.avgTime_ms - warmStats.avgTime_ms) / coldStats.avgTime_ms) * 100).toFixed(1)}%</div>
        <div class="label">Mindre gennemsnitlig latency</div>
      </div>
      <div class="stat-card">
        <h3>Total Runs</h3>
        <div class="value">${coldStats.totalRuns}</div>
        <div class="label">Målinger per pass</div>
      </div>
    </div>

    <div class="chart-container">
      <h2>📊 Latency Distribution (Histogram)</h2>
      <div class="chart-wrapper">
        <canvas id="histogramChart"></canvas>
      </div>
    </div>

    <div class="chart-container">
      <h2>📈 Performance Metrics Comparison</h2>
      <div class="chart-wrapper">
        <canvas id="comparisonChart"></canvas>
      </div>
    </div>

    <div class="chart-container">
      <h2>📉 Percentile Analysis</h2>
      <div class="chart-wrapper">
        <canvas id="percentileChart"></canvas>
      </div>
    </div>

    <table class="comparison-table">
      <thead>
        <tr>
          <th>Metric</th>
          <th>Cold Cache</th>
          <th>Warm Cache</th>
          <th>Improvement</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="metric-name">Average Time</td>
          <td>${coldStats.avgTime_ms.toFixed(4)} ms</td>
          <td>${warmStats.avgTime_ms.toFixed(4)} ms</td>
          <td class="improvement">${(((coldStats.avgTime_ms - warmStats.avgTime_ms) / coldStats.avgTime_ms) * 100).toFixed(1)}% hurtigere</td>
        </tr>
        <tr>
          <td class="metric-name">Median Time (P50)</td>
          <td>${coldPercentiles.p50} ms</td>
          <td>${warmPercentiles.p50} ms</td>
          <td class="improvement">${coldPercentiles.p50 - warmPercentiles.p50} ms forskel</td>
        </tr>
        <tr>
          <td class="metric-name">P95 Latency</td>
          <td>${coldPercentiles.p95} ms</td>
          <td>${warmPercentiles.p95} ms</td>
          <td class="improvement">${(((coldPercentiles.p95 - warmPercentiles.p95) / coldPercentiles.p95) * 100).toFixed(1)}% bedre</td>
        </tr>
        <tr>
          <td class="metric-name">P99 Latency</td>
          <td>${coldPercentiles.p99} ms</td>
          <td>${warmPercentiles.p99} ms</td>
          <td class="improvement">${(((coldPercentiles.p99 - warmPercentiles.p99) / coldPercentiles.p99) * 100).toFixed(1)}% bedre</td>
        </tr>
        <tr>
          <td class="metric-name">Standard Deviation</td>
          <td>${coldStats.stdDev_ms.toFixed(4)} ms</td>
          <td>${warmStats.stdDev_ms.toFixed(4)} ms</td>
          <td class="improvement">${(((coldStats.stdDev_ms - warmStats.stdDev_ms) / coldStats.stdDev_ms) * 100).toFixed(1)}% strammere</td>
        </tr>
        <tr>
          <td class="metric-name">Min Time</td>
          <td>${coldStats.minTime_ms} ms</td>
          <td>${warmStats.minTime_ms} ms</td>
          <td>${coldStats.minTime_ms - warmStats.minTime_ms} ms forskel</td>
        </tr>
        <tr>
          <td class="metric-name">Max Time</td>
          <td>${coldStats.maxTime_ms} ms</td>
          <td>${warmStats.maxTime_ms} ms</td>
          <td class="improvement">${coldStats.maxTime_ms - warmStats.maxTime_ms} ms forskel</td>
        </tr>
        <tr>
          <td class="metric-name">Total Runtime</td>
          <td>${coldStats.totalTime_ms} ms</td>
          <td>${warmStats.totalTime_ms} ms</td>
          <td class="improvement">${(((coldStats.totalTime_ms - warmStats.totalTime_ms) / coldStats.totalTime_ms) * 100).toFixed(1)}% hurtigere</td>
        </tr>
      </tbody>
    </table>

    <footer>
      <p>🔬 Microbenchmark kørt på Node ${process.version} | Test: Cold vs. Warm Cache Performance</p>
    </footer>
  </div>

  <script>
    const chartColors = {
      cold: 'rgba(239, 68, 68, 0.8)',
      warm: 'rgba(34, 197, 94, 0.8)',
      coldBorder: 'rgba(239, 68, 68, 1)',
      warmBorder: 'rgba(34, 197, 94, 1)',
    };

    // Histogram Chart
    new Chart(document.getElementById('histogramChart'), {
      type: 'bar',
      data: {
        datasets: [
          {
            label: 'Cold Cache',
            data: ${JSON.stringify(coldHistogram)},
            backgroundColor: chartColors.cold,
            borderColor: chartColors.coldBorder,
            borderWidth: 1,
          },
          {
            label: 'Warm Cache',
            data: ${JSON.stringify(warmHistogram)},
            backgroundColor: chartColors.warm,
            borderColor: chartColors.warmBorder,
            borderWidth: 1,
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            type: 'linear',
            title: { display: true, text: 'Latency (ms)', font: { size: 14, weight: 'bold' } },
            ticks: { stepSize: 1 }
          },
          y: {
            title: { display: true, text: 'Frequency (antal målinger)', font: { size: 14, weight: 'bold' } },
            beginAtZero: true
          }
        },
        plugins: {
          legend: { display: true, position: 'top' },
          tooltip: {
            callbacks: {
              label: (context) => \`\${context.dataset.label}: \${context.parsed.y} målinger ved ~\${context.parsed.x}ms\`
            }
          }
        }
      }
    });

    // Comparison Chart
    new Chart(document.getElementById('comparisonChart'), {
      type: 'bar',
      data: {
        labels: ['Gennemsnit', 'Median', 'Std Dev', 'Min', 'Max'],
        datasets: [
          {
            label: 'Cold Cache',
            data: [${coldStats.avgTime_ms}, ${coldStats.medianTime_ms}, ${coldStats.stdDev_ms}, ${coldStats.minTime_ms}, ${coldStats.maxTime_ms}],
            backgroundColor: chartColors.cold,
            borderColor: chartColors.coldBorder,
            borderWidth: 2,
          },
          {
            label: 'Warm Cache',
            data: [${warmStats.avgTime_ms}, ${warmStats.medianTime_ms}, ${warmStats.stdDev_ms}, ${warmStats.minTime_ms}, ${warmStats.maxTime_ms}],
            backgroundColor: chartColors.warm,
            borderColor: chartColors.warmBorder,
            borderWidth: 2,
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            title: { display: true, text: 'Tid (ms)', font: { size: 14, weight: 'bold' } },
            beginAtZero: true
          }
        },
        plugins: {
          legend: { display: true, position: 'top' }
        }
      }
    });

    // Percentile Chart
    new Chart(document.getElementById('percentileChart'), {
      type: 'line',
      data: {
        labels: ['P50 (Median)', 'P75', 'P95', 'P99'],
        datasets: [
          {
            label: 'Cold Cache',
            data: [${coldPercentiles.p50}, ${coldPercentiles.p75}, ${coldPercentiles.p95}, ${coldPercentiles.p99}],
            backgroundColor: chartColors.cold,
            borderColor: chartColors.coldBorder,
            borderWidth: 3,
            fill: false,
            tension: 0.4,
            pointRadius: 6,
            pointHoverRadius: 8,
          },
          {
            label: 'Warm Cache',
            data: [${warmPercentiles.p50}, ${warmPercentiles.p75}, ${warmPercentiles.p95}, ${warmPercentiles.p99}],
            backgroundColor: chartColors.warm,
            borderColor: chartColors.warmBorder,
            borderWidth: 3,
            fill: false,
            tension: 0.4,
            pointRadius: 6,
            pointHoverRadius: 8,
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            title: { display: true, text: 'Latency (ms)', font: { size: 14, weight: 'bold' } },
            beginAtZero: true
          }
        },
        plugins: {
          legend: { display: true, position: 'top' },
          tooltip: {
            callbacks: {
              label: (context) => \`\${context.dataset.label}: \${context.parsed.y}ms\`
            }
          }
        }
      }
    });
  </script>
</body>
</html>`;

  fs.writeFileSync(chartFile, html, 'utf8');
}
