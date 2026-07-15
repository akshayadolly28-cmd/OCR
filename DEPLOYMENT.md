# Deployment Guide

## Backend Deployment on Render

### Prerequisites
- Render account (https://render.com)
- MongoDB Atlas account (https://cloud.mongodb.com)
- GitHub repository with code

### Steps

#### 1. Setup MongoDB Atlas

1. Create MongoDB Atlas account
2. Create a cluster (M0 free tier)
3. Create database user with username/password
4. Whitelist IP (0.0.0.0/0 for testing)
5. Get connection string: `mongodb+srv://user:pass@cluster.mongodb.net/ocr?retryWrites=true&w=majority`

#### 2. Create Render Service

1. Login to Render dashboard
2. Click "New +" → "Web Service"
3. Connect GitHub repository
4. Select branch to deploy (main)

#### 3. Configure Backend Service

- **Name**: ocr-server
- **Environment**: Node
- **Build Command**: `npm install`
- **Start Command**: `node server.js`

#### 4. Set Environment Variables

Add in Render dashboard:

```
PORT=5000
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/ocr?retryWrites=true&w=majority
JWT_SECRET=your_very_secure_secret_key_here_change_this
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password_16_chars
NODE_ENV=production
```

#### 5. Deploy

- Click "Create Web Service"
- Wait for deployment to complete
- Get backend URL (e.g., https://ocr-server.onrender.com)

---

## Frontend Deployment on Vercel

### Prerequisites
- Vercel account (https://vercel.com)
- GitHub repository with code

### Steps

#### 1. Create Vercel Project

1. Go to vercel.com
2. Click "Add New Project"
3. Import GitHub repository
4. Select `client` folder as root directory

#### 2. Configure Build Settings

- **Framework**: Create React App
- **Build Command**: `npm run build`
- **Output Directory**: `build`
- **Install Command**: `npm install`

#### 3. Set Environment Variables

Add in Vercel:

```
REACT_APP_API_URL=https://ocr-server.onrender.com/api
```

#### 4. Deploy

- Click "Deploy"
- Wait for build to complete
- Get frontend URL (e.g., https://ocr-client.vercel.app)

---

## Configure CORS for Production

Update `server/app.js`:

```javascript
const cors = require('cors');
const app = express();

app.use(cors({
  origin: ['https://ocr-client.vercel.app', 'http://localhost:3000'],
  credentials: true
}));
```

---

## Database Backup

### MongoDB Atlas Backup

1. In MongoDB Atlas dashboard
2. Go to Backup section
3. Enable automated backups
4. Download backups as needed

### Manual Export

```bash
mongodump --uri "mongodb+srv://user:pass@cluster.mongodb.net/ocr"
mongoexport --uri "mongodb+srv://user:pass@cluster.mongodb.net/ocr" \
  --collection complaints \
  --out complaints.json
```

---

## Performance Optimization

### Frontend
- Lazy loading pages with React.lazy
- Code splitting with Webpack
- Minification in production build
- CDN for static assets (Vercel provides)

### Backend
- MongoDB indexing (already implemented)
- Pagination for large datasets
- Caching (Redis optional)
- Compression middleware

Add to `server/app.js`:
```javascript
const compression = require('compression');
app.use(compression());
```

---

## Monitoring & Logging

### Render Logs
- All logs visible in Render dashboard
- Real-time monitoring

### Error Tracking
Consider adding:
- Sentry for error tracking
- LogRocket for frontend monitoring
- PM2 for process management (self-hosted)

---

## Domain Setup

### Render
1. Go to service settings
2. Custom Domain → Add
3. Enter your domain
4. Follow DNS instructions

### Vercel
1. Project settings → Domains
2. Add custom domain
3. Update DNS records

---

## SSL/TLS Certificates

Both Render and Vercel provide free SSL certificates automatically.

---

## Troubleshooting

### 502 Bad Gateway on Render
- Check if server is crashing
- Review environment variables
- Check MongoDB connection string
- Review logs in Render dashboard

### Blank page on Vercel
- Check REACT_APP_API_URL is correct
- Verify CORS settings on backend
- Check browser console for errors
- Clear browser cache

### CORS Issues
- Ensure backend CORS includes frontend URL
- Check Authorization headers
- Verify content-type headers

---

## CI/CD Pipeline

### GitHub Actions (Optional)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Render

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Render
        run: |
          curl https://api.render.com/deploy/srv-${{ secrets.RENDER_SERVICE_ID }}?key=${{ secrets.RENDER_API_KEY }}
```

---

## Scaling Considerations

- Use MongoDB clusters for better performance
- Implement Redis caching
- Use CDN for static assets
- Load balancing (Render handles automatically)
- Database connection pooling

---

## Security Checklist

- [ ] Change JWT_SECRET in production
- [ ] Use strong database password
- [ ] Whitelist production URLs in CORS
- [ ] Enable HTTPS (automatic)
- [ ] Use environment variables for all secrets
- [ ] Enable MongoDB encryption at rest
- [ ] Setup rate limiting (optional)
- [ ] Regular security audits

---

## Cost Estimation

- **Render**: $7/month (hobby tier free with limitations)
- **Vercel**: Free (up to 100GB bandwidth/month)
- **MongoDB Atlas**: Free (M0 cluster, 512MB storage)

---

## Support

For issues:
1. Check Render/Vercel documentation
2. Review logs
3. Test locally first
4. Check GitHub issues
5. Contact support

---

**Production deployment complete! 🚀**
