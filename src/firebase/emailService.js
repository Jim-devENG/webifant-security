import { db } from './config';
import { collection, addDoc, getDocs, query, where, orderBy, updateDoc, doc } from 'firebase/firestore';
import { serverTimestamp } from 'firebase/firestore';

// Email service for sending notifications to users
export const emailService = {
    // Send notification email
    async sendNotificationEmail( userEmail, subject, message, type = 'general' ) {
        try {
            // Create notification record
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

            const docRef = await addDoc( collection( db, 'emailNotifications' ), notification );

            // In a real implementation, this would trigger a Firebase Function
            // For now, we'll just store the notification
            console.log( 'Email notification queued:', { id: docRef.id, userEmail, subject } );

            return { success: true, notificationId: docRef.id };
        } catch ( error ) {
            console.error( 'Error sending notification email:', error );
            throw new Error( 'Failed to send notification email' );
        }
    },

    // Send referrer commission notification
    async sendCommissionNotification( referrerEmail, referrerName, amount, serviceType ) {
        const subject = '🎉 New Commission Earned!';
        const message = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="margin: 0; font-size: 28px;">💰 Commission Earned!</h1>
          <p style="margin: 10px 0 0 0; font-size: 16px;">Congratulations on your new referral!</p>
        </div>
        
        <div style="background: white; padding: 30px; border: 1px solid #e1e5e9; border-radius: 0 0 10px 10px;">
          <h2 style="color: #333; margin-top: 0;">Hello ${referrerName},</h2>
          
          <p style="color: #666; line-height: 1.6;">
            Great news! You've earned a commission from a successful referral.
          </p>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center;">
            <h3 style="color: #28a745; margin: 0 0 10px 0; font-size: 24px;">$${amount.toFixed( 2 )}</h3>
            <p style="color: #666; margin: 0;">Commission from ${serviceType} service</p>
          </div>
          
          <p style="color: #666; line-height: 1.6;">
            Your commission has been added to your pending balance. You can request a payout once you reach the minimum threshold of $50.
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="https://webinfant-react-aw4nzyk2g-jimdevengs-projects.vercel.app/referrer-dashboard" 
               style="background: #007bff; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
              View Dashboard
            </a>
          </div>
          
          <p style="color: #666; line-height: 1.6; font-size: 14px;">
            Keep up the great work! The more referrals you bring, the more you earn.
          </p>
        </div>
        
        <div style="text-align: center; padding: 20px; color: #999; font-size: 12px;">
          <p>© 2024 WebInfant. All rights reserved.</p>
        </div>
      </div>
    `;

        return this.sendNotificationEmail( referrerEmail, subject, message, 'commission' );
    },

    // Send payout notification
    async sendPayoutNotification( referrerEmail, referrerName, amount, status ) {
        const subject = status === 'paid' ? '✅ Payout Successful!' : '⏳ Payout Processing';
        const message = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #28a745 0%, #20c997 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="margin: 0; font-size: 28px;">${status === 'paid' ? '💰 Payout Successful!' : '⏳ Payout Processing'}</h1>
          <p style="margin: 10px 0 0 0; font-size: 16px;">Your earnings are on the way!</p>
        </div>
        
        <div style="background: white; padding: 30px; border: 1px solid #e1e5e9; border-radius: 0 0 10px 10px;">
          <h2 style="color: #333; margin-top: 0;">Hello ${referrerName},</h2>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center;">
            <h3 style="color: #28a745; margin: 0 0 10px 0; font-size: 24px;">$${amount.toFixed( 2 )}</h3>
            <p style="color: #666; margin: 0;">${status === 'paid' ? 'Successfully paid to your account' : 'Processing payout'}</p>
          </div>
          
          <p style="color: #666; line-height: 1.6;">
            ${status === 'paid'
                ? 'Your payout has been successfully processed and should appear in your account within 1-3 business days.'
                : 'Your payout request has been received and is being processed. You will receive another notification once the payment is completed.'
            }
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="https://webinfant-react-aw4nzyk2g-jimdevengs-projects.vercel.app/referrer-dashboard" 
               style="background: #007bff; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
              View Dashboard
            </a>
          </div>
        </div>
        
        <div style="text-align: center; padding: 20px; color: #999; font-size: 12px;">
          <p>© 2024 WebInfant. All rights reserved.</p>
        </div>
      </div>
    `;

        return this.sendNotificationEmail( referrerEmail, subject, message, 'payout' );
    },

    // Send welcome notification
    async sendWelcomeNotification( userEmail, userName, userType ) {
        const subject = userType === 'referrer' ? '🎉 Welcome to WebInfant Referrer Program!' : '🎉 Welcome to WebInfant!';
        const message = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="margin: 0; font-size: 28px;">Welcome to WebInfant!</h1>
          <p style="margin: 10px 0 0 0; font-size: 16px;">Your cybersecurity journey starts here</p>
        </div>
        
        <div style="background: white; padding: 30px; border: 1px solid #e1e5e9; border-radius: 0 0 10px 10px;">
          <h2 style="color: #333; margin-top: 0;">Hello ${userName},</h2>
          
          <p style="color: #666; line-height: 1.6;">
            Welcome to WebInfant! We're excited to have you on board.
          </p>
          
          ${userType === 'referrer' ? `
            <div style="background: #e3f2fd; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #1976d2; margin-top: 0;">🚀 Start Earning Commissions</h3>
              <p style="color: #666; line-height: 1.6;">
                As a referrer, you can earn commissions by referring clients to our cybersecurity services. 
                Share your unique referral link and start earning today!
              </p>
              <ul style="color: #666; line-height: 1.6;">
                <li>Cybersecurity Consulting: 15% commission</li>
                <li>Security Assessment: 12% commission</li>
                <li>Digital Forensics: 10% commission</li>
                <li>Security Training: 8% commission</li>
                <li>Compliance Services: 12% commission</li>
              </ul>
            </div>
          ` : `
            <div style="background: #e8f5e8; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #2e7d32; margin-top: 0;">🛡️ Protect Your Business</h3>
              <p style="color: #666; line-height: 1.6;">
                We're here to help you secure your digital assets with our comprehensive cybersecurity services.
              </p>
            </div>
          `}
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="https://webinfant-react-aw4nzyk2g-jimdevengs-projects.vercel.app/${userType === 'referrer' ? 'referrer-dashboard' : 'client-dashboard'}" 
               style="background: #007bff; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
              Go to Dashboard
            </a>
          </div>
          
          <p style="color: #666; line-height: 1.6;">
            If you have any questions, feel free to reach out to our support team.
          </p>
        </div>
        
        <div style="text-align: center; padding: 20px; color: #999; font-size: 12px;">
          <p>© 2024 WebInfant. All rights reserved.</p>
        </div>
      </div>
    `;

        return this.sendNotificationEmail( userEmail, subject, message, 'welcome' );
    },

    // Send service completion notification
    async sendServiceCompletionNotification( clientEmail, clientName, serviceType, referrerName = null ) {
        const subject = '✅ Service Completed Successfully';
        const message = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #28a745 0%, #20c997 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="margin: 0; font-size: 28px;">Service Completed!</h1>
          <p style="margin: 10px 0 0 0; font-size: 16px;">Your cybersecurity service has been delivered</p>
        </div>
        
        <div style="background: white; padding: 30px; border: 1px solid #e1e5e9; border-radius: 0 0 10px 10px;">
          <h2 style="color: #333; margin-top: 0;">Hello ${clientName},</h2>
          
          <p style="color: #666; line-height: 1.6;">
            Great news! Your ${serviceType} service has been completed successfully.
          </p>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Service Details</h3>
            <p style="color: #666; margin: 5px 0;"><strong>Service Type:</strong> ${serviceType}</p>
            <p style="color: #666; margin: 5px 0;"><strong>Status:</strong> Completed</p>
            ${referrerName ? `<p style="color: #666; margin: 5px 0;"><strong>Referred by:</strong> ${referrerName}</p>` : ''}
          </div>
          
          <p style="color: #666; line-height: 1.6;">
            You can view the complete service details and any deliverables in your dashboard.
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="https://webinfant-react-aw4nzyk2g-jimdevengs-projects.vercel.app/client-dashboard" 
               style="background: #007bff; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
              View Dashboard
            </a>
          </div>
        </div>
        
        <div style="text-align: center; padding: 20px; color: #999; font-size: 12px;">
          <p>© 2024 WebInfant. All rights reserved.</p>
        </div>
      </div>
    `;

        return this.sendNotificationEmail( clientEmail, subject, message, 'service_completion' );
    },

    // Get notification history
    async getNotificationHistory( userEmail, limit = 50 ) {
        try {
            const q = query(
                collection( db, 'emailNotifications' ),
                where( 'userEmail', '==', userEmail ),
                orderBy( 'createdAt', 'desc' ),
                limit( limit )
            );

            const snapshot = await getDocs( q );
            return snapshot.docs.map( doc => ( {
                id: doc.id,
                ...doc.data()
            } ) );
        } catch ( error ) {
            console.error( 'Error fetching notification history:', error );
            throw new Error( 'Failed to fetch notification history' );
        }
    },

    // Mark notification as read
    async markNotificationAsRead( notificationId ) {
        try {
            const notificationRef = doc( db, 'emailNotifications', notificationId );
            await updateDoc( notificationRef, {
                readAt: serverTimestamp()
            } );
            return { success: true };
        } catch ( error ) {
            console.error( 'Error marking notification as read:', error );
            throw new Error( 'Failed to mark notification as read' );
        }
    }
};

// Notification templates for different events
export const notificationTemplates = {
    commission: {
        subject: '🎉 New Commission Earned!',
        template: ( data ) => `You've earned $${data.amount} from a ${data.serviceType} referral!`
    },
    payout: {
        subject: '💰 Payout Update',
        template: ( data ) => `Your payout of $${data.amount} is ${data.status}.`
    },
    welcome: {
        subject: '🎉 Welcome to WebInfant!',
        template: ( data ) => `Welcome ${data.name}! Your account is ready.`
    },
    service_completion: {
        subject: '✅ Service Completed',
        template: ( data ) => `Your ${data.serviceType} service has been completed.`
    }
}; 