-- CreateTable
CREATE TABLE "ip_tracking" (
    "id" SERIAL NOT NULL,
    "ipAddress" TEXT NOT NULL,
    "subnet" TEXT NOT NULL,
    "referralCount" INTEGER NOT NULL DEFAULT 0,
    "lastReferralAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ip_tracking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "device_fingerprints" (
    "id" SERIAL NOT NULL,
    "fingerprint" TEXT NOT NULL,
    "userId" INTEGER,
    "referralCount" INTEGER NOT NULL DEFAULT 0,
    "lastReferralAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "device_fingerprints_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "referral_attempts" (
    "id" SERIAL NOT NULL,
    "ipAddress" TEXT NOT NULL,
    "subnet" TEXT NOT NULL,
    "fingerprint" TEXT,
    "email" TEXT NOT NULL,
    "referralCode" TEXT,
    "status" TEXT NOT NULL DEFAULT 'attempted',
    "reason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "referral_attempts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ip_tracking_subnet_key" ON "ip_tracking"("subnet");

-- CreateIndex
CREATE UNIQUE INDEX "device_fingerprints_fingerprint_key" ON "device_fingerprints"("fingerprint");

-- AddForeignKey
ALTER TABLE "device_fingerprints" ADD CONSTRAINT "device_fingerprints_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
