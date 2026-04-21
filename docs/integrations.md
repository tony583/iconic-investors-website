# Iconic Partners — Integrations & Credentials Reference

## Google Analytics 4

| Field | Value |
|---|---|
| Account | antonio@bloomwealth.com.au |
| Stream Name | Website |
| Stream URL | https://iconicinvestors.com.au |
| Stream ID | 14405936006 |
| Measurement ID | G-JPLEN1G53P |
| Enhanced Measurement | Enabled (Page views, Scrolls, Outbound clicks + 4 more) |

Tag is installed in `index.html`. To update, search for `G-JPLEN1G53P`.

---

## Resend (Transactional Email)

| Field | Value |
|---|---|
| To address | antonio@iconicinvestors.com.au |
| From (AR applications) | Applications &lt;onboarding@resend.dev&gt; |
| From (contact form) | Iconic Investors Website &lt;onboarding@resend.dev&gt; |
| Env var | `RESEND_API_KEY` (set in Vercel) |

---

## GoHighLevel (CRM)

| Field | Value |
|---|---|
| Location ID | P9oYgzXd5TIfEr0N8M0V |
| API Key env var | `GHL_API_KEY` (set in Vercel) |
| Contact source tag | `website-enquiry` |
| Booking URL | https://api.leadconnectorhq.com/widget/bookings/discovery_call_antonio |

---

## Vercel (Hosting)

| Field | Value |
|---|---|
| Project | iconic-investors-website |
| Project ID | prj_K54fTWqZG4MYtgs3WUoKAbWX3SnL |
| Team ID | team_6ZYKTsk1TSzERTVnyXfyW0mO |
| Production URL | https://www.iconicinvestors.com.au |
| Apply subdomain | https://apply.iconicinvestors.com.au |

---

## DNS (Webcentral / Netregistry)

| Record | Host | Value |
|---|---|---|
| A | @ (root) | 76.76.21.21 |
| A | www | 76.76.21.21 |
| A | apply | 76.76.21.21 |
| TXT | _vercel | z6YeQHg4X8 |

---

## Meta (Facebook) Pixel

| Field | Value |
|---|---|
| Pixel ID | XXXXXXXXXXXXXXXX (update when available) |

Placeholder is in `index.html`. Replace `XXXXXXXXXXXXXXXX` with actual Pixel ID.

---

## To-Do

- [ ] Add Meta Pixel ID
- [ ] Complete Google Search Console verification
- [ ] Set up Google Business Profile (Maps)
- [ ] Submit sitemap to Bing Webmaster Tools
- [ ] Connect Meta Lead Ads to GHL native integration
