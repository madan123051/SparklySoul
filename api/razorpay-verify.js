import crypto from 'node:crypto';

export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed.' });

  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keySecret) return res.status(503).json({ error: 'Online payments are not configured yet.' });

  const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
  const orderId = String(body.orderId || '');
  const paymentId = String(body.razorpay_payment_id || '');
  const signature = String(body.razorpay_signature || '');
  if (!orderId || !paymentId || !signature) return res.status(400).json({ error: 'Incomplete payment confirmation.' });

  const expected = crypto.createHmac('sha256', keySecret).update(`${orderId}|${paymentId}`).digest('hex');
  const expectedBuffer = Buffer.from(expected, 'utf8');
  const signatureBuffer = Buffer.from(signature, 'utf8');
  const valid = expectedBuffer.length === signatureBuffer.length && crypto.timingSafeEqual(expectedBuffer, signatureBuffer);
  if (!valid) return res.status(400).json({ error: 'Payment verification failed.' });

  res.setHeader('Cache-Control', 'no-store');
  return res.status(200).json({ verified: true, paymentId });
}
