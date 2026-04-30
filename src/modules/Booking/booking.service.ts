
import { Booking, Role } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

type BookingPayload = Omit<Booking, "id" | "createdAt" | "updatedAt">;

const createBookingIntoDB = async (
  payload: BookingPayload,
  userId: string 
) => {
  return await prisma.$transaction(async (tx) => {

    
    //  STUDENT CHECK
   
    const student = await tx.user.findUnique({
      where: { id: userId },
    });

    if (!student) throw new Error("Student not found");

    if (student.role !== Role.STUDENT) {
      throw new Error("Only students can book tutors");
    }

   
    // TUTOR CHECK
 
    const tutorProfile = await tx.tutorProfiles.findUnique({
      where: { id: payload.tutorId },
      include: { user: true },
    });

    if (!tutorProfile) throw new Error("Tutor not found");

    if (tutorProfile.user.role !== Role.TUTOR) {
      throw new Error("Selected user is not a tutor");
    }

    
    //  CATEGORY CHECK
   
    const category = await tx.category.findUnique({
      where: { id: payload.categoryId },
    });

    if (!category) throw new Error("Category not found");

    
    //  SUBJECT CHECK
   
    if (!payload.subjectId) {
      throw new Error("Subject is required");
    }

    const subject = await tx.subject.findUnique({
      where: { id: payload.subjectId },
    });

    if (!subject) throw new Error("Subject not found");

    
    //  DATE VALIDATION
  
    const start = new Date(payload.startDate);
    const end = new Date(payload.endDate);

    if (end.getTime() <= start.getTime()) {
      throw new Error("End date must be after start date");
    }

    
    const durationInHour = (end.getTime() - start.getTime()) / (1000 * 60 * 60);

    if (durationInHour <= 0) {
      throw new Error("Invalid time range");
    }

   
    //  OVERLAP CHECK 
   
    const existingBooking = await tx.booking.findFirst({
      where: {
        tutorId: tutorProfile.id,
        status: { not: "CANCELLED" }, 
        AND: [
          {
            startDate: { lt: end },
          },
          {
            endDate: { gt: start },
          },
        ],
      },
    });

    if (existingBooking) {
      throw new Error("Tutor is already booked at this time");
    }

   
    //  PRICE CALCULATION
    
    const totalPrice = durationInHour * category.price;

   
    //  CREATE BOOKING (FIXED)
   
   
    const booking = await tx.booking.create({
      data: {
        studentId: userId,          
        tutorId: tutorProfile.id,
        categoryId: payload.categoryId,
        subjectId: payload.subjectId,
        startDate: start,
        endDate: end,
        totalPrice: Number(totalPrice.toFixed(2)), 
        status: "PENDING",
        note: payload.note || "",
      },
      include: {
        subject: true,
        tutor: true,
        category: true
      }
    });

    return booking;
  });
};

export const BookingService = {
  createBookingIntoDB,
};