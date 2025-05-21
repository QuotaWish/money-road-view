-- CreateTable
CREATE TABLE "LoginHistory" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "platform" TEXT NOT NULL,
    "device" TEXT,
    "fingerprint" TEXT,
    "userAgent" TEXT,
    "ip" VARCHAR(45) NOT NULL,
    "success" BOOLEAN NOT NULL,
    "errorMsg" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LoginHistory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "LoginHistory_userId_createdAt_idx" ON "LoginHistory"("userId", "createdAt" DESC);

-- CreateIndex
CREATE INDEX "LoginHistory_userId_device_idx" ON "LoginHistory"("userId", "device");

-- CreateIndex
CREATE INDEX "LoginHistory_userId_fingerprint_idx" ON "LoginHistory"("userId", "fingerprint");

-- AddForeignKey
ALTER TABLE "LoginHistory" ADD CONSTRAINT "LoginHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
