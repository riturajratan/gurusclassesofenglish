# Gurus Classes of English - Official Website

A modern, SEO-optimized static website for **Mr. S.D. Singh Ratan**, an experienced English lecturer specializing in communication skills, grammar, and personality development.

## 🌟 Features

- **Modern & Responsive Design** - Beautiful UI that works perfectly on all devices
- **SEO Optimized** - Comprehensive meta tags, Open Graph, and structured data
- **Fast Performance** - Static site generation for lightning-fast page loads
- **Blog Section** - Share English learning tips, articles, and insights
- **Course Showcase** - Detailed information about coaching programs
- **Contact Form** - Easy inquiry submission with Web3Forms integration
- **Social Integration** - WhatsApp and Facebook links for easy communication
- **Disqus Comments** - Enable discussions on blog posts
- **Category & Search** - Filter and search blog articles easily

## 📚 Pages

1. **Home** - Hero section, features, testimonials, and call-to-action
2. **About** - Mr. Ratan's biography, qualifications, and teaching philosophy
3. **Courses** - Detailed coaching program information
4. **Blog** - English learning articles with categories and search
5. **Contact** - Contact form, location, and social media links

## 🛠️ Tech Stack

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe code
- **Tailwind CSS** - Utility-first styling
- **React Icons** - Beautiful icons
- **Disqus** - Comment system for blog posts
- **Web3Forms** - Free form submission service

## 🚀 Getting Started

### Prerequisites

- Node.js 20.x or higher
- npm or yarn

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd gurus-classes-of-english
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Run the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## ⚙️ Configuration

### 1. Update Contact Information

Edit the following files to add your contact details:

- \`components/Footer.tsx\` - Update address, phone, email
- \`app/contact/page.tsx\` - Update contact information
- Replace \`YOUR_WHATSAPP_NUMBER\` with actual WhatsApp number
- Replace \`YOUR_PROFILE_ID\` with actual Facebook profile/page ID

### 2. Configure Web3Forms (Contact Form)

1. Visit [https://web3forms.com](https://web3forms.com)
2. Sign up for free and get your access key
3. Open \`components/ContactForm.tsx\`
4. Replace \`YOUR_WEB3FORMS_ACCESS_KEY\` with your actual key

### 3. Configure Disqus (Blog Comments)

1. Visit [https://disqus.com](https://disqus.com)
2. Sign up and create a new site
3. Get your Disqus shortname
4. Open \`components/DisqusComments.tsx\`
5. Replace \`YOUR-DISQUS-SHORTNAME\` with your actual shortname

### 4. Update SEO & Branding

- \`app/layout.tsx\` - Update meta tags and site information
- Update domain URLs from \`gurusclassesofenglish.com\` to your actual domain
- Add your Google verification code in \`app/layout.tsx\`

### 5. Add Blog Posts

Edit \`lib/blogData.ts\` to add, remove, or modify blog posts.

## 📦 Build for Production

\`\`\`bash
npm run build
\`\`\`

This will create an optimized static export in the \`out\` directory.

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Visit [https://vercel.com](https://vercel.com)
3. Import your repository
4. Vercel will automatically detect Next.js and deploy
5. Your site will be live with a \`.vercel.app\` domain
6. Add your custom domain in Vercel settings

### Deploy to Netlify

1. Push your code to GitHub
2. Visit [https://netlify.com](https://netlify.com)
3. Click "New site from Git"
4. Select your repository
5. Build command: \`npm run build\`
6. Publish directory: \`out\`
7. Deploy!

### Deploy to GitHub Pages

1. Build the site: \`npm run build\`
2. The static files will be in the \`out\` directory
3. Push the \`out\` directory to the \`gh-pages\` branch
4. Enable GitHub Pages in repository settings

## 📝 Customization

### Colors

Edit \`tailwind.config.ts\` to change the color scheme:
- Primary colors (blue shades)
- Accent colors (yellow shades)

### Fonts

The site uses:
- **Inter** for body text
- **Merriweather** for serif text

Change fonts in \`app/layout.tsx\`.

### Adding New Pages

1. Create a new folder in the \`app\` directory
2. Add a \`page.tsx\` file
3. Add the page link to \`components/Header.tsx\`

## 🎨 Adding Images

1. Create a \`public\` folder in the root directory
2. Add images: \`public/images/\`
3. Reference in code: \`/images/your-image.jpg\`

Recommended images to add:
- Favicon: \`public/favicon.ico\`
- Open Graph image: \`public/og-image.jpg\` (1200x630px)
- Logo: \`public/logo.png\`
- Course images
- Blog post images

## 📱 Social Media Integration

Update social media links in:
- \`components/Footer.tsx\`
- \`app/contact/page.tsx\`
- \`components/Header.tsx\` (if adding more social links)

## 📊 Analytics (Optional)

To add Google Analytics:
1. Get your GA tracking ID
2. Add the script to \`app/layout.tsx\` in the \`<head>\` section

## 🔧 Troubleshooting

### Build Errors

If you encounter build errors:
1. Delete \`.next\` folder and \`out\` folder
2. Delete \`node_modules\` folder
3. Run \`npm install\` again
4. Run \`npm run build\`

### Type Errors

If you see TypeScript errors:
1. Check that all imports are correct
2. Ensure all components export properly
3. Run \`npm run lint\` to check for issues

## 📄 License

MIT License - Feel free to use this for your educational projects.

## 👨‍🏫 About

Created for **S.D. Singh Ratan** - Gurus Classes of English

For questions or support, contact: contact@gurusclassesofenglish.com

---

**Made with ❤️ for English education**
