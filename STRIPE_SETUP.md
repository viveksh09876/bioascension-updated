# Stripe Payment Integration Setup

This guide will help you set up Stripe payments for the Heightmax application.

## Prerequisites

1. A Stripe account (sign up at https://stripe.com)
2. Node.js and npm installed
3. The project dependencies installed

## Setup Steps

### 1. Get Your Stripe API Keys

1. Log in to your Stripe Dashboard
2. Go to Developers → API Keys
3. Copy your **Publishable Key** and **Secret Key**
4. For webhook setup, you'll also need a webhook endpoint secret

### 2. Configure Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
```

### 3. Set Up Webhooks (Optional)

If you want to handle payment confirmations server-side, you can set up webhooks:

1. In your Stripe Dashboard, go to Developers → Webhooks
2. Click "Add endpoint"
3. Set the endpoint URL to: `https://yourdomain.com/api/stripe-webhook`
4. Select the following events:
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
5. Copy the webhook signing secret and add it to your environment variables as `STRIPE_WEBHOOK_SECRET`

### 4. Test the Integration

1. Start your development server: `npm run dev`
2. Navigate to the unlock-report page
3. Choose the paid option ($4.99)
4. Use Stripe's test card numbers:
   - **Success**: 4242 4242 4242 4242
   - **Decline**: 4000 0000 0000 0002
   - **Requires Authentication**: 4000 0025 0000 3155

### 5. Production Deployment

1. Switch to your live Stripe keys (replace `sk_test_` with `sk_live_`)
2. Update your webhook endpoint URL to your production domain
3. Ensure your environment variables are set in your hosting platform

## Features Implemented

- ✅ Secure payment processing with Stripe Elements
- ✅ Real-time payment validation
- ✅ Error handling for failed payments
- ✅ User data saving after successful payment
- ✅ Automatic redirect to analysis page
- ⚪ Webhook support (optional - for server-side payment confirmation)

## Security Notes

- Never expose your Stripe secret key in client-side code
- Always verify webhook signatures
- Use HTTPS in production
- Implement proper error handling
- Consider adding rate limiting for payment endpoints

## Troubleshooting

### Common Issues

1. **Payment fails**: Check your Stripe dashboard for error details
2. **Webhook not working**: Verify the webhook URL and secret
3. **Environment variables**: Ensure all keys are properly set
4. **CORS issues**: Check your domain configuration in Stripe

### Testing

Use Stripe's test mode for development:
- Test cards work without real charges
- Webhooks can be tested using Stripe CLI
- All functionality works the same as production

## Support

For Stripe-specific issues, refer to:
- [Stripe Documentation](https://stripe.com/docs)
- [Stripe Support](https://support.stripe.com)
- [Stripe API Reference](https://stripe.com/docs/api) 