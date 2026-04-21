

// import { Booking, Role } from "../../../generated/prisma/client";
// import { prisma } from "../../lib/prisma";


// const createBookingIntoDB = async (
//   payload: Omit<Booking,"id"|"createdAt"|"updatedAt">,
//   userId: string
// ) => {
//   return await prisma.$transaction(async (tx) => {

//     //  Check Student
//     const student = await tx.user.findUnique({
//       where: { id: userId },
//     });

//     if (!student) throw new Error("Student not found");

//     if (student.role !== Role.STUDENT) {
//       throw new Error("Only students can book tutors");
//     }

//     //  Check Tutor (IMPORTANT FIX)
//     const tutorProfile = await tx.tutorProfiles.findUnique({
//       where: { id: payload.tutorId }, // tutorId = userId
//       include: { user: true },
//     });

//     if (!tutorProfile) {
//       throw new Error("Tutor not found");
//     }

//     if (tutorProfile.user.role !== Role.TUTOR) {
//       throw new Error("Selected user is not a tutor");
//     }

//     //  Check Category
//     const category = await tx.category.findUnique({
//       where: { id: payload.categoryId },
//     });

//     if (!category) {
//       throw new Error("Category not found");

//     }


//       //  Check Subject (🔥 ADDED THIS)
//     const subject = await tx.subject.findUnique({
//       where: { id: payload.subjectId },
//     });

//     if (!subject) {
//       throw new Error("Subject not found");
//     }

//     //  Validate Time
//     const startTime = new Date(payload.startDate).getTime();
//     const endTime = new Date(payload.endDate).getTime();

//     if (endTime <= startTime) {
//       throw new Error("End date must be after start date");
//     }

//     //  Overlap check (FIXED)
//     const existingBooking = await tx.booking.findFirst({
//       where: {
//         tutorId: tutorProfile.user.id,
//         OR: [
//           {
//             startDate: {
//               lte: payload.endDate,
//             },
//             endDate: {
//               gte: payload.startDate,
//             },
//           },
//         ],
//       },
//     });

//     if (existingBooking) {
//       throw new Error("Tutor is already booked at this time");
//     }

//     //  Calculate Price
//     const durationInHour = (endTime - startTime) / (1000 * 60 * 60);
//     const totalPrice = durationInHour * category.price;

//     //  Create Booking
//     const booking = await tx.booking.create({
//       data: {
//         studentId: userId,
//         tutorId: tutorProfile.id,
//         categoryId: payload.categoryId,
//           subjectId: payload.subjectId, 
//         startDate: payload.startDate,
//         endDate: payload.endDate,
//         totalPrice,
//         status: "PENDING",
//         note: payload.note,

//         // ...payload,totalPrice
//       },
//     });

//     return booking;
//   });
// };

// export const BookingService = {
//   createBookingIntoDB,
// };





import { Booking, Role } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

type BookingPayload = Omit<
  Booking,
  "id" | "createdAt" | "updatedAt"
>;

const createBookingIntoDB = async (
  payload: BookingPayload,
  userId: string
) => {
  return await prisma.$transaction(async (tx) => {

    // =========================
    // 1. Check Student
    // =========================
    const student = await tx.user.findUnique({
      where: { id: userId },
    });

    if (!student) {
      throw new Error("Student not found");
    }

    if (student.role !== Role.STUDENT) {
      throw new Error("Only students can book tutors");
    }

    // =========================
    // 2. Check Tutor
    // =========================
    const tutorProfile = await tx.tutorProfiles.findUnique({
      where: { id: payload.tutorId },
      include: { user: true },
    });

    if (!tutorProfile) {
      throw new Error("Tutor not found");
    }

    if (tutorProfile.user.role !== Role.TUTOR) {
      throw new Error("Selected user is not a tutor");
    }

    // =========================
    // 3. Check Category
    // =========================
    const category = await tx.category.findUnique({
      where: { id: payload.categoryId },
    });

    if (!category) {
      throw new Error("Category not found");
    }

    // =========================
    // 4. CHECK SUBJECT (FIXED)
    // =========================
    if (!payload.subjectId) {
      throw new Error("Subject is required");
    }

    const subject = await tx.subject.findUnique({
      where: {
        id: payload.subjectId, // ✅ no TS error now
      },
    });

    if (!subject) {
      throw new Error("Subject not found");
    }

    // =========================
    // 5. Validate Time
    // =========================
    const startTime = new Date(payload.startDate).getTime();
    const endTime = new Date(payload.endDate).getTime();

    if (endTime <= startTime) {
      throw new Error("End date must be after start date");
    }

    // =========================
    // 6. Overlap Check
    // =========================
    const existingBooking = await tx.booking.findFirst({
      where: {
        tutorId: tutorProfile.id,
        OR: [
          {
            startDate: {
              lte: payload.endDate,
            },
            endDate: {
              gte: payload.startDate,
            },
          },
        ],
      },
    });

    if (existingBooking) {
      throw new Error("Tutor is already booked at this time");
    }

    // =========================
    // 7. Price Calculation
    // =========================
    const durationInHour = (endTime - startTime) / (1000 * 60 * 60);
    const totalPrice = durationInHour * category.price;

    // =========================
    // 8. CREATE BOOKING (FIXED)
    // =========================
    const booking = await tx.booking.create({
      data: {
        studentId: userId,
        tutorId: tutorProfile.id,
        categoryId: payload.categoryId,
        subjectId: payload.subjectId, // ✅ FIXED HERE
        startDate: payload.startDate,
        endDate: payload.endDate,
        totalPrice,
        status: "PENDING",
        note: payload.note,
      },
    });

    return booking;
  });
};

export const BookingService = {
  createBookingIntoDB,
};