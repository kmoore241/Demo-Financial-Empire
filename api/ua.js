export default function handler(req, res) {
  const headers = {};
  for (const [k, v] of Object.entries(req.headers)) {
    headers[k] = Array.isArray(v) ? v.slice(0, 5) : v;
  }
  res.setHeader('Cache-Control', 'no-store');
  res.status(200).json({
    ua: req.headers['user-agent'] || 'unknown',
    headers
  });
}