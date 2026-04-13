// import { Booking } from "../../../generated/prisma/client";
// import { prisma } from "../../lib/prisma";




// const createBookingIntoDB=async(palyoad:Omit<Booking,"id"|"createdAt"|"updatedAt">,
// userId:string,)=>{
// const user=await prisma.user.findUnique({
//     where:{
//         id:userId,
//     },
// })
// if(!user){
//     throw new Error("User not found");
// }
// const pet=await prisma.
// }

// export const BookingService = {
//     // Add service methods here
//     };




//  import { Booking,  Role } from "../../../generated/prisma/client";
// import { prisma } from "../../lib/prisma";
// // import { Prisma, Role } from "@prisma/client";

// const createBookingIntoDB = async (
//   payload: Omit<Booking, "id" | "createdAt" | "updatedAt">,
//   userId: string
// ) => {
//   return await prisma.$transaction(async (tx) => {

//     const student = await tx.user.findUnique({
//       where: { id: userId },
//     });

//     if (!student) throw new Error("Student not found");

//     if (student.role !== Role.STUDENT) {
//       throw new Error("Only students can book tutors");
//     }

//     const tutor = await tx.user.findUnique({
//       where: { id: payload.tutorId },
//     });

//     if (!tutor) throw new Error("Tutor not found");

//     if (tutor.role !== Role.TUTOR) {
//       throw new Error("Selected user is not a tutor");
//     }

//     const category = await tx.category.findUnique({
//       where: { id: payload.categoryId },
//     });

//     if (!category) throw new Error("Category not found");

//     const startTime = new Date(payload.startDate).getTime();
//     const endTime = new Date(payload.endDate).getTime();

//     if (endTime <= startTime) {
//       throw new Error("End date must be after start date");
//     }

//     const existingBooking = await tx.booking.findFirst({
//       where: {
//         tutorId: payload.tutorId,
//         startDate: payload.startDate,
//       },
//     });

//     if (existingBooking) {
//       throw new Error("Tutor is already booked at this time");
//     }

//     const durationInHour = (endTime - startTime) / (1000 * 60 * 60);
//     const totalPrice = durationInHour * category.price;

//     const { categoryId, ...bookingData } = payload;

//     const booking = await tx.booking.create({
//       data: {
//         ...payload,
//         studentId: userId,
//         totalPrice,
//         status: "PENDING",
//       },
//     });

//     return booking;
//   });
// };

// export const BookingService = {
//   createBookingIntoDB,
// };


// import { Booking, Role } from "../../../generated/prisma/client";
// import { prisma } from "../../lib/prisma";



// const createBookingIntoDB = async (
//   payload: Omit<Booking, "id" | "createdAt" | "updatedAt" >,
//   userId: string
// ) => {
//   return await prisma.$transaction(async (tx) => {

//     // 1️⃣ Check Student
//     const student = await tx.user.findUnique({
//       where: { id: userId },
//     });

//     if (!student) throw new Error("Student not found");

//     if (student.role !== Role.STUDENT) {
//       throw new Error("Only students can book tutors");
//     }

//     // 2️⃣ Check Tutor (TutorProfiles দিয়ে)
//     const tutorProfile = await tx.tutorProfiles.findUnique({
//       where: { tutorId: payload.tutorId },
//       include: { user: true },
//     });

//     if (!tutorProfile) {
//       throw new Error("Tutor not found");
//     }

//     if (tutorProfile.user.role !== Role.TUTOR) {
//       throw new Error("Selected user is not a tutor");
//     }

//     // 3️⃣ Check Category
//     const category = await tx.category.findUnique({
//       where: { id: payload.categoryId },
//     });

//     if (!category) {
//       throw new Error("Category not found");
//     }

//     // 4️⃣ Validate Time
//     const startTime = new Date(payload.startDate).getTime();
//     const endTime = new Date(payload.endDate).getTime();

//     if (endTime <= startTime) {
//       throw new Error("End date must be after start date");
//     }

//     // 5️⃣ Check Existing Booking
//     const existingBooking = await tx.booking.findFirst({
//       where: {
//         tutorId: tutorProfile.user.id,
//         startDate: payload.startDate,
//       },
//     });

//     if (existingBooking) {
//       throw new Error("Tutor is already booked at this time");
//     }

//     // 6️⃣ Calculate Price
//     const durationInHour = (endTime - startTime) / (1000 * 60 * 60);
//     const totalPrice = durationInHour * category.price;

//     // 7️⃣ Create Booking
//     const booking = await tx.booking.create({
//       data: {
//         studentId: userId,
//         tutorId: tutorProfile.user.id,
//         categoryId: payload.categoryId,
//         startDate: payload.startDate,
//         endDate: payload.endDate,
//         totalPrice,
//         status: "PENDING",
//         note: payload.note,
//       },
//     });

//     return booking;
//   });
// };

// export const BookingService = {
//   createBookingIntoDB,
// };



// const createBookingIntoDB = async (
//   payload: Omit<
//     Booking,
//     "id" | "createdAt" | "updatedAt">,
//   userId: string
// ) => {
//   const user= await prisma.user.findUnique({
//     where:{
//         id:userId,

//   },
// });
// if(!user){
//     throw new Error("User not found");
// }
// const student=await prisma.student.findUnique({
//   where:{
//     id:payload.studentId,
//   }
// })
// }


import { Booking, Role } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";


const createBookingIntoDB = async (
  payload: Omit<Booking,"id"|"createdAt"|"updatedAt">,
  userId: string
) => {
  return await prisma.$transaction(async (tx) => {

    //  Check Student
    const student = await tx.user.findUnique({
      where: { id: userId },
    });

    if (!student) throw new Error("Student not found");

    if (student.role !== Role.STUDENT) {
      throw new Error("Only students can book tutors");
    }

    //  Check Tutor (IMPORTANT FIX)
    const tutorProfile = await tx.tutorProfiles.findUnique({
      where: { id: payload.tutorId }, // tutorId = userId
      include: { user: true },
    });

    if (!tutorProfile) {
      throw new Error("Tutor not found");
    }

    if (tutorProfile.user.role !== Role.TUTOR) {
      throw new Error("Selected user is not a tutor");
    }

    //  Check Category
    const category = await tx.category.findUnique({
      where: { id: payload.categoryId },
    });

    if (!category) {
      throw new Error("Category not found");
    }

    //  Validate Time
    const startTime = new Date(payload.startDate).getTime();
    const endTime = new Date(payload.endDate).getTime();

    if (endTime <= startTime) {
      throw new Error("End date must be after start date");
    }

    //  Overlap check (FIXED)
    const existingBooking = await tx.booking.findFirst({
      where: {
        tutorId: tutorProfile.user.id,
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

    //  Calculate Price
    const durationInHour = (endTime - startTime) / (1000 * 60 * 60);
    const totalPrice = durationInHour * category.price;

    //  Create Booking
    const booking = await tx.booking.create({
      data: {
        studentId: userId,
        tutorId: tutorProfile.id,
        categoryId: payload.categoryId,
        startDate: payload.startDate,
        endDate: payload.endDate,
        totalPrice,
        status: "PENDING",
        note: payload.note,

        // ...payload,totalPrice
      },
    });

    return booking;
  });
};

export const BookingService = {
  createBookingIntoDB,
};