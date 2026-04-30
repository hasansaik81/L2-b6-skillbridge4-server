import { NextFunction, Request, Response } from "express";
import { CategoryService } from "./category.service";
import sendResponse from "../../utils/sendResponse";
import { prisma } from "../../lib/prisma";

const getAllCategory=async (req:Request,res:Response ,next:NextFunction)=>{
  try{
    const result =await CategoryService.getAllCategoryIntoDB(req.user?.id);
    sendResponse(res,{
      statusCode:201,
      success:true,
      message:"Tutor Category retrived Successfully.",
      data:result,
    });
  }catch(error:any){
    next(error)
  };
};

const getPublicAllCategory=async(req:Request,res:Response,next:NextFunction)=>{
  try{
    const result =await CategoryService.getPublicAllCategoryIntoDB();
  sendResponse(res,{
    statusCode:201,
    success:true,
    message:"Public Categories retrieved successfully.",
    data:result,
  })
  }catch(error:any){
    next(error)
  }
};


const getPublicSingleCategory=async(req:Request,res:Response,next:NextFunction)=>{
  try{
    const result =await CategoryService.getPublicSingleCategoryIntoDB(req.params?.id as string);
    sendResponse(res,{
      statusCode:201,
      success:true,
      message:"Public Category retrieved successfully.",
      data:result,
    });
  }catch(error:any){
    next(error)
  }
};

//  const getAllSubjects = async (req: Request,res: Response,next: NextFunction
// ) => {
//   try {
//     console.log("SUBJECT API HIT");

//     const subjects = await prisma.subject.findMany({
//       include: {
//         category: true,
//       },
//       orderBy: {
//         createdAt: "desc",
//       },
//     });

//     sendResponse(res, {
//       statusCode: 200,
//       success: true,
//       message: "Subjects fetched successfully",
//       data: subjects,
//     });
//   } catch (error: any) {
//     next(error);
//   }
// };



const createCategory=async(req:Request, res:Response ,next:NextFunction)=>{
 
    try{
      const result = await CategoryService.createCategoryIntoDB(
        req.body,
        req.user?.id,
      );
      sendResponse(res,{
        statusCode:201,
        success:true,
        message:"Tutor Category  Created Successfully ",
        data:result,

      });
    }catch (error:any){
      
      next()
    }
};


const getSingleCategory=async(req:Request,res:Response,next:NextFunction)=>{
  try{
  
    const result=await CategoryService.getSingleCategoryIntoDB(req.params?.id as string);
    sendResponse(res,{
      statusCode:201,
      success:true,
      message:"Tutor Category retrived Successfully.",
      data:result,
    });
  }catch(error:any){
  next(error)
  }
};





// const createSubject= async(req:Request,res:Response,next:NextFunction)=>{
//     try{
//     const result=await CategoryService.createSubject(req.body)
//     sendResponse(res,{
//       statusCode:201,
//       success:true,
//       message:"subject create successfully",
//       data:result
//     })

//     }catch (error:any){
//         next(error)
//     }
// }





// const updateSubject= async(req:Request,res:Response,next:NextFunction)=>{
//     try{
//     const result=await CategoryService.updateSubject(req.body,req.params?.id as string)
//     sendResponse(res,{
//       statusCode:201,
//       success:true,
//       message:"subject updated successfully",
//       data:result
//     })
//     }catch (error:any){
//     next(error)
//     }
// }

// const deleteSubject= async(req:Request,res:Response,next:NextFunction)=>{
//     try{
//     const result=await CategoryService.deleteSubject(req.params?.id as string)
//     sendResponse(res,{
//       statusCode:201,
//       success:true,
//       message:"subject deleted successfully",
//       data:result
//     })
//     }catch (error:any){
//      next(error)
//     }
// }



export const CategoryController = {
    
    getAllCategory,
    getSingleCategory,
    getPublicAllCategory,
    getPublicSingleCategory,
    createCategory,
  //   createSubject,
  //  getAllSubjects,
  //   updateSubject,
  //   deleteSubject
};
    




