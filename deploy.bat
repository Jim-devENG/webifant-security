@echo off
echo 🚀 Webifant Security Deployment Script
echo =====================================

echo.
echo 📦 Building React application...
call npm run build

if %errorlevel% neq 0 (
    echo ❌ Build failed! Please check for errors.
    pause
    exit /b 1
)

echo ✅ Build completed successfully!

echo.
echo 📁 Creating deployment package...
if exist "deployment-package" rmdir /s /q "deployment-package"
mkdir "deployment-package"

echo Copying build files...
xcopy "build\*" "deployment-package\" /E /I /Y

echo.
echo 📋 Deployment package created in 'deployment-package' folder
echo.
echo 📋 Next Steps:
echo 1. Login to your Namecheap cPanel
echo 2. Open File Manager
echo 3. Navigate to public_html folder
echo 4. Upload ALL files from 'deployment-package' folder
echo 5. Set .htaccess permissions to 644
echo 6. Test your website
echo.
echo 📖 For detailed instructions, see: STEP_BY_STEP_DEPLOYMENT.md
echo.
pause
