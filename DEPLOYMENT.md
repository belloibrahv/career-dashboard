# Deployment Guide

This guide will help you deploy the Career Dashboard to Vercel.

## Prerequisites

- GitHub account with the repository pushed
- Vercel account (free tier available)
- Node.js 18+ installed locally

## Quick Deploy to Vercel

### Option 1: Using Vercel Dashboard (Recommended)

1. **Go to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Sign in with your GitHub account

2. **Import Project**
   - Click "New Project"
   - Select "Import Git Repository"
   - Choose `belloibrahv/career-dashboard`

3. **Configure Project**
   - Framework: Next.js (auto-detected)
   - Root Directory: `./career-dashboard` (if needed)
   - Build Command: `npm run build` (auto-detected)
   - Output Directory: `.next` (auto-detected)

4. **Environment Variables**
   - No environment variables required for basic functionality
   - Optional: Add `NEXT_PUBLIC_APP_NAME=Career Dashboard`

5. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Your app will be live at `https://your-project.vercel.app`

### Option 2: Using Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   cd career-dashboard
   vercel
   ```

3. **Follow Prompts**
   - Link to your Vercel account
   - Select project settings
   - Deploy

## Post-Deployment

### Verify Deployment

1. Visit your Vercel URL
2. Test all features:
   - Navigation between sections
   - Add/edit/delete operations
   - Data persistence (refresh page)
   - Responsive design on mobile

### Custom Domain (Optional)

1. In Vercel Dashboard, go to Project Settings
2. Navigate to "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

### Monitoring

- **Vercel Analytics**: Built-in performance monitoring
- **Error Tracking**: Automatic error reporting
- **Deployment History**: View all deployments

## Troubleshooting

### Build Fails

**Error**: `npm ERR! code ERESOLVE`
- **Solution**: Update dependencies
  ```bash
  npm install --legacy-peer-deps
  ```

**Error**: `Module not found`
- **Solution**: Ensure all imports use correct paths
- Check `tsconfig.json` path aliases

### App Not Loading

**Issue**: Blank page or 404
- **Solution**: 
  - Check browser console for errors
  - Verify all environment variables are set
  - Clear browser cache and reload

### Data Not Persisting

**Issue**: Data disappears after refresh
- **Solution**: 
  - Check browser LocalStorage is enabled
  - Verify no browser extensions blocking storage
  - Check browser console for errors

## Performance Optimization

### Current Optimizations

- ✅ Next.js static generation
- ✅ Image optimization with Next.js Image component
- ✅ CSS minification with Tailwind
- ✅ Code splitting and lazy loading
- ✅ Efficient state management with Zustand

### Monitoring Performance

1. **Vercel Analytics**
   - View Core Web Vitals
   - Monitor page load times
   - Track user interactions

2. **Lighthouse**
   - Run in Chrome DevTools
   - Check Performance, Accessibility, Best Practices

## Continuous Deployment

### Automatic Deployments

- Every push to `main` branch triggers automatic deployment
- Vercel builds and deploys automatically
- Previous deployments remain accessible

### Preview Deployments

- Pull requests automatically get preview URLs
- Share preview links for feedback
- Merge to main when ready

## Rollback

If you need to revert to a previous deployment:

1. Go to Vercel Dashboard
2. Select your project
3. Go to "Deployments"
4. Find the deployment you want
5. Click the three dots menu
6. Select "Promote to Production"

## Environment Variables

### Available Variables

```env
# Application
NEXT_PUBLIC_APP_NAME=Career Dashboard

# Add custom variables as needed
# Variables prefixed with NEXT_PUBLIC_ are exposed to browser
```

### Setting Variables in Vercel

1. Go to Project Settings
2. Navigate to "Environment Variables"
3. Add variables for different environments:
   - Production
   - Preview
   - Development

## Security

### Best Practices

- ✅ No sensitive data in environment variables
- ✅ All data stored locally in browser
- ✅ No backend API calls
- ✅ HTTPS enforced by Vercel
- ✅ Security headers configured in `vercel.json`

### Headers Configured

- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`

## Support

For deployment issues:

1. Check [Vercel Documentation](https://vercel.com/docs)
2. Review [Next.js Deployment Guide](https://nextjs.org/docs/deployment)
3. Check GitHub Issues
4. Contact support@ibtech.com

## Success Checklist

- [ ] Repository pushed to GitHub
- [ ] Vercel project created
- [ ] Build completes successfully
- [ ] App loads without errors
- [ ] All features work correctly
- [ ] Data persists after refresh
- [ ] Responsive design works on mobile
- [ ] Custom domain configured (optional)

---

**Your Career Dashboard is now live! 🚀**
