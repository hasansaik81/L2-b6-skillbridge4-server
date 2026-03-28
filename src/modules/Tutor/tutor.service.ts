
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

// const getSingleSitterIntoDB=async(petId:string)=>{
//   const result = await prisma.
// }

export const TutorService={
  createTutorIntoDB,
  getAllTutorIntoDB
}