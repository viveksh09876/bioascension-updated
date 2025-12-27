# Security Features Implementation

## Overview
This document describes the implementation of advanced security features to prevent referral abuse and ensure fair usage of the Heightmax referral system.

## 🚫 Self-Referral Prevention

### Features
- **User ID Validation**: Prevents users from referring themselves by checking if `userId` equals `referralID`
- **Referral Code Ownership**: Prevents users from using their own referral codes
- **Multi-Layer Protection**: Frontend validation + backend validation + security checks
- **Clear Error Messages**: User-friendly error messages explaining the restriction

### Implementation
- **OTP Pre-Check**: Self-referral validation before sending OTP
- **Frontend Validation**: `validateSelfReferral()` function checks before API calls
- **Backend Validation**: `/api/referral/save` endpoint validates before saving
- **Security Check**: `/api/referral/check-security` endpoint validates during security checks
- **Database Level**: Additional checks in referral code lookup

### Code Location
- Frontend: `pages/unlock-report.tsx` - `validateSelfReferral()` function
- Backend: `pages/api/referral/save.ts` - Self-referral checks
- Security: `pages/api/referral/check-security.ts` - Security validation

### Error Messages
- "You cannot refer yourself. Please use a different referral code."
- "You cannot use your own referral code. Please use a different referral code."

## 🌍 IP Check - Rate Limiting + Subnet Grouping

### Features
- **IP Address Tracking**: Captures client IP addresses for rate limiting
- **Subnet Grouping**: Groups IPs by subnet (first 3 octets for IPv4) to prevent abuse from similar IP ranges
- **Rate Limiting**: Maximum 5 referrals per subnet per day
- **Automatic Cleanup**: Old tracking data is automatically managed

### Implementation
- **Database Table**: `ip_tracking` stores subnet information and referral counts
- **API Endpoint**: `/api/referral/check-security` performs IP-based checks
- **Rate Limits**: 5 referrals per subnet per 24-hour period

### Code Location
- Schema: `prisma/schema.prisma` - `IpTracking` model
- API: `pages/api/referral/check-security.ts`
- Frontend: Integrated into referral submission flow

## 🧪 Fingerprinting - FingerprintJS + Device ID

### Features
- **Device Fingerprinting**: Uses FingerprintJS to generate unique device identifiers
- **Self-Referral Prevention**: Prevents users from referring themselves using the same device
- **Device Rate Limiting**: Maximum 3 referrals per device per day
- **Cross-Device Detection**: Tracks device fingerprints across sessions

### Implementation
- **Library**: `@fingerprintjs/fingerprintjs` for device identification
- **React Context**: `components/FingerprintProvider.tsx` provides fingerprinting across the app
- **Database Table**: `device_fingerprints` stores device IDs and usage patterns
- **Security Checks**: Integrated into referral submission process

### Code Location
- Component: `components/FingerprintProvider.tsx`
- Schema: `prisma/schema.prisma` - `DeviceFingerprint` model
- Integration: `pages/_app.tsx` wraps the entire app
- Usage: `pages/unlock-report.tsx` includes fingerprint in referral submissions

## 🔒 Referral Attempt Tracking

### Features
- **Comprehensive Logging**: All referral attempts are logged with detailed information
- **Status Tracking**: Attempts are marked as 'attempted', 'blocked', or 'allowed'
- **Reason Codes**: Specific reasons for blocking (rate limit, self-referral, etc.)
- **Audit Trail**: Complete history of all referral activities

### Database Schema
```sql
-- IP Tracking
CREATE TABLE ip_tracking (
  id SERIAL PRIMARY KEY,
  ipAddress TEXT NOT NULL,
  subnet TEXT UNIQUE NOT NULL,
  referralCount INTEGER DEFAULT 0,
  lastReferralAt TIMESTAMP,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Device Fingerprints
CREATE TABLE device_fingerprints (
  id SERIAL PRIMARY KEY,
  fingerprint TEXT UNIQUE NOT NULL,
  userId INTEGER REFERENCES users(id),
  referralCount INTEGER DEFAULT 0,
  lastReferralAt TIMESTAMP,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Referral Attempts Log
CREATE TABLE referral_attempts (
  id SERIAL PRIMARY KEY,
  ipAddress TEXT NOT NULL,
  subnet TEXT NOT NULL,
  fingerprint TEXT,
  email TEXT NOT NULL,
  referralCode TEXT,
  status TEXT DEFAULT 'attempted',
  reason TEXT,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🚀 API Endpoints

### `/api/referral/check-security`
**Purpose**: Performs comprehensive security checks before allowing referrals

**Request Body**:
```json
{
  "email": "user@example.com",
  "fingerprint": "device_fingerprint_id",
  "referralCode": "optional_referral_code"
}
```

**Response**:
- `200`: Security checks passed
- `400`: Self-referral detected
- `429`: Rate limit exceeded (IP or device)

### `/api/referral/save` (Enhanced)
**Purpose**: Saves referral codes with security validation

**New Features**:
- Calls security check API before saving
- Includes fingerprint in request
- Returns detailed error messages for blocked attempts

## 🛡️ Security Measures

### Rate Limiting
- **IP-based**: 5 referrals per subnet per day
- **Device-based**: 3 referrals per device per day
- **Automatic reset**: Limits reset after 24 hours

### Self-Referral Prevention
- **Device tracking**: Prevents same device from using own referral code
- **Cross-session detection**: Fingerprint persists across browser sessions
- **User association**: Links fingerprints to user accounts when available

### Abuse Prevention
- **Subnet grouping**: Prevents abuse from similar IP ranges
- **Comprehensive logging**: All attempts tracked for analysis
- **Real-time blocking**: Immediate response to suspicious activity

## 🧪 Testing

### Test Page
Visit `/test-fingerprint` to verify fingerprinting functionality:
- Shows device fingerprint ID
- Displays loading and error states
- Lists implemented features

### Manual Testing
1. **Rate Limiting**: Try multiple referrals from same IP/device
2. **Self-Referral**: Use own referral code from same device
3. **Cross-Device**: Test with different devices/browsers
4. **Error Handling**: Verify appropriate error messages

## 📊 Monitoring

### Database Queries
```sql
-- Check IP rate limiting
SELECT * FROM ip_tracking WHERE subnet = '192.168.1.0';

-- Check device rate limiting  
SELECT * FROM device_fingerprints WHERE fingerprint = 'device_id';

-- View blocked attempts
SELECT * FROM referral_attempts WHERE status = 'blocked';

-- Recent activity
SELECT * FROM referral_attempts ORDER BY createdAt DESC LIMIT 10;
```

### Log Analysis
- Monitor `/api/referral/check-security` for blocked attempts
- Track rate limit violations
- Analyze patterns in referral abuse

## 🔧 Configuration

### Environment Variables
No additional environment variables required - uses existing database connection.

### Dependencies
```json
{
  "@fingerprintjs/fingerprintjs": "latest"
}
```

### Database Migration
The required tables are created via Prisma migration:
```bash
npx prisma migrate dev --name add_ip_fingerprint_tracking
```

## 🎯 Benefits

1. **Prevents Abuse**: Stops users from gaming the referral system
2. **Fair Usage**: Ensures legitimate referrals are prioritized
3. **Scalable**: Handles high traffic with efficient database queries
4. **Transparent**: Clear error messages for blocked attempts
5. **Auditable**: Complete logging for compliance and analysis

## 🚨 Error Messages

### User-Facing Messages
- **Self-referral**: "This device has already used a referral code. Please use a different device or contact support."
- **IP rate limit**: "Too many referral attempts from this IP. Please try again later."
- **Device rate limit**: "Too many referral attempts from this device. Please try again later."

### Technical Reasons
- `Self-referral detected`
- `IP rate limit exceeded`
- `Device rate limit exceeded`
- `Security checks passed`

This implementation provides robust protection against referral abuse while maintaining a smooth user experience for legitimate users. 