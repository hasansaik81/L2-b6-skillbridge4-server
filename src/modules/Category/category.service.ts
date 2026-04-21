
import { Subject } from "../../../generated/prisma/client";
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



const getSingleCategoryIntoDB = async (tutorId: string) => {
  const result = await prisma.tutorProfiles.findUnique({
    where: {
      id: tutorId,
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


const createSubject = async (data: any) => {
  try {
    const { categoryId, ...rest } = data;

    if (!categoryId) {
      throw new Error("categoryId is required");
    }

    return await prisma.subject.create({
      data: {
        ...rest,
        category: {
          connect: { id: categoryId },
        },
      },
    });
  } catch (error) {
    console.error("Subject creation failed:", error);
    throw error;
  }
};




const getAllSubjects = async (userId: any) => {
 
  const user = await prisma.user.findMany({
    where: {
      id: userId
    },
  });
if(!user){
  throw new Error ("User not found!!")
}

const result =await prisma.subject.findMany({
  where:{
    category:user.id
  },
})
 return result
};

// category.service.ts

// export const getAllSubjects = async () => {
//   // এখানে userId চেক করার দরকার নেই যদি আপনি সব সাবজেক্ট দেখতে চান
//   const result = await prisma.subject.findMany({
//     include: {
//       category: true, // যদি ক্যাটাগরির ডিটেইলসও দেখতে চান
//     },
//   });

//   // যদি ডাটাবেস একদম খালি থাকে তবে এরর থ্রো না করে খালি অ্যারে পাঠানোই ভালো
//   return result; 
// };

// type TQuery = {
//   search?: string;
//   page?: string;
//   limit?: string;
// };

// const getAllSubjects = async (query: TQuery) => {
//   const { search, page = "1", limit = "10" } = query;

//   const skip = (Number(page) - 1) * Number(limit);

//   const subjects = await prisma.subject.findMany({
//     where: {
//       name: {
//         contains: search || "",
//         mode: "insensitive",
//       },
//     },
//     include: {
//       category: true,
//     },
//     skip,
//     take: Number(limit),
//   });

//   return subjects;
// };







const updateSubject = async (
  data: Partial<Subject>,
  subjectId: string
) => {
  return await prisma.subject.update({
    where: {
      id: subjectId,
    },
    data: {
      ...data,
    },
  });
};


const deleteSubject = async (subjectId: string) => {
  const subject = await prisma.subject.findUnique({
    where: { id: subjectId },
  });

  if (!subject) {
    throw new Error("Subject not found");
  }

  return await prisma.subject.delete({
    where: { id: subjectId },
  });
};


export const CategoryService = {
  createCategoryIntoDB,
  getAllCategoryIntoDB,
    getSingleCategoryIntoDB,
    getPublicAllCategoryIntoDB,
    getPublicSingleCategoryIntoDB,
    getAllSubjects,
    createSubject,
    updateSubject,
    deleteSubject
   
};
  