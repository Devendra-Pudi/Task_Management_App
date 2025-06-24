# Environment Variables Setup Order

## 1. Initial Backend Deploy (Render.com)
```env
# Initial environment variables
NODE_ENV=production
PORT=10000
MONGODB_URI=mongodb+srv://...  # Your MongoDB Atlas URI
JWT_SECRET=your_secure_secret
FRONTEND_URL=http://localhost:3000  # Temporary
```

## 2. Frontend Deploy (Netlify)
```env
# Initial frontend variables
VITE_API_URL=https://your-backend-xyz.onrender.com/api  # Your Render.com backend URL
VITE_APP_ENV=production
```

## 3. Update Backend (Render.com)
```env
# Update FRONTEND_URL after getting Netlify URL
FRONTEND_URL=https://your-app-xyz.netlify.app  # Your actual Netlify URL
```

## Steps in Order:

1. **Deploy Backend First**
   - Deploy to Render.com with temporary FRONTEND_URL
   - Get your backend URL (e.g., `https://taskmagic-api.onrender.com`)

2. **Deploy Frontend**
   - Add backend URL to frontend env vars
   - Deploy to Netlify
   - Get your frontend URL (e.g., `https://taskmagic-xyz.netlify.app`)

3. **Update Backend**
   - Go to Render.com dashboard
   - Update FRONTEND_URL with Netlify URL
   - Save changes (Render will auto-redeploy)

## Quick Environment Update Guide

### On Render.com:
1. Go to Dashboard
2. Select your service
3. Click "Environment"
4. Click "Add Environment Variable"
5. Update FRONTEND_URL
6. Click "Save Changes"

### On Netlify:
1. Go to Site settings
2. Click "Environment variables"
3. Add/Update variables
4. Trigger redeploy if needed

## Testing the Connection:
1. Backend Health Check:
   ```
   curl https://your-backend-xyz.onrender.com/health
   ```

2. Frontend API Test:
   - Open browser console
   - Check network requests
   - Verify CORS is working 