export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') return res.status(200).end();
  try {
    const chunks = [];
    for await (const c of req) chunks.push(c);
    const body = Buffer.concat(chunks).toString('utf8');
    console.log('[client-log]', body.slice(0, 2000));
  } catch (e) {
    console.error('[client-log] error', e);
  }
  res.status(204).end();
}