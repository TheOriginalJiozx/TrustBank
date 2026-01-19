import { findCompanyAdvancedWithSteps } from '../../service/categorizeService.js';
import NextCors from 'nextjs-cors';

export default async function handler(req, res) {
  await NextCors(req, res, {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'OPTIONS'],
    optionsSuccessStatus: 200,
  });

  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method === 'POST') {
    const {
      creditorNo = '',
      referenceNo = '',
      fikNo = '',
      comment = '',
    } = req.body;

    try {
      const { result, steps } = findCompanyAdvancedWithSteps(
        creditorNo,
        referenceNo,
        fikNo,
        comment
      );

      return res.status(200).json({
        success: true,
        result,
        steps,
        timestamp: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
          .toISOString()
          .replace(/Z$/, ""),
      });
    } catch (error) {
      console.error('Fejl i visualize-match:', error);
      return res.status(500).json({
        success: false,
        error: 'Intern serverfejl under visualisering',
      });
    }
  }

  return res.status(405).json({ error: 'Metode ikke tilladt' });
}