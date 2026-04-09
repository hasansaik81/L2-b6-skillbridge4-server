// import { BookingStatus, Review } from "../../../generated/prisma/client";
// import { prisma } from "../../lib/prisma";





// const  createReview = async (data:Review,studentId:string) => {
//     const {bookingId,rating,review}= data;
//     if(!bookingId){
//         throw new Error("Booking ID is required");
//     }

//     if(!review || review.trim().length===0){
//         throw new Error("Review cannot be empty");
//     }

//     const numericRating = Number(rating);
//     if(isNaN(numericRating)){
//     throw new Error("Rating must be a number");
//     }

//     if(numericRating < 1 || numericRating > 5){
//         throw new Error("Rating must be between 1 and 5");
//     }

//     const roundedRating= Number(numericRating.toFixed(1));
//     return await prisma.$transaction(async (tx) => {
//         const booking = await tx.booking.findFirstOrThrow({
//             where: { id: bookingId },
//             select:{
//                 id:true,
//                 studentId:true,
//                 tutorId:true,
//                 status:true
//             },
//         });

//         if(booking.status !== BookingStatus.COMPLETED){
//             throw new Error("Booking must be completed to leave a review");
//         }

//         if(booking.studentId !== studentId){
//             throw new Error("Not authorized to review this booking");
//         }

//         const existingReview = await tx.review.findUnique({
//             where: { bookingId },
//         });

//         if(existingReview){
//             throw new Error("Review already exists for this booking");
//         }

//         const tutorReviews = await tx.review.findMany({
//             where: { tutorId: booking.tutorId },
//             select: { rating: true },
//         });
//         const totalOld= tutorReviews.reduce((acc, r) => acc + Number(r.rating), 0);
//         const newAverage = Number(((totalOld + roundedRating) / (tutorReviews.length + 1)).toFixed(1));
//         await tx.tutorProfiles.update({
//             where: { id: booking.tutorId },
//           data:{
//                 totalReviews:tutorReviews.length+1,
//                 avgRating:newAverage,
//             },
             
//         });
//         return await tx.review.create({
//             data:{
//                 bookingId: booking.id,
//                 studentId,
//                 tutorId: booking.tutorId,
//                 rating: roundedRating,
//                 review: review.trim(),
//             }
//         });
//     });

// };

// const updateReview = async (reviewId:string, data:Partial<Review>, studentId:string) => {
//     const { rating, review } = data;
//     if(!review || review.trim().length === 0){
//         throw new Error("Review cannot be empty");
//     }

//     const numericRating = Number(rating);
//     if(isNaN(numericRating)){
//         throw new Error("Rating must be a number");
//     }

//     if(numericRating < 1 || numericRating > 5){
//         throw new Error("Rating must be between 1 and 5");
//     }

//     const roundedRating = Number(numericRating.toFixed(1));

//     return await prisma.$transaction(async (tx) => {
//         const existingReview = await tx.review.findUnique({
//             where: { id: reviewId },
//             select: {
//                 id: true,
//                 studentId: true,
//                 tutorId: true,
//                 rating: true,
//             },
//         });

//         if(existingReview?.studentId !== studentId){
//             throw new Error("Not authorized to update this review");
//         }
        
//         const tutor = await tx.tutorProfiles.findFirstOrThrow({
//             where: { id: existingReview?.tutorId },
//             select: {
//                 totalReviews: true,
//                 avgRating: true
//             },
//         });

//         const totalOld = Number(tutor.avgRating) * tutor.totalReviews;
//         const newAverage = Number(((totalOld - Number(existingReview?.rating) + roundedRating) /
//          tutor.totalReviews).toFixed(1));

//         await tx.tutorProfiles.update({
//             where: { id: existingReview?.tutorId },
//             data: {
//                 avgRating: newAverage
//             }
//         });
//         return await tx.review.update({
//             where: { id: reviewId },
//             data: {
//                 rating: roundedRating,
//                 review: review.trim()
//             }
//         });

//     });
// };

// export const ReiviewService = {
//     createReview,
//     updateReview,

// }




// import prisma from "../../prisma";
// import { IReviewPayload } from "./review.types";

import { BookingStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";
import { IReviewPayload } from "./reiview.interface";

const createReview = async (
  studentId: string,
  payload: IReviewPayload
) => {
  return prisma.$transaction(async (tx) => {
    // 1️⃣ Find booking
    const booking = await tx.booking.findUnique({
      where: { id: payload.bookingId },
    });

    if (!booking) {
      throw new Error("Booking not found");
    }

    // 2️⃣ Ensure booking belongs to student
    if (booking.studentId !== studentId) {
      throw new Error("Unauthorized");
    }

    // 3️⃣ Ensure booking completed
    if (booking.status !== BookingStatus.COMPLETED) {
      throw new Error("Can only review completed sessions");
    }

    // 4️⃣ Check if already reviewed
    const existingReview = await tx.review.findUnique({
      where: { bookingId: payload.bookingId },
    });

    if (existingReview) {
      throw new Error("Review already submitted");
    }

    // 5️⃣ Create review
    const review = await tx.review.create({
      data: {
        rating: payload.rating,
         review: payload.review, 
        comment: payload.comment,
        studentId,
        tutorId: booking.tutorId, // IMPORTANT
        bookingId: booking.id,
      },
    });

    // 6️⃣ Recalculate tutor rating
    const reviews = await tx.review.findMany({
      where: { tutorId: booking.tutorId },
    });

    const totalReviews = reviews.length;
    const avgRating =
      reviews.reduce((sum, r) => sum + Number(r.rating), 0) /
      totalReviews;

    // 7️⃣ Update TutorProfile
    await tx.tutorProfiles.update({
      where: { id: booking.tutorId },
      data: {
        // rating: avgRating,
        // totalReviews,
        avgRating: Number(avgRating.toFixed(1)),
        totalReviews: totalReviews,
      },
    });

    return review;
  });
};

const getTutorReviews = async (tutorUserId: string) => {
  return prisma.review.findMany({
    where: { tutorId: tutorUserId },
    include: {
      student: {
        select: {
          name: true,
          avatar: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
};

export const ReviewService = {
  createReview,
  getTutorReviews,
};