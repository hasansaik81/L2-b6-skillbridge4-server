

import { prisma } from "../../lib/prisma"


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


const getPublicAllCategoryIntoDB = async () => {
  const result = await prisma.category.findMany({
    include: {
      tutor: {
        include: {
          user:true
        },
      },
     
    },
  });

  return result;
};




const getPublicSingleCategoryIntoDB = async (categoryId: string) => {
  return await prisma.category.findUnique({
    where: {
      id: categoryId,
    },
    include: {
      tutor: {
        include: {
          user: true,
        },
      },
    },
  });
};


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



const getSingleCategoryIntoDB = async (tutorId: string) => {
  const result = await prisma.tutorProfiles.findUnique({
    where: {
      id: tutorId,
    },
    
  });

  return result;
};




export const CategoryService = {
  createCategoryIntoDB,
  getAllCategoryIntoDB,
    getSingleCategoryIntoDB,
    getPublicAllCategoryIntoDB,
    getPublicSingleCategoryIntoDB,
   
   
};
  