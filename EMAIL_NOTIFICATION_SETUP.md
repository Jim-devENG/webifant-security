# Email Notification System Setup Guide

## Overview

This guide explains how to set up email notifications for the WebInfant referrer system using Firebase Functions and a reliable email service.

## Email Service Options

### Option 1: SendGrid (Recommended)

- **Pros**: Reliable, good deliverability, free tier available
- **Cons**: Requires API key setup
- **Free Tier**: 100 emails/day

### Option 2: Nodemailer with Gmail

- **Pros**: Easy setup, uses your Gmail account
- **Cons**: Limited to Gmail, requires app password
- **Free Tier**: Gmail daily limits

### Option 3: Firebase Extensions

- **Pros**: Easy setup, managed by Firebase
- **Cons**: Limited customization
- **Free Tier**: Varies by extension

## Step 1: Set Up SendGrid (Recommended)

### 1.1 Create SendGrid Account

1. Go to https://sendgrid.com
2. Sign up for a free account
3. Verify your email address
4. Get your API key from Settings → API Keys

### 1.2 Install Dependencies

```bash
cd functions
npm install @sendgrid/mail
```

### 1.3 Create Email Function

```javascript
// functions/index.js
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const sgMail = require("@sendgrid/mail");

admin.initializeApp();
sgMail.setApiKey(functions.config().sendgrid.api_key);

// Send email notification
exports.sendEmailNotification = functions.firestore
  .document("emailNotifications/{notificationId}")
  .onCreate(async (snap, context) => {
    const notification = snap.data();

    try {
      const msg = {
        to: notification.userEmail,
        from: "noreply@webinfant.com", // Your verified sender
        subject: notification.subject,
        html: notification.message,
        trackingSettings: {
          clickTracking: {
            enable: true,
            enableText: true,
          },
          openTracking: {
            enable: true,
          },
        },
      };

      await sgMail.send(msg);

      // Update notification status
      await snap.ref.update({
        status: "sent",
        sentAt: admin.firestore.FieldValue.serverTimestamp(),
      });

      console.log("Email sent successfully:", notification.userEmail);
    } catch (error) {
      console.error("Error sending email:", error);

      // Update notification status
      await snap.ref.update({
        status: "failed",
        error: error.message,
        retryCount: (notification.retryCount || 0) + 1,
      });
    }
  });

// Retry failed emails
exports.retryFailedEmails = functions.pubsub
  .schedule("every 1 hours")
  .onRun(async (context) => {
    const failedEmails = await admin
      .firestore()
      .collection("emailNotifications")
      .where("status", "==", "failed")
      .where("retryCount", "<", 3)
      .get();

    for (const doc of failedEmails.docs) {
      const notification = doc.data();

      try {
        const msg = {
          to: notification.userEmail,
          from: "noreply@webinfant.com",
          subject: notification.subject,
          html: notification.message,
        };

        await sgMail.send(msg);

        await doc.ref.update({
          status: "sent",
          sentAt: admin.firestore.FieldValue.serverTimestamp(),
        });
      } catch (error) {
        console.error("Retry failed:", error);
        await doc.ref.update({
          retryCount: notification.retryCount + 1,
        });
      }
    }
  });
```

## Step 2: Set Up Environment Variables

### 2.1 Set SendGrid API Key

```bash
firebase functions:config:set sendgrid.api_key="YOUR_SENDGRID_API_KEY"
```

### 2.2 Set Sender Email

```bash
firebase functions:config:set email.sender="noreply@webinfant.com"
```

## Step 3: Verify Sender Domain

### 3.1 In SendGrid Dashboard

1. Go to Settings → Sender Authentication
2. Click "Authenticate Your Domain"
3. Follow the DNS setup instructions
4. Add the required CNAME records to your domain

### 3.2 Alternative: Verify Single Sender

1. Go to Settings → Sender Authentication
2. Click "Verify a Single Sender"
3. Add your email address
4. Click the verification link in your email

## Step 4: Update Frontend Integration

### 4.1 Update Email Service

```javascript
// src/firebase/emailService.js

// Add this function to trigger email sending
async triggerEmailSending(userEmail, subject, message, type = 'general') {
  try {
    // Create notification record (this triggers the Firebase Function)
    const notification = {
      userEmail,
      subject,
      message,
      type,
      status: 'pending',
      createdAt: serverTimestamp(),
      sentAt: null,
      retryCount: 0
    };

    const docRef = await addDoc(collection(db, 'emailNotifications'), notification);

    return { success: true, notificationId: docRef.id };
  } catch (error) {
    console.error('Error triggering email:', error);
    throw new Error('Failed to trigger email sending');
  }
}
```

## Step 5: Test Email System

### 5.1 Test Function

```javascript
// Test email sending
const testEmail = async () => {
  try {
    await emailService.sendWelcomeNotification(
      "test@example.com",
      "Test User",
      "client"
    );
    console.log("Test email triggered successfully");
  } catch (error) {
    console.error("Test email failed:", error);
  }
};
```

### 5.2 Check Firebase Console

1. Go to Firebase Console → Functions
2. Check the logs for email sending
3. Verify emails are being sent

## Step 6: Integration with Existing Services

### 6.1 Update Referrer Registration

```javascript
// In ReferrerRegistration.js, after successful registration
import {emailService} from "../firebase/emailService";

// After successful registration
await emailService.sendWelcomeNotification(
  formData.email,
  formData.fullName,
  "referrer"
);
```

### 6.2 Update Client Registration

```javascript
// In ClientRegistration.js, after successful registration
await emailService.sendWelcomeNotification(
  formData.email,
  formData.fullName,
  "client"
);
```

### 6.3 Update Commission System

```javascript
// In paymentService.js, when commission is earned
await emailService.sendCommissionNotification(
  referrer.email,
  referrer.fullName,
  commissionAmount,
  serviceType
);
```

### 6.4 Update Payout System

```javascript
// In paymentService.js, when payout is processed
await emailService.sendPayoutNotification(
  referrer.email,
  referrer.fullName,
  payoutAmount,
  "paid"
);
```

## Step 7: Email Templates

### 7.1 Template Variables

```javascript
const templateVariables = {
  userName: "John Doe",
  userEmail: "john@example.com",
  commissionAmount: 150.0,
  serviceType: "consulting",
  payoutAmount: 500.0,
  dashboardUrl:
    "https://webinfant-react-aw4nzyk2g-jimdevengs-projects.vercel.app/referrer-dashboard",
};
```

### 7.2 HTML Email Template

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>WebInfant Notification</title>
  </head>
  <body
    style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4;"
  >
    <div style="max-width: 600px; margin: 0 auto; background-color: white;">
      <!-- Header -->
      <div
        style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center;"
      >
        <h1 style="margin: 0; font-size: 28px;">WebInfant</h1>
        <p style="margin: 10px 0 0 0; font-size: 16px;">
          Cybersecurity Excellence
        </p>
      </div>

      <!-- Content -->
      <div style="padding: 30px;">
        <h2 style="color: #333; margin-top: 0;">Hello {{userName}},</h2>
        <p style="color: #666; line-height: 1.6;">{{message}}</p>

        <!-- CTA Button -->
        <div style="text-align: center; margin: 30px 0;">
          <a
            href="{{dashboardUrl}}"
            style="background: #007bff; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;"
          >
            View Dashboard
          </a>
        </div>
      </div>

      <!-- Footer -->
      <div
        style="text-align: center; padding: 20px; color: #999; font-size: 12px; background-color: #f8f9fa;"
      >
        <p>© 2024 WebInfant. All rights reserved.</p>
        <p>This email was sent to {{userEmail}}</p>
      </div>
    </div>
  </body>
</html>
```

## Step 8: Monitoring and Analytics

### 8.1 SendGrid Analytics

1. Go to SendGrid Dashboard → Activity
2. Monitor email delivery rates
3. Check bounce and spam reports
4. Track open and click rates

### 8.2 Firebase Analytics

```javascript
// Track email events
import {getAnalytics, logEvent} from "firebase/analytics";

const analytics = getAnalytics();

// Log email sent
logEvent(analytics, "email_sent", {
  email_type: "welcome",
  user_type: "referrer",
});

// Log email opened
logEvent(analytics, "email_opened", {
  email_type: "commission",
  user_type: "referrer",
});
```

## Step 9: Best Practices

### 9.1 Email Deliverability

- Use verified sender domains
- Keep email content relevant
- Avoid spam trigger words
- Monitor bounce rates
- Clean email lists regularly

### 9.2 Performance

- Use Firebase Functions timeout settings
- Implement retry logic
- Batch email sending when possible
- Monitor function execution times

### 9.3 Security

- Never expose API keys in client code
- Use environment variables
- Implement rate limiting
- Validate email addresses

## Step 10: Deployment

### 10.1 Deploy Functions

```bash
firebase deploy --only functions
```

### 10.2 Test in Production

1. Create a test referrer account
2. Trigger a commission notification
3. Verify email delivery
4. Check email tracking

## Troubleshooting

### Common Issues

1. **Emails not sending**: Check SendGrid API key and sender verification
2. **High bounce rate**: Verify sender domain and clean email list
3. **Function timeouts**: Increase timeout settings or optimize code
4. **Rate limiting**: Implement delays between email sends

### Debug Commands

```bash
# Check function logs
firebase functions:log

# Test function locally
firebase emulators:start --only functions

# Check SendGrid delivery
curl -X GET "https://api.sendgrid.com/v3/mail/settings" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

## Next Steps

1. Set up email templates for all notification types
2. Implement email preferences for users
3. Add unsubscribe functionality
4. Create email analytics dashboard
5. Set up automated email campaigns
