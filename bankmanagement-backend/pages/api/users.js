import fs from 'fs';
import path from 'path';
import NextCors from 'nextjs-cors';

const dirPath = path.join(process.cwd(), 'data');
const filePath = path.join(dirPath, 'users.json');

export default async function handler(req, res) {
  try {
    await NextCors(req, res, {
      origin: 'http://localhost:3000',
      methods: ['GET', 'POST', 'OPTIONS'],
      optionsSuccessStatus: 200,
    });

    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify({}, null, 2));
    }

    let users = {};
    try {
      const data = fs.readFileSync(filePath, 'utf8');
      users = data.trim() ? JSON.parse(data) : {};
    } catch (err) {
      users = {};
    }

    if (req.method === 'GET') {
      const { username } = req.query;
      if (!username) return res.status(400).json({ message: 'username mangler' });

      if (!users[username]) {
        return res.status(404).json({ message: 'Bruger findes ikke' });
      }

      return res.status(200).json(users[username]);
    }

    if (req.method === 'POST') {
      const { username } = req.body;

      if (!username || username.trim() === '') {
        return res.status(400).json({ message: 'username mangler' });
      }

      if (!users[username]) {
        const regNo = String(Math.floor(1000 + Math.random() * 9000));
        const accNo = String(Math.floor(1000000000 + Math.random() * 9000000000));
        const cardNo = String(Math.floor(1000000000000000 + Math.random() * 9000000000000000));
        const cvv = String(Math.floor(100 + Math.random() * 900));
        users[username] = { username, regNo, accNo, cardNo, cvv };

        fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
      }

      return res.status(200).json(users[username]);
    }

    res.status(405).json({ message: 'Method not allowed' });
  } catch (err) {
    console.error('FEJL I USERS API:', err);
    res.status(500).json({ message: 'Intern server fejl', error: err.message });
  }
}