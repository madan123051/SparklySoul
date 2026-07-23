# SparklySoul

A Delhi, India jewellery storefront with a customer account area and a local admin dashboard.

## Included

- Responsive jewellery storefront (`index.html`)
- Customer profile, address collection, checkout, order history and delivery tracking (`account.html`)
- Admin dashboard for publishing products and updating order delivery status (`admin.html`)
- Original SparklySoul logo asset

## Run locally

Open `index.html` in a browser, or serve the directory with any static file server.

## Admin demo access

- Email: `admin@sparklysoul.in`
- Password: `Sparkly2026`

## Deploy to Vercel

1. Import this GitHub repository into [Vercel](https://vercel.com/new).
2. Choose the **Other** framework preset.
3. Leave Build Command blank and set the Output Directory to `.`.
4. Deploy.

The site is static, so it has no build dependency or server process.

## Important for production

The current customer accounts, cart, products and orders are a browser-local demo stored with `localStorage`. Before accepting real orders, connect a secure backend/database, real customer authentication, payment gateway (such as Razorpay), image upload storage, and courier/shipping APIs.
