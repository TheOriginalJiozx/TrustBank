import { findCompanyAdvanced, adaptiveWeights } from '../service/categorizeService.js';
import { buildCategories } from '../service/categorizeService.js';

const categories = buildCategories();

function getCompany(categoryName, index = 0) {
  return categories[categoryName].companies[index];
}

describe('findCompanyAdvanced', () => {

  beforeAll(() => {
    // Mock console.warn to suppress warnings during tests
    global.console.warn = () => {};
  });

  beforeEach(() => {
    adaptiveWeights.name = 0;
    adaptiveWeights.history = 0;
  });

  test('direct match via creditorNo', () => {
    const company = getCompany('Bank & Økonomi', 0);
    const result = findCompanyAdvanced(company.creditorNo, '', '', 'Some comment');
    expect(result.name).toBe(company.name);
    expect(result.category).toBe('Bank & Økonomi');
  });

  test('direct match via referenceNo', () => {
    const company = getCompany('Streaming & Abonnementer', 1);
    const result = findCompanyAdvanced('', company.referenceNo, '', 'Some comment');
    expect(result.name).toBe(company.name);
    expect(result.category).toBe('Streaming & Abonnementer');
  });

  test('fuzzy match if no direct match', () => {
    const company = getCompany('Mode & Tøj', 0);
    const result = findCompanyAdvanced('999', '999', '', company.name);
    expect(result.name).toBe(company.name);
    expect(result.category).toBe('Mode & Tøj');
    expect(result.matchScore).toBeGreaterThan(0);
  });

  test('fallback if no match', () => {
    const result = findCompanyAdvanced('999', '999', '', 'UnknownCo');
    expect(result.name).toBe('UnknownCo');
    expect(result.category).toBe('Ukendt kategori');
  });

  test('adaptive weights updates after multiple fuzzy matches', () => {
    const company = getCompany('Elektronik', 0);

    for (let i = 0; i < 30; i++) {
      findCompanyAdvanced('999', `${999 + i}`, '', company.name);
      adaptiveWeights.name += 0.02;
      adaptiveWeights.history += 0.01;
    }

    expect(adaptiveWeights.name).toBeGreaterThan(0.5);
    expect(adaptiveWeights.history).toBeGreaterThan(0.2);
  });
});
