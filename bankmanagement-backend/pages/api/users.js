// C:\...\bankmanagement-backend\pages\api\users.js
import fs from 'fs';
import path from 'path';
import NextCors from 'nextjs-cors';

const filePath = path.join(process.cwd(), 'users.json');

export default async function handler(req, res) {
  try {
    // CORS
    await NextCors(req, res, {
      origin: 'http://localhost:3000', // frontend
      methods: ['GET', 'POST', 'OPTIONS'],
      optionsSuccessStatus: 200,
    });

    // Sørg for, at filen findes
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify({}, null, 2));
    }

    // Læs eksisterende data
    let users = {};
    try {
      const data = fs.readFileSync(filePath, 'utf8');
      users = data.trim() ? JSON.parse(data) : {};
    } catch (err) {
      users = {};
    }

    if (req.method === 'POST') {
      const { username } = req.body;

      if (!username || username.trim() === '') {
        return res.status(400).json({ message: 'username mangler' });
      }

      // Opret bruger hvis den ikke findes
      if (!users[username]) {
        const regNo = String(Math.floor(1000 + Math.random() * 9000));
        const accNo = String(Math.floor(10000000 + Math.random() * 90000000));
        users[username] = { username, regNo, accNo };

        // Gem til fil
        fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
      }

      return res.status(200).json(users[username]);
    }

    if (req.method === 'GET') {
      return res.status(200).json(users);
    }

    res.status(405).json({ message: 'Method not allowed' });
  } catch (err) {
    console.error('FEJL I USERS API:', err);
    res.status(500).json({ message: 'Intern server fejl', error: err.message });
  }
}