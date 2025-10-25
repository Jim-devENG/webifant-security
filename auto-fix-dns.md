# 🔧 **Automatic DNS Fix Guide**

## **🚀 Quick Fix Script**

I've created an automated script to help you fix your DNS issue. Here's how to use it:

### **Step 1: Run the Fix Script**
```bash
# Windows
.\fix-dns.bat

# Mac/Linux
chmod +x fix-dns.sh
./fix-dns.sh
```

### **Step 2: Follow the Automated Steps**
The script will guide you through:
1. ✅ Checking domain status
2. ✅ Configuring nameservers
3. ✅ Adding A records
4. ✅ Testing DNS propagation
5. ✅ Verifying the fix

## **🔍 Alternative: Manual Quick Fix**

### **If the script doesn't work, here's the manual fix:**

1. **Login to Namecheap**
   - Go to https://namecheap.com
   - Login to your account

2. **Access Domain Management**
   - Go to Account → Domain List
   - Click "Manage" next to webifant.com

3. **Fix Nameservers**
   - Click "Advanced DNS" tab
   - Change nameservers to:
     - `dns1.registrar-servers.com`
     - `dns2.registrar-servers.com`

4. **Add A Record**
   - Click "Add New Record"
   - Select "A Record"
   - Host: `@`
   - Value: `YOUR_HOSTING_IP` (get from cPanel)
   - TTL: `Automatic`
   - Click Save

5. **Test DNS**
   - Go to https://whatsmydns.net
   - Enter: `webifant.com`
   - Select: `A` record
   - Check if it shows your hosting IP

## **⚡ Super Quick Fix (5 minutes)**

### **If you want the fastest solution:**

1. **Get your hosting IP from cPanel**
2. **Update DNS A record** to point to that IP
3. **Wait 15-30 minutes**
4. **Test your domain**

## **🔧 Troubleshooting**

### **If DNS still doesn't work:**

1. **Check if domain is active**
2. **Verify nameservers are correct**
3. **Make sure A record points to right IP**
4. **Wait longer (up to 24 hours)**
5. **Try accessing via IP directly**

## **📞 Need More Help?**

If you're still having issues:
1. Check Namecheap support documentation
2. Contact Namecheap support
3. Verify your hosting is active
4. Make sure files are uploaded correctly

## **✅ Success Indicators**

Your DNS is fixed when:
- ✅ Domain loads at https://webifant.com
- ✅ No more "DNS_PROBE_FINISHED_NXDOMAIN" error
- ✅ Website displays correctly
- ✅ All pages work properly

## **🎯 Next Steps After Fix**

Once DNS is working:
1. Test all website functionality
2. Verify Firebase connection
3. Test client registration
4. Check admin login
5. Ensure mobile responsiveness

**Your Webifant Security platform will be live! 🚀**
