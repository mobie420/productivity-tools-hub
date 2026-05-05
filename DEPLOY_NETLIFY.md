# Netlify Deployment – One‑Click Live Site

Deploy your productivity tools affiliate site in **under 2 minutes** with no coding.

## 🚀 Step‑by‑Step

### 1. **Sign in to Netlify**
- Go to [netlify.com](https://netlify.com)
- Click **"Sign up"** → **"Sign up with GitHub"** or **"Sign up with Google"**
- Use your Google account (connected to `mfitzpatrick13@gmail.com`)

### 2. **Drag & Drop**
- From your computer, open the `productivity-tools-site` folder
- Drag the **entire folder** onto the Netlify dashboard
- Drop it in the "Drag and drop your site folder here" area

### 3. **Wait for Deployment**
- Netlify automatically detects it's a static site
- Build completes in ~30 seconds
- Your site gets a random `.netlify.app` domain (e.g., `https://happy‑pangolin‑12345.netlify.app`)

### 4. **Optional: Custom Domain**
- In Netlify dashboard: **Site settings → Domain management**
- Add a custom domain (you can buy one later)
- Or use the free `.netlify.app` domain forever

## ✅ What Happens Automatically
- HTTPS enabled (free SSL)
- Global CDN
- Automatic builds if you update files
- Forms handling (newsletter sign‑up)
- 404 page works

## 🔧 Next Steps After Deployment

### 1. **Set up affiliate programs**
- Follow `AFFILIATE_SETUP.md`
- Replace placeholder links with your affiliate IDs

### 2. **Connect Google Analytics**
- Create GA4 property at [analytics.google.com](https://analytics.google.com)
- Replace `G‑XXXXXX` in `index.html` with your Measurement ID

### 3. **Submit to Google Search Console**
- Go to [search.google.com/search-console](https://search.google.com/search-console)
- Add your Netlify URL
- Submit sitemap: `https://your-site.netlify.app/sitemap.xml` (create one later)

## 📦 Files Included
- `index.html` – Homepage with article grid
- `articles/` – 5 ready‑to‑publish articles
- `css/style.css` – Custom styling
- `netlify.toml` – Netlify configuration
- `AFFILIATE_SETUP.md` – Step‑by‑step earning guide

## ❓ Support
Email `mfitzpatrick13@gmail.com` or check the main `README.md`.

---

**Time to live site:** ~2 minutes  
**Cost:** $0 forever  
**Traffic limit:** 100GB/month (free tier – plenty for starting)