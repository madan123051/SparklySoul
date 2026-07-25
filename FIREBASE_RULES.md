# Firebase rules for sparklyseol

This project now includes both Firebase security rule files:

- `firestore.rules` for Cloud Firestore
- `storage.rules` for Firebase Storage

## Deploy with Firebase CLI

```powershell
npx firebase-tools deploy --only firestore:rules,storage
```

If Firebase asks for a project, use your Firebase project id:

```powershell
npx firebase-tools deploy --only firestore:rules,storage --project YOUR_FIREBASE_PROJECT_ID
```

## Admin access

The rules use the secure Firebase custom claim:

```js
admin: true
```

Your existing website can still check `ADMIN_EMAILS` in Vercel for page routing, but Firestore and Storage rules cannot safely read Vercel environment variables. For real rule-level admin access, set the admin custom claim on the Firebase user.

Example using Firebase Admin SDK:

```js
await admin.auth().setCustomUserClaims(uid, { admin: true });
```

After setting the claim, sign out and sign in again so the browser receives a fresh ID token.

## What the rules allow

- Anyone can read products, store settings, and public product media.
- Only admin users can create, update, or delete products.
- Only admin users can upload product images, video files, and video posters.
- Product images/posters must be WebP and 5 MB or smaller.
- Product videos must be MP4/WebM and 5 MB or smaller.
- Buyers can create their own orders and read only their own orders.
- Admin users can read and update order status.
- Users can manage only their own profile/cart documents.
