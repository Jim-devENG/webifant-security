@echo off
echo 🔧 Webifant DNS Configuration Fixer
echo ====================================

echo.
echo 📋 This script will help you fix your DNS configuration
echo.

echo 🔍 Step 1: Checking your domain status...
echo.
echo Please follow these steps in your browser:
echo.
echo 1. Go to https://namecheap.com
echo 2. Login to your account
echo 3. Go to Account → Domain List
echo 4. Find your domain (webifant.com)
echo 5. Click "Manage" next to your domain
echo.

pause

echo.
echo 🌐 Step 2: DNS Configuration
echo.
echo In your domain management page:
echo.
echo A. Click "Advanced DNS" tab
echo B. Look for "Nameservers" section
echo C. Change to "Namecheap BasicDNS" or use:
echo    - dns1.registrar-servers.com
echo    - dns2.registrar-servers.com
echo.

pause

echo.
echo 📝 Step 3: Add A Record
echo.
echo In Advanced DNS section:
echo.
echo 1. Click "Add New Record"
echo 2. Select "A Record"
echo 3. Host: @
echo 4. Value: YOUR_HOSTING_IP (get from cPanel)
echo 5. TTL: Automatic
echo 6. Click Save
echo.

pause

echo.
echo 🚀 Step 4: Test DNS Configuration
echo.
echo Opening DNS checker...
start https://whatsmydns.net

echo.
echo Enter your domain: webifant.com
echo Select "A" record type
echo Check if it shows your hosting IP
echo.

pause

echo.
echo ⏰ Step 5: Wait for DNS Propagation
echo.
echo DNS changes take 2-6 hours to propagate
echo You can test with:
echo - http://YOUR_HOSTING_IP (direct IP access)
echo - Temporary URL from cPanel
echo.

echo.
echo ✅ DNS Configuration Complete!
echo.
echo Your domain should work in 2-6 hours
echo Test at: https://webifant.com
echo.

pause
