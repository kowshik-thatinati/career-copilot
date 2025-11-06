# 🚀 Deployment Guide

Guide for deploying Career Compass to production.

## Backend Deployment

### Option 1: Railway (Recommended)

1. **Sign up at [Railway.app](https://railway.app)**

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository

3. **Configure**
   - Set root directory to `backend`
   - Add environment variables:
     ```
     PORT=5000
     GEMINI_API_KEY=your_api_key
     ```

4. **Deploy**
   - Railway will automatically deploy
   - Copy the generated URL (e.g., `https://your-app.railway.app`)

### Option 2: Render

1. **Sign up at [Render.com](https://render.com)**

2. **Create Web Service**
   - Connect your GitHub repository
   - Set root directory: `backend`
   - Build command: `npm install`
   - Start command: `npm start`

3. **Environment Variables**
   ```
   PORT=5000
   GEMINI_API_KEY=your_api_key
   ```

### Option 3: Heroku

```bash
# Install Heroku CLI
heroku login

# Create app
heroku create career-compass-backend

# Set environment variables
heroku config:set GEMINI_API_KEY=your_api_key

# Deploy
cd backend
git init
git add .
git commit -m "Initial commit"
heroku git:remote -a career-compass-backend
git push heroku main
```

## Frontend Deployment

### Option 1: Vercel (Recommended)

1. **Sign up at [Vercel.com](https://vercel.com)**

2. **Import Project**
   - Click "New Project"
   - Import your GitHub repository
   - Set root directory to `frontend`

3. **Configure Build Settings**
   - Framework Preset: Create React App
   - Build Command: `npm run build`
   - Output Directory: `build`

4. **Environment Variables**
   ```
   REACT_APP_API_URL=https://your-backend-url.railway.app
   ```

5. **Deploy**
   - Click "Deploy"
   - Vercel will build and deploy automatically

### Option 2: Netlify

1. **Sign up at [Netlify.com](https://netlify.com)**

2. **New Site from Git**
   - Connect GitHub repository
   - Base directory: `frontend`
   - Build command: `npm run build`
   - Publish directory: `frontend/build`

3. **Environment Variables**
   ```
   REACT_APP_API_URL=https://your-backend-url.railway.app
   ```

### Option 3: Firebase Hosting

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Initialize
cd frontend
firebase init hosting

# Build
npm run build

# Deploy
firebase deploy --only hosting
```

## Environment Variables Setup

### Backend (.env)
```env
PORT=5000
GEMINI_API_KEY=your_gemini_api_key_here
NODE_ENV=production
```

### Frontend (.env.production)
```env
REACT_APP_API_URL=https://your-backend-url.com
```

## Post-Deployment Checklist

- [ ] Backend is accessible and returns health check
- [ ] Frontend can connect to backend API
- [ ] Firebase authentication works
- [ ] CORS is properly configured
- [ ] Environment variables are set correctly
- [ ] HTTPS is enabled
- [ ] Custom domain configured (optional)

## Testing Production Build Locally

### Backend
```bash
cd backend
NODE_ENV=production npm start
```

### Frontend
```bash
cd frontend
npm run build
npx serve -s build
```

## Monitoring & Maintenance

### Backend Monitoring
- Check server logs regularly
- Monitor API response times
- Set up error tracking (e.g., Sentry)

### Frontend Monitoring
- Use Google Analytics
- Monitor Core Web Vitals
- Set up error tracking

## Scaling Considerations

### Backend
- Use load balancer for multiple instances
- Implement caching (Redis)
- Database optimization
- Rate limiting

### Frontend
- CDN for static assets
- Image optimization
- Code splitting
- Lazy loading

## Security Best Practices

1. **Never commit `.env` files**
2. **Use HTTPS everywhere**
3. **Implement rate limiting**
4. **Validate all inputs**
5. **Keep dependencies updated**
6. **Use security headers**
7. **Regular security audits**

## Troubleshooting

### CORS Issues
Add your frontend domain to backend CORS configuration:
```javascript
app.use(cors({
  origin: ['https://your-frontend-domain.com']
}));
```

### Build Failures
- Check Node.js version compatibility
- Verify all dependencies are installed
- Check build logs for specific errors

### API Connection Issues
- Verify backend URL in frontend environment variables
- Check if backend is running and accessible
- Verify CORS configuration

## Cost Estimation

### Free Tier Options
- **Railway**: $5 credit/month (enough for small apps)
- **Render**: Free tier available
- **Vercel**: Free for personal projects
- **Netlify**: Free tier with 100GB bandwidth

### Paid Options
- **Railway**: ~$5-20/month
- **Render**: ~$7-25/month
- **Vercel Pro**: $20/month
- **Netlify Pro**: $19/month

## Support

For deployment issues, check:
1. Platform-specific documentation
2. GitHub Issues
3. Community forums

---

**Ready to deploy? Follow the steps above and your Career Compass will be live! 🚀**
