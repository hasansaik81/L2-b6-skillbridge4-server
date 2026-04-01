
import { prisma } from "../../lib/prisma"

const createCategoryIntoDB=async(payLoad:any,userId:string)=>{

  const tutorProfile=await prisma.tutorProfiles.findUnique({
    where:{
    tutorId:userId,
    },
  });
  if(!tutorProfile){
    throw new Error ("Tutor Profile not found");
  }
  const result= await prisma.category.create({
    data:{...payLoad,tutorId:tutorProfile.id},
  });
  return result;
};

//  tutorId:user
// userId: user.id


const getAllCategoryIntoDB=async(userId:string)=>{


  const tutorProfile=await prisma.tutorProfiles.findUnique({
    where:{
      tutorId:userId,
    },
  });
  if(!tutorProfile){
    throw new Error ("Tutor Profile not found!!")
  }
  const result =await prisma.category.findMany({
    where:{
      tutorId:tutorProfile.id,
    },
    include:{
      tutor:true
    },
  });

  return result;
};

// const getSingleSitterIntoDB=async(petId:string)=>{
//   const result = await prisma.
// }

// const getSingleServiceIntoDB=async()



export const CategoryService = {
    createCategoryIntoDB,
    getAllCategoryIntoDB
    };