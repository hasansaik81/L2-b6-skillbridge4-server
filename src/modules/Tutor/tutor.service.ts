
import { BookingStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma"

const createTutorIntoDB=async(payLoad:any,userId:string)=>{

  const user=await prisma.user.findUnique({
    where:{
      id:userId,
    },
  });
  if(!user){
    throw new Error ("User not found")
  }
  const result= await prisma.tutorProfiles.create({
    data:{...payLoad,tutorId:user.id},
  });
  return result;
};

//  tutorId:user
// userId: user.id


const getAllTutorIntoDB=async(userId:string)=>{


  const user=await prisma.user.findUnique({
    where:{
      id:userId,
    },
  });
  if(!user){
    throw new Error ("User not found!!")
  }
  const result =await prisma.tutorProfiles.findUniqueOrThrow({
    where:{
      tutorId:user.id,
    },
    include:{
      user:true
    },
  });

  return result;
};

const getSingleSitterIntoDB=async(tutorId:string)=>{
  const result = await prisma.tutorProfiles.findUnique({
    where:{
      id:tutorId
    },
    // include:{
    //   user:true
    // }
  });
  return result;
}

const updateBookingStatusIntoDB=async(status:BookingStatus,bookingId:string)=>{
  const result = await prisma.booking.update({
    where:{
      id:bookingId,
    },
    data:{
      status:status,

    },
  });
  return result;
};





// const updateBookingStatusIntoDB = async (
//   bookingId: string,
//   status: BookingStatus
// ) => {

//   // 1️⃣ booking exists check
//   const booking = await prisma.booking.findUnique({
//     where: { id: bookingId },
//   });

//   if (!booking) {
//     throw new Error("Booking not found");
//   }

//   // 2️⃣ prevent invalid update
//   if (booking.status === "COMPLETED") {
//     throw new Error("Booking already completed");
//   }

//   // 3️⃣ OPTIONAL: only CONFIRMED → COMPLETED allow
//   if (status === "COMPLETED" && booking.status !== "CONFIRMED") {
//     throw new Error("Only confirmed bookings can be completed");
//   }

//   // 4️⃣ update
//   const result = await prisma.booking.update({
//     where: { id: bookingId },
//     data: {
//       status: status,
//     },
//   });

//   return result;
// };



export const TutorService={
  createTutorIntoDB,
  getAllTutorIntoDB,
  getSingleSitterIntoDB,
  updateBookingStatusIntoDB
}