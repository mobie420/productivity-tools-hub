# Affiliate Program Pre‑Fills – One‑Click Applications

Use these pre‑filled links to sign up for affiliate programs in under 10 minutes.

## 1. **Amazon Associates**
**For physical products** (chairs, monitors, gear)

**Pre‑filled application link:**  
`https://affiliate-program.amazon.com/assoc_credentials/home?tag=productivityhub-20&website=productivity-tools-hub.github.io`

**What to fill:**
- **Website URL:** `https://productivity-tools-hub.github.io` (or your Netlify URL)
- **Description:** "Reviews and recommendations for productivity tools, remote‑work gear, and software."
- **Categories:** Select "Electronics & Computers", "Home & Garden", "Office Products"
- **Payment/Tax info:** Required (SSN or EIN, address)

**Approval time:** 1–3 days

## 2. **ShareASale**
**For software/services** (Notion, Zoom, Logitech, etc.)

**Pre‑filled signup:**  
`https://www.shareasale.com/info/affiliate-signup`

**Merchants to apply for (search & click "Apply"):**
- Notion
- Zoom
- Logitech
- FlexiSpot
- BenQ
- Toggl
- Clockwise
- Gather
- Whereby
- Slack

**Approval:** Usually instant for most merchants

## 3. **ConvertKit**
**Email newsletter** (free up to 1,000 subscribers)

**Signup:** `https://convertkit.com?lmref=productivity-tools`

**After signup:**
1. Create a **Form** (inline)
2. Copy the form `action` URL
3. Replace in `index.html`:
   ```html
   <form action="https://app.convertkit.com/forms/XXXXXX/subscriptions" method="post">
   ```

## 4. **Google Analytics**
**Traffic tracking**

**Create property:** `https://analytics.google.com/analytics/web/#/a67747841p00000000/admin/streams`

**Steps:**
1. Click **"Create Property"**
2. Property name: "Productivity Tools Hub"
3. Industry: "Technology"
4. Business size: "Small"
5. Get **Measurement ID** (starts with `G‑`)
6. Replace in `index.html`:
   ```html
   gtag('config', 'G‑XXXXXX');
   ```

## ⚡ **Bulk Link Replacement**
Once you have your affiliate IDs, use the `affiliate-map.json` and `replace-affiliate-links.js` script:

```bash
cd productivity-tools-site
# Edit affiliate-map.json with your IDs
node replace-affiliate-links.js
```

## 📊 **Tracking Your Earnings**
- **Amazon:** Reports → Earnings
- **ShareASale:** Reports → Activity Details
- **ConvertKit:** Subscribers → Growth
- **Google Analytics:** Acquisition → All Traffic

## 🚀 **Next After Approval**
1. Replace all placeholder links in `articles/*.html`
2. Submit site to Google Search Console
3. Share on Reddit (`r/productivity`, `r/RemoteWork`), LinkedIn, Twitter
4. Write 1–2 new articles per week

---

**Spend 20 minutes now, earn commissions for years.**