export default function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed.' });

  if (!process.env.RAZORPAY_KEY_ID) {
    return res.status(503).json({ error: 'Online payments are not configured yet.' });
  }

  res.setHeader('Cache-Control', 'no-store');
  return res.status(200).json({ keyId: process.env.RAZORPAY_KEY_ID });
}
