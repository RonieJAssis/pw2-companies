-- CreateTable
CREATE TABLE "Companies" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "employees" INTEGER NOT NULL,

    CONSTRAINT "Companies_pkey" PRIMARY KEY ("id")
);
