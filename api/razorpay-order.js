export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed.' });

  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keyId || !keySecret) return res.status(503).json({ error: 'Online payments are not configured yet.' });

  const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
  const amount = Number(body.amount);
  if (!Number.isSafeInteger(amount) || amount < 100 || amount > 100000000) {
    return res.status(400).json({ error: 'Invalid payment amount.' });
  }

  const receipt = `ss_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  const auth = Buffer.from(`${keyId}:${keySecret}`).toString('base64');
  const razorpayResponse = await fetch('https://api.razorpay.com/v1/orders', {
    method: 'POST',
    headers: { Authorization: `Basic ${auth}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount, currency: 'INR', receipt, notes: { store: 'sparklyseol' } })
  });
  const order = await razorpayResponse.json();
  if (!razorpayResponse.ok) {
    return res.status(502).json({ error: order?.error?.description || 'Razorpay could not create the payment order.' });
  }

  res.setHeader('Cache-Control', 'no-store');
  return res.status(200).json({ id: order.id, amount: order.amount, currency: order.currency, receipt: order.receipt });
}
