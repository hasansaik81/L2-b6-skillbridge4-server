
import { Subjects } from "../../../generated/prisma/client";
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


// // const createCategory = async (payload: any) => {
// //   const tutor = await prisma.tutorProfiles.findUnique({
// //     where: { id: payload.tutorId }
// //   });

// //   if (!tutor) {
// //     throw new Error("Tutor not found");
// //   }

// //   const result = await prisma.category.create({
// //     data: {
// //       categoryType: payload.categoryType,
// //       price: payload.price,
// //       description: payload.description,
// //       tutorId: payload.tutorId
// //     }
// //   });

//   return result;
// // };


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



const getSingleCategoryIntoDB = async (tutorId: string) => {
  const result = await prisma.tutorProfiles.findUnique({
    where: {
      tutorId: tutorId,
    },
    include: {
      user: true,
      categories: true,
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

const createSubject = async (data:Subjects) => {
 
    return await prisma.subjects.create({
    data
  });
};




const updateSubject=async(data:Subjects,subjectId:string)=>{
    return await prisma.subjects.update({
        where:{
            id:subjectId
        },
        data
    });
}

const deleteSubject=async(subjectId:string)=>{
    return await prisma.subjects.delete({
        where:{
            id:subjectId
        }
    })
}


export const CategoryService = {
  createCategoryIntoDB,
  getAllCategoryIntoDB,
    getSingleCategoryIntoDB,
    getPublicAllCategoryIntoDB,
    getPublicSingleCategoryIntoDB,
    createSubject,
    updateSubject,
    deleteSubject
   
};
  