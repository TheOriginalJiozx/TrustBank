import React, { useState } from 'react';

export default function AlgorithmVisualizer({ creditorNo, referenceNo, fikNo, comment }) {
  const [steps, setSteps] = useState([]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const visualizeMatch = async () => {
    setLoading(true);
    setSteps([]);
    setCurrentStep(0);
    setResult(null);

    try {
      const response = await fetch('http://localhost:3001/api/visualize-match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          creditorNo,
          referenceNo,
          fikNo,
          comment,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSteps(data.steps);
        setResult(data.result);
        data.steps.forEach((step, idx) => {
          setTimeout(() => setCurrentStep(idx + 1), idx * 800);
        });
      }
    } catch (error) {
      console.error('Error visualizing match:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full rounded-xl bg-gradient-to-br from-slate-50 via-white to-slate-100 p-6 shadow-lg border border-slate-200">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Algoritme Visualisering</h2>
          <p className="text-sm text-slate-500">Se hvordan matchingen sker trin for trin</p>
        </div>
        <button
          onClick={visualizeMatch}
          disabled={loading}
          className={`inline-flex items-center justify-center rounded-lg px-4 py-2 text-white font-semibold shadow transition transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${loading ? 'bg-indigo-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}`}
        >
          {loading ? 'Kører...' : 'Kør Matching'}
        </button>
      </div>

      <div className="mt-6 flex flex-col gap-4">
        {steps.map((step, idx) => {
          const completed = idx < currentStep;
          const active = idx === currentStep - 1;
          return (
            <div
              key={idx}
              className={`rounded-xl border transition shadow-sm ${completed ? 'border-emerald-200 bg-emerald-50' : active ? 'border-indigo-200 bg-indigo-50' : 'border-slate-200 bg-white'} ${active ? 'ring-1 ring-indigo-300' : ''}`}
            >
              <div className="flex flex-col gap-2 p-4">
                <div className="flex flex-wrap items-center gap-3">
                  <span className={`inline-flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold text-white ${completed ? 'bg-emerald-500' : 'bg-indigo-500'}`}>
                    {idx + 1}
                  </span>
                  <h3 className="text-lg font-semibold text-slate-900 flex-1 min-w-[200px]">{step.title}</h3>
                  {step.confidence && (
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${step.confidence.toLowerCase() === 'høj' ? 'bg-emerald-100 text-emerald-700' : step.confidence.toLowerCase() === 'medium' ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700'}`}>
                      {step.confidence}
                    </span>
                  )}
                  {step.score !== undefined && (
                    <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-semibold">
                      Score: {(step.score * 100).toFixed(1)}%
                    </span>
                  )}
                  <span className="ml-auto text-xl">{completed ? '✅' : active ? '⏳' : '⏹️'}</span>
                </div>

                <p className="text-sm text-slate-600 ml-11">{step.description}</p>

                {step.data && (
                  <div className="ml-11 rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm text-slate-800 max-h-80 overflow-auto">
                    {Array.isArray(step.data) ? (
                      <div className="flex flex-col gap-2">
                        {step.data.map((item, i) => (
                          <div key={i} className="rounded bg-white p-2 border border-slate-200">
                            {typeof item === 'object' ? JSON.stringify(item, null, 2) : String(item)}
                          </div>
                        ))}
                      </div>
                    ) : typeof step.data === 'object' ? (
                      step.stage === 'candidates_evaluated' && step.data.topCandidates ? (
                        <div className="flex flex-col gap-3">
                          {step.data.topCandidates.map((cand, i) => (
                            <div key={i} className="grid md:grid-cols-[60px_1fr_auto] grid-cols-1 gap-3 items-center rounded-lg border border-slate-200 bg-white p-3">
                              <div className="text-indigo-600 font-bold text-center">#{i + 1}</div>
                              <div className="flex flex-col gap-1">
                                <div className="font-semibold text-slate-900">{cand.name}</div>
                                <div className="text-xs text-slate-500">{cand.category}</div>
                              </div>
                              <div className="flex flex-wrap gap-2 justify-end text-xs">
                                <div className="px-2 py-1 rounded bg-slate-100 text-slate-700">Navn {(cand.nameScore * 100).toFixed(1)}%</div>
                                <div className="px-2 py-1 rounded bg-slate-100 text-slate-700">Kategori {(cand.categoryBonus * 100).toFixed(1)}%</div>
                                <div className="px-2 py-1 rounded bg-slate-100 text-slate-700">Historie {(cand.historyBoost * 100).toFixed(1)}%</div>
                                <div className="px-2 py-1 rounded bg-indigo-600 text-white font-semibold">Total {(cand.combinedScore * 100).toFixed(1)}%</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <pre className="whitespace-pre-wrap break-words text-xs">{JSON.stringify(step.data, null, 2)}</pre>
                      )
                    ) : (
                      <pre className="whitespace-pre-wrap break-words text-xs">{String(step.data)}</pre>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {result && (
        <div className="mt-6 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 p-5 text-white shadow-lg">
          <h3 className="text-xl font-bold mb-3">📊 Resultat</h3>
          <div className="grid gap-3">
            <div className="flex flex-wrap justify-between gap-2 bg-white/10 px-3 py-2 rounded-lg">
              <span className="font-semibold">Virksomhed:</span>
              <span className="font-medium">{result.name}</span>
            </div>
            <div className="flex flex-wrap justify-between gap-2 bg-white/10 px-3 py-2 rounded-lg">
              <span className="font-semibold">Kategori:</span>
              <span className="font-medium">{result.category}</span>
            </div>
            {result.matchScore !== undefined && (
              <div className="flex flex-wrap justify-between gap-2 bg-white/10 px-3 py-2 rounded-lg">
                <span className="font-semibold">Score:</span>
                <span className="font-medium">{(result.matchScore * 100).toFixed(1)}%</span>
              </div>
            )}
            {result.fromCache && (
              <div className="flex flex-wrap justify-between gap-2 bg-white/10 px-3 py-2 rounded-lg">
                <span className="font-semibold">Kilde:</span>
                <span className="font-medium">Fra Cache (⚡ Blitzhurtig)</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}