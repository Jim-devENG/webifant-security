# Stripe Integration Guide for Referrer Payments

## Overview

This guide explains how to integrate Stripe payments for the referrer reward system in WebInfant.

## Prerequisites

1. Stripe account (https://stripe.com)
2. Firebase project with Functions enabled
3. Node.js and npm installed

## Step 1: Install Dependencies

```bash
# Install Stripe SDK
npm install stripe @stripe/stripe-js

# Install Firebase Functions (if not already installed)
npm install -g firebase-tools
```

## Step 2: Set Up Stripe Account

1. **Create Stripe Account**

   - Go to https://stripe.com and create an account
   - Complete account verification
   - Get your API keys from the dashboard

2. **Configure Webhook Endpoints**
   - In Stripe Dashboard, go to Developers > Webhooks
   - Add endpoint: `https://your-firebase-function-url.com/stripe-webhook`
   - Select events: `payout.paid`, `payout.failed`, `account.updated`

## Step 3: Firebase Functions Setup

### Create Firebase Functions

```bash
firebase init functions
cd functions
npm install stripe
```

### Create the Stripe Functions

```javascript
// functions/index.js
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const stripe = require("stripe")(functions.config().stripe.secret_key);

admin.initializeApp();

// Create Stripe Connect account for referrer
exports.createStripeAccount = functions.https.onCall(async (data, context) => {
  try {
    const {referrerId, email, country} = data;

    const account = await stripe.accounts.create({
      type: "express",
      country: country || "US",
      email: email,
      capabilities: {
        transfers: {requested: true},
      },
    });

    // Update referrer with Stripe account ID
    await admin
      .firestore()
      .collection("referrers")
      .doc(referrerId)
      .update({
        stripeAccountId: account.id,
        stripeAccountStatus: account.charges_enabled ? "active" : "pending",
      });

    return {accountId: account.id, accountLink: account.id};
  } catch (error) {
    throw new functions.https.HttpsError("internal", error.message);
  }
});

// Process payout to referrer
exports.processPayout = functions.https.onCall(async (data, context) => {
  try {
    const {referrerId, amount, payoutId} = data;

    // Get referrer's Stripe account
    const referrerDoc = await admin
      .firestore()
      .collection("referrers")
      .doc(referrerId)
      .get();

    const referrer = referrerDoc.data();

    if (!referrer.stripeAccountId) {
      throw new Error("Referrer does not have a Stripe account");
    }

    // Create payout
    const payout = await stripe.payouts.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: "usd",
      destination: referrer.stripeAccountId,
      metadata: {
        referrerId: referrerId,
        payoutId: payoutId,
      },
    });

    // Update payout record
    await admin.firestore().collection("payouts").doc(payoutId).update({
      stripePayoutId: payout.id,
      status: "processing",
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    return {payoutId: payout.id};
  } catch (error) {
    throw new functions.https.HttpsError("internal", error.message);
  }
});

// Stripe webhook handler
exports.stripeWebhook = functions.https.onRequest(async (req, res) => {
  const sig = req.headers["stripe-signature"];
  const endpointSecret = functions.config().stripe.webhook_secret;

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.rawBody, sig, endpointSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case "payout.paid":
      await handlePayoutPaid(event.data.object);
      break;
    case "payout.failed":
      await handlePayoutFailed(event.data.object);
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({received: true});
});

async function handlePayoutPaid(payout) {
  const payoutId = payout.metadata.payoutId;

  await admin.firestore().collection("payouts").doc(payoutId).update({
    status: "paid",
    paidAt: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  });
}

async function handlePayoutFailed(payout) {
  const payoutId = payout.metadata.payoutId;

  await admin.firestore().collection("payouts").doc(payoutId).update({
    status: "failed",
    failedAt: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    failureReason: payout.failure_reason,
  });
}
```

## Step 4: Environment Configuration

### Set Firebase Config

```bash
firebase functions:config:set stripe.secret_key="sk_test_your_stripe_secret_key"
firebase functions:config:set stripe.webhook_secret="whsec_your_webhook_secret"
```

### Deploy Functions

```bash
firebase deploy --only functions
```

## Step 5: Update Frontend

### Update Payment Service

```javascript
// src/firebase/paymentService.js

// Add Stripe integration
import { getFunctions, httpsCallable } from 'firebase/functions';

const functions = getFunctions();
const createStripeAccount = httpsCallable(functions, 'createStripeAccount');
const processPayout = httpsCallable(functions, 'processPayout');

// Add to paymentService object
async createStripeAccount(referrerId, email, country = 'US') {
  try {
    const result = await createStripeAccount({ referrerId, email, country });
    return result.data;
  } catch (error) {
    console.error('Error creating Stripe account:', error);
    throw new Error('Failed to create Stripe account');
  }
},

async processPayoutWithStripe(referrerId, amount, payoutId) {
  try {
    const result = await processPayout({ referrerId, amount, payoutId });
    return result.data;
  } catch (error) {
    console.error('Error processing payout:', error);
    throw new Error('Failed to process payout');
  }
}
```

## Step 6: Commission Calculation

### Service Pricing Structure

```javascript
// Commission rates based on service type
const servicePricing = {
  consulting: {
    basePrice: 500,
    commission: 0.15, // 15%
  },
  assessment: {
    basePrice: 300,
    commission: 0.12, // 12%
  },
  forensics: {
    basePrice: 800,
    commission: 0.1, // 10%
  },
  training: {
    basePrice: 200,
    commission: 0.08, // 8%
  },
  compliance: {
    basePrice: 400,
    commission: 0.12, // 12%
  },
};

// Calculate commission
function calculateCommission(serviceType, serviceAmount) {
  const pricing = servicePricing[serviceType] || servicePricing.consulting;
  return serviceAmount * pricing.commission;
}
```

## Step 7: Payment Flow

### Complete Payment Process

1. **Client Signs Up for Service**

   - Client registers through referrer link
   - Referral record created
   - Commission calculated

2. **Service Payment**

   - Client pays for service
   - Commission marked as "pending"

3. **Commission Release**

   - Service completed
   - Commission status changed to "approved"

4. **Payout Request**

   - Referrer requests payout
   - System checks minimum threshold ($50)
   - Stripe payout created

5. **Payment Processing**
   - Stripe processes payout
   - Webhook updates status
   - Referrer receives payment

## Step 8: Testing

### Test Mode Setup

```javascript
// Use Stripe test keys for development
const stripe = require("stripe")("sk_test_your_test_key");

// Test card numbers
const testCards = {
  visa: "4242424242424242",
  mastercard: "5555555555554444",
  amex: "378282246310005",
};
```

### Test Scenarios

1. **Referrer Registration**

   - Create referrer account
   - Verify Stripe Connect account creation

2. **Commission Calculation**

   - Test different service types
   - Verify commission rates

3. **Payout Process**
   - Request payout
   - Verify Stripe payout creation
   - Test webhook handling

## Step 9: Production Deployment

### Security Considerations

1. **API Key Security**

   - Use environment variables
   - Never expose keys in client code
   - Use Firebase Functions for server-side operations

2. **Webhook Security**

   - Verify webhook signatures
   - Use HTTPS endpoints
   - Implement idempotency

3. **Data Validation**
   - Validate all input data
   - Sanitize user inputs
   - Implement rate limiting

### Monitoring

1. **Stripe Dashboard**

   - Monitor payout success rates
   - Track failed payments
   - Review webhook events

2. **Firebase Analytics**
   - Track payment events
   - Monitor function performance
   - Set up alerts for failures

## Support

For issues with:

- **Stripe Integration**: Check Stripe documentation and support
- **Firebase Functions**: Review Firebase console logs
- **Webhook Issues**: Verify endpoint configuration and signatures

## Next Steps

1. Implement automatic commission calculation
2. Add payment dispute handling
3. Create admin payment management interface
4. Add payment analytics and reporting
5. Implement recurring commission tracking
