# Task Magic Deployment Guide

## Prerequisites
- GitHub account
- MongoDB Atlas account
- Railway.app account
- Vercel account

## Step 1: Database Setup (MongoDB Atlas)

1. Create a new cluster in MongoDB Atlas
2. Set up database access:
   - Create a database user
   - Set up network access (IP whitelist)
3. Get your MongoDB connection string

## Step 2: Backend Deployment (Railway.app)

1. Push your code to GitHub
2. Connect Railway to your GitHub repository
3. Set up environment variables:
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email
EMAIL_PASS=your_app_specific_password
NODE_ENV=production
PORT=5000
```
4. Deploy your backend:
```bash
# Install Railway CLI
npm i -g @railway/cli

# Login to Railway
railway login

# Link your project
railway link

# Deploy
railway up
```

## Step 3: Frontend Deployment (Vercel)

1. Create a `.env.production` file in your frontend directory:
```env
VITE_API_URL=https://your-railway-app-url.railway.app/api
```

2. Update your frontend code:
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

## Step 4: Domain and SSL Setup

1. Purchase a domain (optional)
2. Set up custom domains in both Railway and Vercel
3. Configure DNS settings
4. SSL certificates will be automatically provisioned

## Step 5: Monitoring and Maintenance

1. Set up MongoDB Atlas monitoring
2. Configure Railway.app alerts
3. Set up Vercel analytics
4. Regular maintenance tasks:
   - Monitor error logs
   - Check performance metrics
   - Update dependencies
   - Regular backups

## Performance Optimization

1. Frontend:
   - Enable Vite's production optimizations
   - Implement code splitting
   - Use CDN for static assets
   - Enable caching

2. Backend:
   - Implement rate limiting
   - Use caching (Redis optional)
   - Optimize database queries
   - Enable compression

## Security Measures

1. Enable CORS properly
2. Set up security headers
3. Implement rate limiting
4. Use environment variables for sensitive data
5. Regular security audits

## Scaling Considerations

1. MongoDB Atlas:
   - Start with M0 (free) or M2 ($9/month)
   - Scale up based on usage

2. Railway.app:
   - Start with starter plan
   - Scale based on usage metrics

3. Vercel:
   - Free tier is sufficient for start
   - Pro plan for team features

## Cost Optimization

1. MongoDB Atlas:
   - Free tier: 512MB storage
   - M2 Cluster: $9/month (recommended)

2. Railway.app:
   - Free tier: Limited hours
   - Starter: $5-10/month

3. Vercel:
   - Free tier: Sufficient for most needs
   - Pro: $20/month (optional)

Total estimated cost: $15-30/month for a production setup

## Backup Strategy

1. MongoDB Atlas:
   - Enable automated backups
   - Schedule regular backups
   - Test restore procedures

2. Code:
   - GitHub repository backup
   - Regular commits and tags

## Monitoring Setup

1. Set up Uptime monitoring
2. Configure error tracking
3. Set up performance monitoring
4. Enable email alerts for critical issues 