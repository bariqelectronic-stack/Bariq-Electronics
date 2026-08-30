# Bariq Electronics — Admin Setup Checklist

Everything that can be done without external credentials has already been completed.
This document lists only the things that require your personal information or external accounts.

---

## DONE (no action needed)

- Site branding, pages, and all 54 routes are built and working
- Demo mode works without a database — runs on static data out of the box
- AUTH_SECRET generated and written to `.env.local`
- Admin account configured: `admin@bariqelectronics.com` — password is set at seed time
- Cash on Delivery is enabled by default
- WhatsApp button links to `https://wa.me/923009445230`
- All optional services (bank transfer, email, analytics, payments) are safely disabled until you add credentials

---

## NEEDS YOUR INFORMATION

Copy `.env.example` to `.env.local` and fill in these values:

### 1. Database (required for orders, accounts, admin features)

```
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/bariq_electronics"
```

Recommended providers (free tiers available):
- **Neon** — neon.tech (easiest, serverless Postgres)
- **Supabase** — supabase.com
- **Railway** — railway.app

After adding `DATABASE_URL`, run:
```bash
npm run db:migrate   # applies schema to your database
npm run db:seed      # creates the admin account (password printed once to terminal)
```

### 2. Site URL

```
NEXT_PUBLIC_SITE_URL="https://yourdomain.com"
NEXTAUTH_URL="https://yourdomain.com"
```

Replace with your actual domain before going live.

### 3. Bank Transfer (optional)

Fill these to enable bank transfer at checkout:
```
BANK_NAME="HBL"
BANK_ACCOUNT_TITLE="Bariq Electronics"
BANK_ACCOUNT_NUMBER="your-account-number"
BANK_IBAN="PK00XXXX0000000000000000"
BANK_BRANCH="Karachi Main Branch"
```

### 4. Social Links (optional — hidden in footer if empty)

```
NEXT_PUBLIC_FACEBOOK_URL="https://facebook.com/yourpage"
NEXT_PUBLIC_INSTAGRAM_URL="https://instagram.com/yourhandle"
NEXT_PUBLIC_YOUTUBE_URL="https://youtube.com/yourchannel"
```

### 5. Physical Address (optional — shown in footer and contact page)

```
NEXT_PUBLIC_ADDRESS_LINE1="Shop #5, Electronics Market"
NEXT_PUBLIC_ADDRESS_CITY="Karachi"
```

---

## NEEDS EXTERNAL SERVICE ACCOUNT

These are optional. Each service is disabled until you add its credentials.

### Email (order confirmations, password reset)

**Option A — Resend (recommended, easiest for Next.js)**
1. Sign up at resend.com
2. Add your API key:
   ```
   RESEND_API_KEY="re_xxxxxxxxxxxx"
   ```
3. Run `npm install resend`
4. Uncomment the Resend block in `src/lib/email.ts`

**Option B — SMTP (Gmail, Outlook, etc.)**
```
EMAIL_SERVER_HOST="smtp.gmail.com"
EMAIL_SERVER_PORT="587"
EMAIL_SERVER_USER="your-email@gmail.com"
EMAIL_SERVER_PASSWORD="your-app-password"
EMAIL_FROM="bariqelectronic@gmail.com"
```
Run `npm install nodemailer @types/nodemailer` and uncomment the SMTP block in `src/lib/email.ts`.

### JazzCash

1. Apply at jazzcash.com.pk for a merchant account
2. Add credentials:
   ```
   JAZZCASH_MERCHANT_ID="your-merchant-id"
   JAZZCASH_PASSWORD="your-password"
   JAZZCASH_INTEGRITY_SALT="your-salt"
   ```
3. Implement the API call in `src/lib/payment.ts` (marked with TODO comment)

### EasyPaisa

1. Apply at easypaisa.com.pk for a merchant account
2. Add credentials:
   ```
   EASYPAISA_STORE_ID="your-store-id"
   EASYPAISA_HASH_KEY="your-hash-key"
   ```
3. Implement the API call in `src/lib/payment.ts` (marked with TODO comment)

### Stripe (international cards)

1. Sign up at stripe.com
2. Add credentials:
   ```
   STRIPE_SECRET_KEY="sk_live_xxxxxxxxxxxx"
   STRIPE_PUBLISHABLE_KEY="pk_live_xxxxxxxxxxxx"
   STRIPE_WEBHOOK_SECRET="whsec_xxxxxxxxxxxx"
   ```
3. Run `npm install stripe`

### Analytics (optional)

**Google Analytics 4:**
```
NEXT_PUBLIC_GA_MEASUREMENT_ID="G-XXXXXXXXXX"
```

**Meta (Facebook) Pixel:**
```
NEXT_PUBLIC_META_PIXEL_ID="XXXXXXXXXXXXXXXX"
```

---

## Going Live Checklist

- [ ] Add `DATABASE_URL` and run migrations + seed
- [ ] Note the admin password printed by `npm run db:seed` — change it on first login
- [ ] Set `NEXT_PUBLIC_SITE_URL` and `NEXTAUTH_URL` to your real domain
- [ ] Add real product photos to `/public/products/` and update product data in `src/lib/demo-products.ts`
- [ ] Set bank account details (if using bank transfer)
- [ ] Add social media links (optional)
- [ ] Add physical address (optional)
- [ ] Configure email provider (optional but recommended)
- [ ] Deploy to Vercel, Railway, or your hosting of choice
- [ ] Add all `.env.local` variables to your hosting platform's environment variable settings

---

## Admin Login

Once the database is configured and seeded:

- URL: `https://yourdomain.com/admin`
- Email: `admin@bariqelectronics.com`
- Password: printed to terminal when you ran `npm run db:seed`

You will be required to change your password on first login.
