#!/bin/bash

echo "🚀 Webifant Security Deployment Script"
echo "====================================="

echo ""
echo "📦 Building React application..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed! Please check for errors."
    exit 1
fi

echo "✅ Build completed successfully!"

echo ""
echo "📁 Creating deployment package..."
rm -rf deployment-package
mkdir deployment-package

echo "Copying build files..."
cp -r build/* deployment-package/

echo ""
echo "📋 Deployment package created in 'deployment-package' folder"
echo ""
echo "📋 Next Steps:"
echo "1. Login to your Namecheap cPanel"
echo "2. Open File Manager"
echo "3. Navigate to public_html folder"
echo "4. Upload ALL files from 'deployment-package' folder"
echo "5. Set .htaccess permissions to 644"
echo "6. Test your website"
echo ""
echo "📖 For detailed instructions, see: STEP_BY_STEP_DEPLOYMENT.md"
echo ""
