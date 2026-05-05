# Affiliate Program Setup – Step by Step

Follow these steps to replace placeholder links with your own affiliate IDs and start earning.

## 1. Amazon Associates (for physical products)

**Time required:** 10–15 minutes, approval can take 1–3 days.

### Steps:
1. Go to [affiliate-program.amazon.com](https://affiliate-program.amazon.com) and click “Join Now.”
2. Sign in with your Amazon account (or create one).
3. Fill out the application:
   - **Website URL:** Use your deployed site URL (e.g., `https://productivity-tools-hub.github.io`).
   - **Description:** “A review site for productivity tools and remote‑work gear.”
   - **Payment & tax info:** Required for payouts.
4. Wait for approval email (usually within 24–48 hours).
5. Once approved, go to **Account → Product Linking** and copy your **tracking ID** (e.g., `productivity0b‑20`).

### Replacing Amazon Links
In each article file (`articles/*.html`), find links like:
```
https://amazon.com/dp/B08XYZ
```
Replace with:
```
https://amazon.com/dp/B08XYZ?tag=YOUR_TRACKING_ID
```
(Replace `YOUR_TRACKING_ID` with your actual tracking ID.)

You can also use Amazon’s **SiteStripe** tool to generate links directly.

## 2. ShareASale (for software/services)

**Time required:** 10 minutes, instant approval for many merchants.

### Steps:
1. Sign up at [shareasale.com](https://shareasale.com).
2. Fill out your profile (website same as above).
3. Browse merchants:
   - Search for “Notion”
   - Click “Apply” (usually auto‑approved)
   - Once approved, click “Get Links” to generate affiliate URLs.
4. Repeat for: **Zoom, Logitech, FlexiSpot, BenQ, Toggl, Clockwise, Gather, Whereby, Slack**, etc.

### Replacing ShareASale Links
Replace placeholder links like:
```
https://www.notion.so
```
with your ShareASale affiliate link (looks like `https://www.shareasale.com/r.cfm?b=...&u=...&m=...`).

## 3. ConvertKit (email list)

**Time required:** 5 minutes.

### Steps:
1. Sign up at [convertkit.com](https://convertkit.com) (free plan).
2. Create a **Form** (inline or embedded).
3. Copy the form’s `action` URL (looks like `https://app.convertkit.com/forms/XXXXXX/subscriptions`).
4. Open `index.html` and find the newsletter form. Replace the `action` attribute with your URL.

## 4. Google Analytics (tracking)

**Time required:** 5 minutes.

### Steps:
1. Go to [analytics.google.com](https://analytics.google.com).
2. Create a new **GA4 property**.
3. Get your **Measurement ID** (starts with `G‑`).
4. Open `index.html` and replace `G‑XXXXXX` with your ID (two places).

## 5. Other Programs (optional)

- **Notion Affiliate Program** – Apply via [notion.so/affiliates](https://www.notion.so/affiliates).
- **Logitech Partner Program** – Search on ShareASale.
- **FlexiSpot Affiliate** – Sign up via [flexispot.com/affiliate](https://www.flexispot.com/affiliate).

## 🛠️ Automated Replacement (Optional)

If you have many links, run the provided script:

```bash
node replace-affiliate-links.js --amazon YOUR_TAG --shareasale YOUR_MID
```

(You’ll need to install Node.js first.)

## 📊 Tracking Your Earnings

- Amazon Associates: **Reports → Earnings**
- ShareASale: **Reports → Activity Details**
- ConvertKit: **Subscribers**

## ⏰ Timeline to First Commission

- **Day 1:** Deploy site, set up affiliate accounts.
- **Day 2–3:** Replace placeholder links.
- **Week 1:** Share on social media, forums, with friends.
- **Week 2–4:** First clicks may appear; commissions after purchases.
- **Month 2–3:** Regular traffic → consistent earnings.

**Tip:** Focus on writing 1–2 new articles per week to accelerate growth.

---

Need help? Email [Mfitzpatrick13@gmail.com](mailto:Mfitzpatrick13@gmail.com).