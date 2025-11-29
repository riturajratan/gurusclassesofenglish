# Complete Setup Guide - Gurus Classes of English Website

This guide will walk you through all the necessary steps to configure and deploy your website.

## 📋 Checklist

- [ ] Update contact information
- [ ] Configure Web3Forms for contact form
- [ ] Set up Disqus for comments
- [ ] Add social media links
- [ ] Customize content and branding
- [ ] Add images and logo
- [ ] Test the website locally
- [ ] Deploy to hosting platform
- [ ] Set up custom domain
- [ ] Submit to search engines

---

## 1️⃣ Update Contact Information

### Files to Edit:

#### `components/Footer.tsx`
Replace:
- \`Your Address Here, City, State - PIN\`
- \`+91 XXXXX XXXXX\`
- \`contact@gurusclassesofenglish.com\`
- Facebook URL: \`https://www.facebook.com/profile.php?id=YOUR_PROFILE_ID\`
- WhatsApp URL: \`https://wa.me/YOUR_WHATSAPP_NUMBER\`

#### `app/contact/page.tsx`
Replace all instances of:
- \`+91XXXXXXXXXX\` with your phone number
- \`contact@gurusclassesofenglish.com\` with your email
- \`Your Complete Address\` with your actual address
- Facebook and WhatsApp URLs

#### `components/Header.tsx`
- No changes needed unless you want to add phone number

---

## 2️⃣ Configure Web3Forms (Free Contact Form Service)

### Steps:

1. **Visit Web3Forms**
   - Go to [https://web3forms.com](https://web3forms.com)
   - Click "Get Started Free"

2. **Sign Up**
   - Create an account (it's free)
   - Verify your email

3. **Create Access Key**
   - Click "Create New Access Key"
   - Add your email where you want to receive form submissions
   - Copy the access key

4. **Update Your Code**
   - Open \`components/ContactForm.tsx\`
   - Find line with \`access_key: 'YOUR_WEB3FORMS_ACCESS_KEY'\`
   - Replace with your actual access key:
     \`\`\`typescript
     access_key: 'your-actual-access-key-here'
     \`\`\`

5. **Test the Form**
   - Run your website locally
   - Fill out the contact form
   - Check if you receive the email

---

## 3️⃣ Set Up Disqus Comments

### Steps:

1. **Create Disqus Account**
   - Visit [https://disqus.com](https://disqus.com)
   - Click "Get Started"
   - Choose "I want to install Disqus on my site"

2. **Register Your Site**
   - Enter website name (e.g., "Gurus Classes of English")
   - Choose a unique shortname (e.g., "gurusclassesofenglish")
   - Select "Basic" plan (Free)

3. **Get Your Shortname**
   - After registration, go to Settings
   - Note your Disqus shortname

4. **Update Your Code**
   - Open \`components/DisqusComments.tsx\`
   - Find line with \`YOUR-DISQUS-SHORTNAME\`
   - Replace with your actual shortname:
     \`\`\`typescript
     s.src = 'https://gurusclassesofenglish.disqus.com/embed.js';
     \`\`\`

5. **Configure Disqus**
   - In Disqus admin panel, add your website URL
   - Set up moderation preferences
   - Customize appearance if desired

---

## 4️⃣ Add Social Media Links

### WhatsApp:

1. Get your WhatsApp number in international format
2. Example: If your number is 9876543210, use: \`919876543210\`
3. Replace \`YOUR_WHATSAPP_NUMBER\` in:
   - \`components/Footer.tsx\`
   - \`app/contact/page.tsx\`
   - \`app/courses/page.tsx\`

### Facebook:

1. **Option A: Personal Profile**
   - Go to your Facebook profile
   - Copy the number from URL (facebook.com/profile.php?id=**NUMBER**)
   - Replace \`YOUR_PROFILE_ID\` with this number

2. **Option B: Facebook Page**
   - If you have a Facebook Page
   - URL format: \`https://www.facebook.com/YourPageName\`
   - Replace entire URL in the code

---

## 5️⃣ Customize Content

### Update Text Content:

1. **About Page** (\`app/about/page.tsx\`)
   - Update Mr. Ratan's bio
   - Modify qualifications
   - Add specific achievements

2. **Courses Page** (\`app/courses/page.tsx\`)
   - Adjust course details
   - Update pricing (if you want to add it)
   - Modify duration and batch information

3. **Home Page** (\`app/page.tsx\`)
   - Update testimonials with real student feedback
   - Modify tagline if desired

### Add Blog Posts:

Edit \`lib/blogData.ts\`:
- Add new blog posts
- Remove sample posts
- Update categories as needed

---

## 6️⃣ Add Images and Branding

### Create Public Folder:

\`\`\`bash
mkdir -p public/images
\`\`\`

### Required Images:

1. **Favicon**
   - Size: 32x32px or 64x64px
   - Save as: \`public/favicon.ico\`
   - [Create free favicon](https://favicon.io)

2. **Logo**
   - Size: Minimum 300x300px (transparent PNG)
   - Save as: \`public/logo.png\`

3. **Open Graph Image**
   - Size: 1200x630px
   - Save as: \`public/og-image.jpg\`
   - This shows when sharing on social media

4. **Apple Touch Icon**
   - Size: 180x180px
   - Save as: \`public/apple-touch-icon.png\`

5. **Course Images** (optional)
   - Add to \`public/images/courses/\`

6. **Blog Images** (optional)
   - Add to \`public/images/blog/\`

### Update Image References:

After adding images, update:
- \`app/layout.tsx\` - favicon and meta images
- Course cards - add course images
- Blog posts - add featured images

---

## 7️⃣ Update Domain URLs

Replace \`gurusclassesofenglish.com\` with your actual domain in:

- \`app/layout.tsx\` (metadataBase)
- \`app/blog/[slug]/page.tsx\` (shareUrl)
- \`components/DisqusComments.tsx\` (page.url)
- All structured data (JSON-LD) scripts

**If you don't have a domain yet:**
- Use your Vercel URL (e.g., \`yoursite.vercel.app\`)
- Update later when you get a custom domain

---

## 8️⃣ Test Locally

### Run Development Server:

\`\`\`bash
npm run dev
\`\`\`

### Test Checklist:

- [ ] All pages load correctly
- [ ] Navigation works on mobile and desktop
- [ ] Contact form submits successfully
- [ ] Blog posts display properly
- [ ] Search and filtering work
- [ ] Social media links open correctly
- [ ] WhatsApp link works on mobile
- [ ] No console errors in browser

### Build Test:

\`\`\`bash
npm run build
\`\`\`

Fix any errors that appear.

---

## 9️⃣ Deploy to Vercel (Recommended)

### Steps:

1. **Create GitHub Repository**
   \`\`\`bash
   git init
   git add .
   git commit -m "Initial commit - Gurus Classes of English website"
   git branch -M main
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   \`\`\`

2. **Deploy to Vercel**
   - Visit [https://vercel.com](https://vercel.com)
   - Sign up with GitHub
   - Click "New Project"
   - Import your repository
   - Vercel auto-detects Next.js settings
   - Click "Deploy"

3. **Wait for Deployment**
   - Takes 1-3 minutes
   - You'll get a \`.vercel.app\` URL

4. **Test Your Live Site**
   - Visit the Vercel URL
   - Test all features
   - Check mobile responsiveness

---

## 🔟 Set Up Custom Domain

### If You Have a Domain:

1. **In Vercel Dashboard:**
   - Go to your project
   - Click "Settings" → "Domains"
   - Add your domain (e.g., \`gurusclassesofenglish.com\`)

2. **Update DNS Records:**
   - Go to your domain registrar (GoDaddy, Namecheap, etc.)
   - Add the DNS records Vercel provides
   - Wait for DNS propagation (can take 24-48 hours)

3. **Update URLs in Code:**
   - Replace Vercel URLs with your custom domain
   - Commit and push changes
   - Vercel auto-deploys

### If You Don't Have a Domain:

**Free Options:**
- Use your \`.vercel.app\` subdomain
- Or get a free domain from [Freenom](https://www.freenom.com)

**Paid Options (Recommended):**
- [Namecheap](https://www.namecheap.com) - $8-12/year
- [GoDaddy](https://www.godaddy.com) - $10-15/year
- [Google Domains](https://domains.google) - $12/year

---

## 1️⃣1️⃣ SEO & Search Engine Submission

### Google Search Console:

1. Visit [https://search.google.com/search-console](https://search.google.com/search-console)
2. Add your website
3. Verify ownership (Vercel makes this easy)
4. Submit your sitemap: \`your-domain.com/sitemap.xml\`

### Google Analytics (Optional):

1. Create Google Analytics account
2. Get tracking ID
3. Add to \`app/layout.tsx\` in the \`<head>\` section

### Bing Webmaster Tools:

1. Visit [https://www.bing.com/webmasters](https://www.bing.com/webmasters)
2. Add and verify your site
3. Import from Google Search Console (easier)

---

## 🎉 Launch Checklist

Before announcing your website:

- [ ] All contact information is correct
- [ ] Contact form works and sends emails
- [ ] All links work (no broken links)
- [ ] Images load properly
- [ ] Mobile version looks good
- [ ] Blog comments work
- [ ] WhatsApp link works on mobile devices
- [ ] Facebook links work
- [ ] Website loads fast
- [ ] SSL certificate is active (https://)
- [ ] No spelling or grammar errors
- [ ] Google Analytics is tracking (if added)
- [ ] Submitted to Google Search Console

---

## 🆘 Need Help?

If you encounter issues:

1. Check the README.md file
2. Review error messages carefully
3. Search for the error on Google
4. Check Next.js documentation
5. Ask on Stack Overflow
6. Contact web developer for assistance

---

## 📞 Support Resources

- Next.js Docs: [https://nextjs.org/docs](https://nextjs.org/docs)
- Vercel Support: [https://vercel.com/support](https://vercel.com/support)
- Tailwind CSS Docs: [https://tailwindcss.com/docs](https://tailwindcss.com/docs)
- Web3Forms Docs: [https://docs.web3forms.com](https://docs.web3forms.com)
- Disqus Help: [https://help.disqus.com](https://help.disqus.com)

---

**Good luck with your website! 🚀**

**Gurus Classes of English - Helping students master English with confidence.**
