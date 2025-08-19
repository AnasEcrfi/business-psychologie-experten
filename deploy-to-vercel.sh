#!/bin/bash

echo "🚀 Deploying Business Psychologie Experten to Vercel..."

# Build the project first
echo "📦 Building project..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    
    # Deploy to Vercel
    echo "☁️  Deploying to Vercel..."
    vercel --prod
    
    if [ $? -eq 0 ]; then
        echo "✅ Deployment successful!"
        echo "🌐 Your site is now live on Vercel!"
    else
        echo "❌ Deployment failed. Please check the errors above."
    fi
else
    echo "❌ Build failed. Please fix the errors before deploying."
fi