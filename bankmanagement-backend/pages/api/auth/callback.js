import axios from 'axios';

export default async function handler(req, res) {
  const code = req.query.code;

  const tokenRes = await axios.post(
    'https://github.com/login/oauth/access_token',
    {
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code,
    },
    { headers: { Accept: 'application/json' } }
  );

  const accessToken = tokenRes.data.access_token;

  const userRes = await axios.get('https://api.github.com/user', {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  res.redirect(`http://localhost:3000/me?user=${userRes.data.login}`);
}