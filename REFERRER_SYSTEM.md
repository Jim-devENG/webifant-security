# Referrer System Documentation

## Overview

The referrer system is a comprehensive referral management solution integrated into the WebInfant cybersecurity platform. It allows businesses to create a network of referrers who can earn rewards for bringing new clients to the platform.

## Features

### Core Functionality

- **Referrer Registration**: Easy sign-up process for potential referrers
- **Unique Referrer Codes**: Each referrer gets a unique 8-character code
- **Referral Tracking**: Automatic tracking of referrals through URL parameters
- **Reward System**: Configurable rewards based on service type and success
- **Analytics Dashboard**: Comprehensive analytics for referrers and admins
- **Status Management**: Track referral status (pending, successful, failed, cancelled)

### Technical Features

- **Firebase Integration**: Full Firebase Firestore backend
- **Real-time Updates**: Live data synchronization
- **URL Parameter Tracking**: Automatic referrer detection via URL parameters
- **Local Storage Persistence**: Referrer information persists across sessions
- **Admin Management**: Complete admin interface for managing referrers

## System Architecture

### Database Collections

#### `referrers`

Stores referrer information and statistics:

```javascript
{
  id: "auto-generated",
  name: "John Doe",
  email: "john@example.com",
  phone: "+1234567890",
  company: "Tech Corp",
  referrerCode: "ABC123XY",
  totalReferrals: 0,
  successfulReferrals: 0,
  totalEarnings: 0,
  status: "active", // active, inactive, suspended
  notes: "Additional information",
  createdAt: timestamp,
  updatedAt: timestamp
}
```

#### `referrals`

Tracks individual referrals:

```javascript
{
  id: "auto-generated",
  referrerId: "referrer-id",
  referrerName: "John Doe",
  referredName: "Jane Smith",
  referredEmail: "jane@example.com",
  serviceType: "consulting", // consulting, assessment, forensics, training, compliance
  company: "Client Corp",
  industry: "Technology",
  status: "pending", // pending, successful, failed, cancelled
  reward: 75, // calculated reward amount
  createdAt: timestamp,
  updatedAt: timestamp
}
```

#### `referrer-rewards`

Manages reward payments:

```javascript
{
  id: "auto-generated",
  referrerId: "referrer-id",
  referralId: "referral-id",
  amount: 75,
  status: "pending", // pending, paid, cancelled
  createdAt: timestamp,
  updatedAt: timestamp
}
```

## Usage Guide

### For Referrers

#### 1. Registration

1. Visit `/referrer-registration`
2. Fill out the registration form
3. Receive your unique referrer code
4. Start sharing your referral links

#### 2. Creating Referral Links

Your referral links should include your referrer code as a URL parameter:

```
https://yourdomain.com/client-registration?ref=YOUR_CODE
```

#### 3. Dashboard Access

- Visit `/referrer-dashboard?id=YOUR_REFERRER_ID`
- View your statistics and earnings
- Track your referrals
- Access analytics

### For Clients

#### 1. Referral Detection

When a client visits the site with a referrer code:

1. The system automatically detects the referrer code
2. Validates the referrer exists and is active
3. Stores the referrer information in localStorage
4. Displays referrer information during registration

#### 2. Registration Process

1. Client fills out registration form
2. System automatically creates a referral record
3. Referrer statistics are updated
4. Client proceeds with normal registration

### For Admins

#### 1. Access Management

- Visit `/referrer-management` (admin access required)
- View all referrers and their statistics
- Manage referrer status (active, inactive, suspended)
- View system-wide analytics

#### 2. Referral Management

- Update referral statuses
- Monitor conversion rates
- Track reward payments
- Generate reports

## Reward System

### Reward Calculation

Rewards are calculated based on service type with multipliers:

```javascript
const baseReward = 50; // $50 base reward
const serviceTypeMultiplier = {
  consulting: 1.5, // $75
  assessment: 1.2, // $60
  forensics: 2.0, // $100
  training: 1.0, // $50
  compliance: 1.8, // $90
};
```

### Payment Process

1. Referral is marked as "successful"
2. Reward is automatically calculated
3. Reward record is created with "pending" status
4. Admin can update status to "paid" when payment is made

## API Reference

### Referrer Service Functions

#### `createReferrer(referrerData)`

Creates a new referrer account.

```javascript
const result = await createReferrer({
  name: "John Doe",
  email: "john@example.com",
  phone: "+1234567890",
  company: "Tech Corp",
  notes: "Additional information",
});
```

#### `getReferrerByCode(referrerCode)`

Retrieves referrer information by code.

```javascript
const referrer = await getReferrerByCode("ABC123XY");
```

#### `createReferral(referralData)`

Creates a new referral record.

```javascript
const referral = await createReferral({
  referrerId: "referrer-id",
  referrerName: "John Doe",
  referredName: "Jane Smith",
  referredEmail: "jane@example.com",
  serviceType: "consulting",
  company: "Client Corp",
  industry: "Technology",
});
```

#### `updateReferralStatus(referralId, status, additionalData)`

Updates referral status and triggers reward calculation.

```javascript
await updateReferralStatus("referral-id", "successful", {
  notes: "Client signed contract",
});
```

### Components

#### `ReferrerTracker`

Main tracking component that wraps the application:

```javascript
<ReferrerTracker
  onReferrerDetected={(referrer) => {
    console.log("Referrer detected:", referrer);
  }}
>
  <App />
</ReferrerTracker>
```

#### `useReferrer()`

Hook for accessing referrer data:

```javascript
const {referrer, clearReferrer} = useReferrer();
```

#### `ReferrerInfo`

Component for displaying referrer information:

```javascript
<ReferrerInfo className="custom-styles" />
```

## Configuration

### Environment Variables

No additional environment variables are required. The system uses the existing Firebase configuration.

### Customization

You can customize the reward system by modifying the `calculateReferralReward` function in `referrerService.js`:

```javascript
const calculateReferralReward = (referralData) => {
  const baseReward = 50; // Adjust base reward
  const serviceTypeMultiplier = {
    consulting: 1.5,
    assessment: 1.2,
    forensics: 2.0,
    training: 1.0,
    compliance: 1.8,
    // Add more service types as needed
  };

  const multiplier = serviceTypeMultiplier[referralData.serviceType] || 1.0;
  return Math.round(baseReward * multiplier);
};
```

## Security Considerations

### Data Protection

- Referrer codes are validated against the database
- Only active referrers can generate referrals
- Referral data is stored securely in Firebase
- Admin access is protected by authentication

### Fraud Prevention

- Unique referrer codes prevent code sharing
- Referral validation ensures data integrity
- Status tracking prevents duplicate rewards
- Admin oversight for all referral activities

## Troubleshooting

### Common Issues

#### Referrer Code Not Working

1. Check if the referrer exists in the database
2. Verify the referrer status is "active"
3. Ensure the URL parameter is correct (`?ref=CODE`)

#### Referral Not Created

1. Check browser console for errors
2. Verify Firebase connection
3. Ensure all required fields are provided

#### Dashboard Not Loading

1. Check if referrer ID is provided
2. Verify Firebase permissions
3. Check network connectivity

### Debug Mode

Enable debug logging by adding to browser console:

```javascript
localStorage.setItem("referrer_debug", "true");
```

## Future Enhancements

### Planned Features

- Email notifications for referrers
- Advanced analytics and reporting
- Multi-tier referral system
- Integration with payment processors
- Mobile app support
- API endpoints for external integrations

### Performance Optimizations

- Caching for frequently accessed data
- Batch operations for bulk updates
- Real-time notifications
- Offline support

## Support

For technical support or questions about the referrer system:

1. Check this documentation
2. Review the Firebase console for errors
3. Contact the development team
4. Submit issues through the project repository

## License

This referrer system is part of the WebInfant platform and follows the same licensing terms.
