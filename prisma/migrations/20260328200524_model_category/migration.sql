-- CreateTable
CREATE TABLE "category" (
    "id" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "tutorId" TEXT NOT NULL,

    CONSTRAINT "category_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "category" ADD CONSTRAINT "category_tutorId_fkey" FOREIGN KEY ("tutorId") REFERENCES "tutorProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
