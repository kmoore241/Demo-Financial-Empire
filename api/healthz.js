export default function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  res.status(200).json({
    ok: true,
    app: 'demo-financial-empire',
    time: new Date().toISOString(),
    ua: req.headers['user-agent'] || null,
    commit: process.env.VERCEL_GIT_COMMIT_SHA || null
  });
}