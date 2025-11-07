import { users } from '../pages/api/users.js';

export function handleLogin(req, res) {
  const { username } = req.body;

  if (!users[username]) {
    const regNo = String(Math.floor(1000 + Math.random() * 9000));
    const accNo = String(Math.floor(10000000 + Math.random() * 90000000));
    users[username] = { username, regNo, accNo };
  }

  res.json(users[username]);
}