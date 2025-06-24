# Free Deployment Guide for TaskMagic

## 1. Database Setup (MongoDB Atlas - Free Forever)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster (Choose M0 Free Tier)
   - Select "Shared" cluster type
   - Choose AWS as provider
   - Select a region close to you
   - Select M0 Sandbox (Free forever)
   - Name your cluster (e.g., "taskmagic")

4. Set up database access:
   - Go to Security → Database Access
   - Add new database user
   - Choose password authentication
   - Set username and password
   - Set role to "Atlas admin"

5. Set up network access:
   - Go to Security → Network Access
   - Click "Add IP Address"
   - Choose "Allow access from anywhere" (0.0.0.0/0)

6. Get your connection string:
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace <password> with your database user password

## 2. Backend Deployment (Render.com - Free Tier)

1. Go to [Render](https://render.com)
2. Sign up with your GitHub account
3. Create a new Web Service
   - Connect your GitHub repository
   - Choose the repository
   - Name: "taskmagic-backend"
   - Root Directory: "backend"
   - Environment: Node
   - Build Command: `npm install`
   - Start Command: `npm start`

4. Add environment variables:
   ```
   NODE_ENV=production
   PORT=10000
   MONGODB_URI=your_mongodb_atlas_uri
   JWT_SECRET=your_secure_jwt_secret
   FRONTEND_URL=your_frontend_url
   ```

5. Deploy the service
   - Render will automatically deploy when you push to main branch

## 3. Frontend Deployment (Netlify - Free Tier)

1. Go to [Netlify](https://www.netlify.com)
2. Sign up with GitHub
3. Click "New site from Git"
   - Choose your repository
   - Base directory: "frontend"
   - Build command: `npm run build`
   - Publish directory: `dist`

4. Add environment variables:
   ```
   VITE_API_URL=your_render_backend_url/api
   VITE_APP_ENV=production
   ```

5. Deploy the site
   - Netlify will automatically deploy when you push to main branch

## 4. Keep Your App Always Running (Free Methods)

1. **Prevent Backend Sleep:**
   - Create an `uptimerobot.js` file in backend:
   ```javascript
   const axios = require('axios');
   
   // Ping your app every 14 minutes
   setInterval(async () => {
     try {
       await axios.get('your_render_backend_url/health');
       console.log('Keeping backend alive:', new Date().toISOString());
     } catch (error) {
       console.error('Error pinging backend:', error.message);
     }
   }, 14 * 60 * 1000);
   ```
   - Add to your backend/server.js:
   ```javascript
   if (process.env.NODE_ENV === 'production') {
     require('./uptimerobot');
   }
   ```

2. **Set Up External Monitoring (UptimeRobot - Free):**
   1. Go to [UptimeRobot](https://uptimerobot.com)
   2. Create free account
   3. Add new monitor:
      - Type: HTTP(s)
      - Name: TaskMagic Backend
      - URL: your_render_backend_url/health
      - Monitoring Interval: 5 minutes

3. **Database Optimization:**
   - Set TTL (Time To Live) indexes for temporary data
   - Implement caching for frequently accessed data
   - Use MongoDB Atlas free tier features:
     ```javascript
     // Add to your Task model
     taskSchema.index({ createdAt: 1 }, { expireAfterSeconds: 30 * 24 * 60 * 60 }); // 30 days
     ```

## 5. Maintaining Free Tier Limits

1. **MongoDB Atlas (Free Tier Limits):**
   - 512MB storage
   - Shared RAM
   - Keep documents small
   - Regular cleanup of old data

2. **Render (Free Tier Limits):**
   - 750 hours/month
   - 512MB RAM
   - Shared CPU
   - Implement efficient API endpoints

3. **Netlify (Free Tier Limits):**
   - 100GB bandwidth/month
   - 300 minutes build time/month
   - Unlimited sites
   - Optimize asset sizes

## 6. Monitoring Setup (Free)

1. **MongoDB Atlas Monitoring:**
   - Enable free monitoring in Atlas dashboard
   - Set up email alerts for database issues

2. **Render Monitoring:**
   - Enable Render logs
   - Set up deployment notifications

3. **Netlify Monitoring:**
   - Enable deploy notifications
   - Monitor build logs

## 7. Backup Strategy (Free)

1. **Database Backups:**
   ```bash
   # Add to package.json scripts
   "backup": "mongodump --uri your_mongodb_uri"
   ```
   - Run weekly manual backups
   - Store in GitHub as releases

2. **Code Backups:**
   - Regular commits to GitHub
   - Create releases for stable versions

## Important Notes

1. Free tiers are suitable for:
   - Personal projects
   - Portfolio demos
   - Small-scale applications
   - Up to 100 daily active users

2. To stay within free limits:
   - Implement proper caching
   - Optimize database queries
   - Minimize API calls
   - Use CDN for static assets

3. Upgrade considerations:
   - Monitor usage metrics
   - Set up alerts for approaching limits
   - Have a scaling plan ready 