
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
  
  });
  return result;
}


// const updateTutorSubjects = async (tutorId: any, subjectIds: string[]) => {
//   const tutor = await prisma.tutorProfiles.findUnique({
//     where: {
//       tutorId: user.id,
//     }
//   });
//   if (!tutor) {
//     throw new Error("Tutor not found");
//   }
//   const result = await prisma.$transaction(async(tx)=>{
//     await tx.tutorSubject.deleteMany({
//       where:{
//         tutorId:tutor.id,
//       }
//     })

//     if(subjectIds.length===0){
//       return[];
//     }
//     const tutorSubjectData=subjectIds.map((subjectId:string)=>({
//       tutorId:tutor.id,
//       subjectId:subjectId
//     }))
//     await tx.tutorSubject.createMany({
//       data:tutorSubjectData,
//  })
//     return tx.tutorSubject.findMany({
//     where:{tutorId:tutor.id},
//     include:{
//     subject:true,
//  }
// });

//  });
//    return result
// };
  
// const updateTutorSubjects=async(
//   tutorId:string,subjectIds:string[]
// )=>{
//   return await prisma.$transaction(async(tx)=>{
//     const tutor =await tx.tutorProfiles.findUnique({
//       where:{id:tutorId}
//     });
//     if(!tutor){
//       throw new Error ("Totur not found")
//     }
    
//     await tx.tutorSubject.deleteMany({
//       where:{
//         tutorId:tutor.id,
//       },
//     });
//     if(!subjectIds?.length){
//       return [];

//       const uniqueSubjectIds=[...new Set(subjectIds)];
//       const payload=uniqueSubjectIds.map((subjectId)=>({
//         tutorId:tutor.id,
//         subjectId
//       }))
//       await tx.tutorSubject.createMany({
//         data:payload,
//       })
//       const result=await tx.tutorSubject.findMany({
//         where:{
//           tutorId:tutor.id
//         },
//         include:{
//           subject:true,
//         },
//       });
//       return result;

//   })
// }



const updateTutorSubjects = async (
  tutorId: string,
  subjectIds: string[]
) => {

  return await prisma.$transaction(async (tx) => {

    const tutor = await tx.tutorProfiles.findUnique({
      where: { id: tutorId },
    });

    if (!tutor) {
      throw new Error("Tutor not found");
    }

    // 1. delete old subjects
    await tx.tutorSubject.deleteMany({
      where: {
        tutorId: tutor.id,
      },
    });

    // 2. if empty → return early
    if (!subjectIds?.length) {
      return [];
    }

    // 3. remove duplicates
    const uniqueSubjectIds = [...new Set(subjectIds)];

    // 4. prepare payload
    const payload = uniqueSubjectIds.map((subjectId) => ({
      tutorId: tutor.id,
      subjectId,
    }));

    // 5. insert new
    await tx.tutorSubject.createMany({
      data: payload,
    });

    // 6. return updated data
    const result = await tx.tutorSubject.findMany({
      where: {
        tutorId: tutor.id,
      },
      include: {
        subject: true,
      },
    });

    return result;
  });
};




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


export const TutorService={
  createTutorIntoDB,
  getAllTutorIntoDB,
  getSingleSitterIntoDB,
  updateTutorSubjects,
  updateBookingStatusIntoDB

}