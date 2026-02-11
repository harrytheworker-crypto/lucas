# Deployment Checklist - Lucas Nygaard Projects

## Projects Ready for Deployment

### 1. lucasnygaard.com (Personal Website)
**Location:** `/projects/lucasnygaard.com/`
**Type:** Static HTML/CSS/JS
**Status:** ✅ Ready
**Deployment Target:** Netlify (recommended)

**Steps:**
1. Create Netlify account (if not exists)
2. Drag `lucasnygaard.com` folder to Netlify Drop
3. Set custom domain: `lucasnygaard.com`
4. Enable HTTPS
5. Test all 5 pages

**URL:** `https://lucasnygaard.com`

### 2. Mission Control Dashboard
**Location:** `/projects/mission-control/my-app/`
**Type:** NextJS 14 + Convex
**Status:** ✅ Ready
**Deployment Target:** Vercel + Convex Cloud

**Steps:**
1. Push to GitHub repository
2. Connect to Vercel
3. Set up Convex Cloud project
4. Configure environment variables
5. Deploy

**URL:** `https://mission-control.lucasnygaard.com` (or Vercel subdomain)

### 3. Unified Dashboard
**Location:** `/projects/unified-dashboard/`
**Type:** Single HTML file
**Status:** ✅ Ready
**Deployment Target:** Netlify Drop (easiest)

**Steps:**
1. Drag `index.html` to Netlify Drop
2. Get auto-generated URL
3. (Optional) Set custom domain: `dashboard.lucasnygaard.com`

**URL:** `https://dashboard.lucasnygaard.com`

## Deployment Order

1. **First:** Unified Dashboard (quickest, gives Lucas immediate access)
2. **Second:** Personal Website (core branding)
3. **Third:** Mission Control Dashboard (most complex)

## Testing Checklist

### After Deployment
- [ ] All links work from remote MacBook Pro
- [ ] Website loads all 5 pages
- [ ] Dashboard shows activity feed
- [ ] Calendar view displays correctly
- [ ] Global search works
- [ ] Unified dashboard opens both projects
- [ ] Mobile responsive on all devices

### Security
- [ ] HTTPS enabled on all domains
- [ ] No sensitive data exposed
- [ ] Convex API keys secured
- [ ] CORS properly configured

## Cost Considerations

### Free Tiers Available:
- **Netlify:** Free static hosting
- **Vercel:** Free NextJS hosting
- **Convex:** Free tier (1M reads/month)
- **Custom domains:** May need to purchase if not owned

### Potential Costs:
- Custom domains (~$10-15/year each)
- Convex usage if exceeds free tier
- Vercel usage if exceeds free tier

## Single Link Solution

**Goal:** One link Lucas can bookmark on remote MacBook Pro

**Implementation:**
1. Deploy Unified Dashboard to Netlify
2. Get URL like `https://lucas-nygaard-dashboard.netlify.app`
3. Update Unified Dashboard with actual deployed URLs
4. Test from remote location

**Backup:** If custom domains not ready, use Netlify/Vercel subdomains temporarily.

## Maintenance

### Regular Checks:
- Weekly: Test all links still work
- Monthly: Check deployment costs
- Quarterly: Update content on website
- As needed: Add new tools to Unified Dashboard

### Update Process:
1. Make changes locally
2. Test thoroughly
3. Deploy to staging (if available)
4. Deploy to production
5. Update Unified Dashboard links if needed

## Emergency Contacts

If deployments fail:
1. Check Netlify/Vercel status pages
2. Verify DNS settings
3. Check Convex dashboard
4. Review deployment logs

## Notes

- All projects are currently in draft/PR state
- Lucas must approve before pushing live
- Consider adding analytics (Plausible/Google Analytics)
- May want to add password protection for Mission Control
- Keep backup of all files before deployment