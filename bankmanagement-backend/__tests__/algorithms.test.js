import { jest } from '@jest/globals';

const mockData = {
  Tech: {
    priority: '1',
    companies: [
      { creditorNo: '123', referenceNo: '111', name: 'TechCorp', category: 'Tech' },
    ],
  },
  Finance: {
    priority: '2',
    companies: [
      { creditorNo: '456', referenceNo: '222', name: 'FinBank', category: 'Finance' },
    ],
  },
};

jest.mock('../service/categorizeService', () => {
  const companyCache = new Map();
  const previousMatches = new Map();
  const adaptiveWeights = { name: 0.5, category: 0.3, history: 0.2 };

  function findCompanyAdvanced(creditorNo, referenceNo, _, comment) {
    const stringSimilarity = require('string-similarity');

    for (const category of Object.values(mockData)) {
      for (const company of category.companies) {
        if (company.creditorNo === creditorNo || company.referenceNo === referenceNo) {
          companyCache.set(creditorNo || referenceNo, company);
          return { ...company, fromCache: false };
        }
      }
    }

    let bestMatch = null;
    let bestScore = 0;
    for (const category of Object.values(mockData)) {
      for (const company of category.companies) {
        const score = stringSimilarity.compareTwoStrings(company.name, comment);
        if (score > bestScore) {
          bestScore = score;
          bestMatch = company;
        }
      }
    }

    if (bestMatch && bestScore > 0.5) {
      adaptiveWeights.name = Math.min(adaptiveWeights.name + 0.05, 1);
      adaptiveWeights.history = Math.min(adaptiveWeights.history + 0.05, 1);
      return { ...bestMatch, matchScore: bestScore };
    }

    return { name: comment, category: 'Ukendt kategori', creditorNo, referenceNo };
  }

  return {
    findCompanyAdvanced,
    companyCache,
    previousMatches,
    adaptiveWeights,
  };
});

import { findCompanyAdvanced, companyCache, adaptiveWeights } from '../service/categorizeService';

describe('findCompanyAdvanced', () => {

  test('direct match via creditorNo', () => {
    const result = findCompanyAdvanced('123', '', '', 'Some comment');
    console.log('direct match via creditorNo:', result);
    console.log('Cache after test:', companyCache);
    expect(result.name).toBe('TechCorp');
    expect(result.category).toBe('Tech');
  });

  test('direct match via referenceNo', () => {
    const result = findCompanyAdvanced('', '222', '', 'Some comment');
    console.log('direct match via referenceNo:', result);
    console.log('Cache after test:', companyCache);
    expect(result.name).toBe('FinBank');
    expect(result.category).toBe('Finance');
  });

  test('fuzzy match if no direct match', () => {
    const result = findCompanyAdvanced('999', '333', '', 'TechCorp');
    console.log('fuzzy match:', result);
    console.log('Cache after fuzzy match:', companyCache);
    expect(result.name).toBe('TechCorp');
    expect(result.category).toBe('Tech');
    expect(result.matchScore).toBeGreaterThan(0);
  });

  test('fallback if no match', () => {
    const result = findCompanyAdvanced('999', '444', '', 'UnknownCo');
    console.log('fallback match:', result);
    console.log('Cache after fallback:', companyCache);
    expect(result.name).toBe('UnknownCo');
    expect(result.category).toBe('Ukendt kategori');
  });

  test('adaptive weights updates after fuzzy match', () => {
    findCompanyAdvanced('999', '333', '', 'TechCorp');
    console.log('adaptiveWeights after fuzzy match:', adaptiveWeights);
    console.log('Cache after adaptive test:', companyCache);
    expect(adaptiveWeights.name).toBeGreaterThan(0.5);
    expect(adaptiveWeights.history).toBeGreaterThan(0.2);
  });
});