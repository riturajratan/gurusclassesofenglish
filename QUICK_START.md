# Quick Start Guide - Gurus Classes of English

## 🎉 Your Website is Ready!

The development server is running at: **http://localhost:3000**

## 📋 What You Have

### ✅ Complete Website with:
- **Home Page** - Hero section, features, testimonials, CTA
- **About Page** - Mr. S.D. Singh Ratan's biography and qualifications
- **Courses Page** - 5 detailed coaching programs
  - Spoken English
  - English Grammar
  - Interview Preparation
  - Communication Skills
  - Personality Development
- **Blog Section** - 5 sample articles with categories and search
- **Contact Page** - Form, social media links, location
- **Disqus Comments** - Ready to enable on blog posts
- **SEO Optimized** - Meta tags, Open Graph, structured data
- **Mobile Responsive** - Works perfectly on all devices

## 🚀 Next Steps

### 1. **Customize Content** (Required)

#### Update Contact Information:
- [ ] Open `components/Footer.tsx`
- [ ] Replace phone number: `+91 XXXXX XXXXX`
- [ ] Replace email: `contact@gurusclassesofenglish.com`
- [ ] Replace address
- [ ] Update WhatsApp number: `YOUR_WHATSAPP_NUMBER`
- [ ] Update Facebook profile ID: `YOUR_PROFILE_ID`

#### Same changes in:
- [ ] `app/contact/page.tsx`
- [ ] `app/courses/page.tsx`

### 2. **Configure Contact Form** (Required)

1. Visit: https://web3forms.com
2. Sign up (free)
3. Get your access key
4. Open `components/ContactForm.tsx`
5. Replace: `YOUR_WEB3FORMS_ACCESS_KEY` with your key

### 3. **Set Up Disqus Comments** (Optional)

1. Visit: https://disqus.com
2. Create an account and site
3. Get your shortname
4. Open `components/DisqusComments.tsx`
5. Replace: `YOUR-DISQUS-SHORTNAME` with your shortname

### 4. **Add Images** (Recommended)

Create these files in the `public` folder:
- `favicon.ico` (32x32 or 64x64 pixels)
- `logo.png` (minimum 300x300 pixels)
- `og-image.jpg` (1200x630 pixels for social sharing)
- `apple-touch-icon.png` (180x180 pixels)

### 5. **Edit Blog Posts**

Open `lib/blogData.ts` to:
- Add new blog posts
- Remove sample posts
- Update categories

### 6. **Customize About Page**

Edit `app/about/page.tsx` to update:
- Mr. Ratan's biography
- Qualifications and experience
- Teaching philosophy

## 🌐 Deploy to Production

### Option 1: Vercel (Recommended & Free)

```bash
# 1. Create GitHub repository
git init
git add .
git commit -m "Initial commit"
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main

# 2. Go to vercel.com
# 3. Import your GitHub repository
# 4. Deploy! (takes 2-3 minutes)
```

### Option 2: Netlify (Alternative & Free)

```bash
# 1. Build the site
npm run build

# 2. Go to netlify.com
# 3. Drag and drop the 'out' folder
# Or connect to your GitHub repo
```

## 📱 Test on Mobile

The site is running at:
- **Local:** http://localhost:3000
- **Network:** http://192.168.29.208:3000

Open the Network URL on your mobile device (must be on same WiFi).

## 📂 Project Structure

```
gurus-classes-of-english/
├── app/                    # All pages
│   ├── page.tsx           # Home page
│   ├── about/             # About page
│   ├── courses/           # Courses page
│   ├── blog/              # Blog pages
│   ├── contact/           # Contact page
│   ├── layout.tsx         # Site layout & SEO
│   └── globals.css        # Global styles
├── components/            # Reusable components
│   ├── Header.tsx         # Navigation
│   ├── Footer.tsx         # Footer with links
│   ├── ContactForm.tsx    # Contact form
│   └── DisqusComments.tsx # Comments
├── lib/                   # Utilities
│   └── blogData.ts        # Blog posts data
├── public/                # Static files (images, etc.)
├── README.md              # Full documentation
├── SETUP_GUIDE.md         # Detailed setup instructions
└── package.json           # Dependencies
```

## 🎨 Customization

### Change Colors:
Edit `tailwind.config.ts` - modify primary and accent colors

### Change Fonts:
Edit `app/layout.tsx` - update Google Fonts imports

### Add New Pages:
1. Create folder in `app/` directory
2. Add `page.tsx` file
3. Update navigation in `components/Header.tsx`

## 🐛 Troubleshooting

### Build Errors:
```bash
# Clear caches and rebuild
rm -rf .next out node_modules
npm install
npm run build
```

### Port Already in Use:
```bash
# Run on different port
PORT=3001 npm run dev
```

## 📚 Documentation

- **README.md** - Full project documentation
- **SETUP_GUIDE.md** - Step-by-step setup instructions
- **This file** - Quick start guide

## ✅ Pre-Launch Checklist

Before going live:
- [ ] Updated all contact information
- [ ] Configured Web3Forms contact form
- [ ] Set up Disqus (if using comments)
- [ ] Added favicon and logo
- [ ] Updated About page content
- [ ] Tested contact form
- [ ] Checked all links work
- [ ] Tested on mobile device
- [ ] Reviewed all text for typos
- [ ] Updated domain URLs in code
- [ ] Built successfully: `npm run build`

## 🎯 Current Status

✅ **Development server running**
✅ **All pages built successfully**
✅ **Mobile responsive**
✅ **SEO optimized**
⏳ **Waiting for your customization**
⏳ **Ready to deploy**

## 💡 Tips

- **Start with contact info** - Update all placeholder text first
- **Test locally** - Make sure everything works before deploying
- **Use version control** - Commit changes regularly with git
- **Deploy early** - Get it live, then iterate
- **Get feedback** - Show students and get their input

## 🆘 Need Help?

Read the detailed guides:
1. **README.md** - For general information
2. **SETUP_GUIDE.md** - For configuration help

---

**🎓 Gurus Classes of English**
**Master English with Confidence**

Created for: Mr. S.D. Singh Ratan
Tech Stack: Next.js 16, TypeScript, Tailwind CSS
Status: Ready for customization and deployment!
