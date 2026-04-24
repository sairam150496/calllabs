# Image Optimization Guide

## Current Status
- **Hero Banner:** `src/assets/images/hero-banner.png` (389KB)
- **Status:** ⚠️ Medium size - Can be optimized

---

## Quick Optimization Steps

### Option 1: Online Tools (Easiest)

1. **TinyPNG** (Recommended)
   - Visit: https://tinypng.com
   - Upload: `src/assets/images/hero-banner.png`
   - Download optimized version
   - Replace the file
   - Expected size: ~150-200KB (50% reduction)

2. **Squoosh** (More Control)
   - Visit: https://squoosh.app
   - Upload your image
   - Choose settings:
     - Format: PNG or WebP
     - Quality: 80-90%
   - Download and replace
   - Expected size: ~100-150KB (60-70% reduction)

---

### Option 2: Automated Build-Time Optimization

Install Vite image plugin:

```bash
pnpm add -D vite-plugin-imagemin
```

Update `vite.config.ts`:

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteImagemin from 'vite-plugin-imagemin'

export default defineConfig({
  plugins: [
    react(),
    viteImagemin({
      gifsicle: { optimizationLevel: 7 },
      optipng: { optimizationLevel: 7 },
      mozjpeg: { quality: 80 },
      pngquant: { quality: [0.8, 0.9], speed: 4 },
      svgo: { plugins: [{ name: 'removeViewBox', active: false }] }
    })
  ]
})
```

---

### Option 3: WebP Format (Best Performance)

**Convert to WebP:**

```bash
# Using online tool or imagemagick:
brew install imagemagick
magick src/assets/images/hero-banner.png src/assets/images/hero-banner.webp
```

**Update Component:**

```tsx
// HeroSection.tsx
import heroBanner from '@/assets/images/hero-banner.png'
import heroBannerWebP from '@/assets/images/hero-banner.webp'

// In JSX:
<picture>
  <source srcSet={heroBannerWebP} type="image/webp" />
  <img
    src={heroBanner}
    alt="Healthcare Services"
    className="w-full h-full object-cover"
  />
</picture>
```

---

## Performance Impact

### Current (389KB PNG)
- ⚠️ **Load Time:**
  - Fast 4G: ~0.5s
  - Slow 3G: ~2-3s
  - Impact: Noticeable delay on slow connections

### After Optimization (150KB)
- ✅ **Load Time:**
  - Fast 4G: ~0.2s
  - Slow 3G: ~0.8-1s
  - Impact: Much faster

### After WebP (100KB)
- ✅ **Load Time:**
  - Fast 4G: ~0.1s
  - Slow 3G: ~0.5s
  - Impact: Minimal

---

## Best Practices

### 1. Image Sizes
- **Hero Images:** < 200KB (optimized PNG) or < 100KB (WebP)
- **Icons/Small Images:** < 20KB
- **Logos:** < 10KB (prefer SVG when possible)

### 2. Lazy Loading
```tsx
// For images below the fold
<img loading="lazy" src={image} alt="..." />
```

### 3. Responsive Images
```tsx
<img
  srcSet="
    image-small.png 400w,
    image-medium.png 800w,
    image-large.png 1200w
  "
  sizes="(max-width: 768px) 400px, 800px"
  src="image-medium.png"
  alt="..."
/>
```

### 4. Cache Headers
Vite automatically adds content hashing:
- `hero-banner.abc123.png`
- Browser caches forever
- New version = new hash = fresh download

---

## Recommendation for This Project

**Quick Win (5 minutes):**
1. Go to https://tinypng.com
2. Upload `src/assets/images/hero-banner.png`
3. Download optimized version
4. Replace file
5. **Done!** ~50% size reduction

**Better Performance (15 minutes):**
1. Use Squoosh to convert to WebP
2. Update HeroSection to use `<picture>` tag
3. Keep PNG as fallback
4. **Result:** ~70% size reduction + better compression

**Best Long-Term (30 minutes):**
1. Install `vite-plugin-imagemin`
2. All images optimized automatically
3. No manual work needed
4. **Result:** All images optimized in production build

---

## Monitoring

Check bundle size:
```bash
pnpm build
# Look for asset sizes in output
```

Analyze build:
```bash
pnpm add -D rollup-plugin-visualizer
# Add to vite.config.ts
# Run build
# Open stats.html
```

---

## Summary

✅ **Image replaced:** `hero-banner.png` now uses your new image  
⚠️ **Current size:** 389KB (medium)  
📈 **Recommended:** Optimize to ~150KB (TinyPNG) or ~100KB (WebP)  
🚀 **Impact:** 50-70% faster load time after optimization  

**Next Step:** Visit https://tinypng.com and optimize the image! 🎯
