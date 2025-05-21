-- CreateTable
CREATE TABLE "Configuration" (
    "id" TEXT NOT NULL,
    "namespace" TEXT,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "valueType" TEXT NOT NULL,
    "description" TEXT,
    "isPublic" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Configuration_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Configuration_namespace_idx" ON "Configuration"("namespace");

-- CreateIndex
CREATE UNIQUE INDEX "Configuration_namespace_key_key" ON "Configuration"("namespace", "key");
