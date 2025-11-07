import { users } from '../pages/api/users.js';

export function handleLogin(req, res) {
  const { username } = req.body;

  if (!users[username]) {
    const regNo = String(Math.floor(1000 + Math.random() * 9000));
    const accNo = String(Math.floor(1000000000 + Math.random() * 9000000000));
    const cardNo = String(Math.floor(1000000000000000 + Math.random() * 9000000000000000));
    const cvv = String(Math.floor(100 + Math.random() * 900));
    users[username] = { username, regNo, accNo, cardNo, cvv };
  }

  res.json(users[username]);
}