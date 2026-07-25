# SparklySoul

A Delhi, India jewellery storefront with a customer account area and a local admin dashboard.

## Included

- Responsive jewellery storefront (`index.html`)
- Customer profile, address collection, checkout, order history and delivery tracking (`account.html`)
- Admin dashboard for publishing products and updating order delivery status (`admin.html`)
- Original SparklySoul logo asset

## Run locally

Open `index.html` in a browser, or serve the directory with any static file server.

## Firebase authentication

The shared `auth.html` page supports Google and email/password sign-in through Firebase Authentication.

1. In Firebase Authentication, enable **Google** and **Email/Password** providers.
2. Add the Vercel domain (for example, `sparkly-soul.vercel.app`) to Firebase Authentication's authorized domains.
3. Set the `ADMIN_EMAILS` Vercel environment variable to a comma-separated list of real Firebase admin account emails. Alternatively, assign the Firebase custom claim `admin: true` to an admin user.

The previous demo admin password is no longer used after this authentication update.

## Deploy to Vercel

1. Import this GitHub repository into [Vercel](https://vercel.com/new).
2. Choose the **Other** framework preset.
3. Leave Build Command blank and set the Output Directory to `.`.
4. Deploy.

The site is static, so it has no build dependency or server process.

## Razorpay payments

Cash on delivery is disabled. Checkout creates a Razorpay order on the server, opens Standard Checkout (UPI, cards, netbanking and wallets), and verifies the Razorpay signature server-side before showing the customer order.

In Vercel, set these environment variables for **Production**, **Preview** and **Development**:

- `RAZORPAY_KEY_ID` — Razorpay Key ID (test keys first, then live Key ID)
- `RAZORPAY_KEY_SECRET` — Razorpay Key Secret (never expose this in browser code)

Use Razorpay test keys to validate the full flow before replacing them with live keys. Configure automatic payment capture and a `payment.captured` webhook in Razorpay before fulfilling real orders. The account/order display is still browser-local; add a database before using this as the sole record of real fulfilment.
