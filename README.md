# Premium Futuristic Portfolio

A production-grade premium developer portfolio with cosmic animations, glassmorphism, and modern tech stack.

## Features

- 🌌 Animated cosmic background with twinkling stars
- 💎 Glassmorphic UI components
- 🎨 Purple-cyan gradient design system
- ⚡ Smooth Framer Motion animations
- 🎯 Orbital skills visualization
- 📱 Fully responsive design
- 🔒 Security section with animated lock
- 📊 Project showcase with hover effects
- 📧 Contact form with validation
- 🎭 Premium dark neon aesthetic

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Deployment:** Vercel (recommended)

## Getting Started

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the portfolio.

### Build for Production

```bash
npm run build
npm start
```

## Customization

### Personal Information

Update the following files with your information:

1. **components/Navbar.tsx** - Name and social links
2. **components/Hero.tsx** - Name, title, description, buttons
3. **components/Experience.tsx** - Education and work experience
4. **components/Projects.tsx** - Your projects
5. **components/Contact.tsx** - Contact information
6. **components/Footer.tsx** - Footer links

### Colors

Modify `tailwind.config.ts` to change the color scheme:

```typescript
colors: {
  primary: "#8B5CF6",    // Purple
  secondary: "#06B6D4",  // Cyan
  cosmic: "#020014",     // Background
}
```

### Profile Image

Replace the placeholder in `components/Hero.tsx` with your actual image:

```tsx
<img src="/your-image.jpg" alt="Profile" className="w-full h-full object-cover" />
```

## Project Structure

```
portfolio/
├── app/
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Main page
│   └── globals.css      # Global styles
├── components/
│   ├── Navbar.tsx       # Navigation bar
│   ├── Hero.tsx         # Hero section
│   ├── OrbitSkills.tsx  # Orbital skills animation
│   ├── Skills.tsx       # Tech stack showcase
│   ├── Security.tsx     # Security section
│   ├── Experience.tsx   # Experience & education
│   ├── Projects.tsx     # Project showcase
│   ├── Contact.tsx      # Contact form
│   ├── Footer.tsx       # Footer
│   └── StarBackground.tsx # Animated stars
├── public/              # Static assets
└── tailwind.config.ts   # Tailwind configuration
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Deploy automatically

### Other Platforms

Build the static site:

```bash
npm run build
```

Deploy the `.next` folder to your hosting provider.

## Performance

- Lazy loading for images
- Optimized animations
- Minimal bundle size
- Fast page loads

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License - feel free to use for your own portfolio!

## Credits

Built with modern web technologies and premium design principles.
