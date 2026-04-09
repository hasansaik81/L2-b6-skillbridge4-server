-- AlterTable
ALTER TABLE "tutorProfile" ADD COLUMN     "avgRating" DECIMAL(2,1) NOT NULL DEFAULT 0,
ADD COLUMN     "totalReviews" INTEGER NOT NULL DEFAULT 0;
