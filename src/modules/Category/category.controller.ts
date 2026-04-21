import { Request, Response } from "express";
import { CategoryService } from "./category.service";
import sendResponse from "../../utils/sendResponse";
import { ParsedQs } from "qs";


const createCategory=async(req:Request, res:Response)=>{
 
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
      
          sendResponse(res,{
            statusCode:500,
            success:false,
            message:error?.message||"Something went wron!!",
            data:null,
          });
    }
};





const getAllCategory=async (req:Request,res:Response)=>{
  try{
    const result =await CategoryService.getAllCategoryIntoDB(req.user?.id);
    sendResponse(res,{
      statusCode:201,
      success:true,
      message:"Tutor Category retrived Successfully.",
      data:result,
    });
  }catch(error:any){
    console.error(error)
    sendResponse(res,{
      statusCode:400,
      success:false,
      message:error?.message||"Something went wrong",
      data:null,
    })
  };
};


const getSingleCategory=async(req:Request,res:Response)=>{
  try{
  
    const result=await CategoryService.getSingleCategoryIntoDB(req.params?.id as string);
    sendResponse(res,{
      statusCode:201,
      success:true,
      message:"Tutor Category retrived Successfully.",
      data:result,
    });
  }catch(error:any){
    console.error(error)
    sendResponse(res,{
      statusCode:400,
      success:false,
      message:error?.message||"Something went wrong",
      data:null,
    });
  }
};

const getPublicAllCategory=async(req:Request,res:Response)=>{
  try{
    const result =await CategoryService.getPublicAllCategoryIntoDB();
  sendResponse(res,{
    statusCode:201,
    success:true,
    message:"Public Categories retrieved successfully.",
    data:result,
  })
  }catch(error:any){
    console.error(error)
    sendResponse(res,{
      statusCode:400,
      success:false,
      message:error?.message||"Something went wrong",
      data:null,
    });
  }
};

const getPublicSingleCategory=async(req:Request,res:Response)=>{
  try{
    const result =await CategoryService.getPublicSingleCategoryIntoDB(req.params?.id as string);
    sendResponse(res,{
      statusCode:201,
      success:true,
      message:"Public Category retrieved successfully.",
      data:result,
    });
  }catch(error:any){
    console.error(error)
    sendResponse(res,{
      statusCode:400,
      success:false,
      message:error?.message||"Something went wrong",
      data:null,
    });
  }
};


const createSubject= async(req:Request,res:Response)=>{
    try{
    const result=await CategoryService.createSubject(req.body)
    sendResponse(res,{
      statusCode:201,
      success:true,
      message:"subject create successfully",
      data:result
    })

    }catch (error:any){
      sendResponse(res,{
        statusCode:500,
        success:false,
        message:error?.message||"Something went wrong",
        data:null,
      });
    }
}


// const getAllSubjects = async (req: Request, res: Response) => {
//   try {
//     const result = await CategoryService.getAllSubjects();

//     sendResponse(res, {
//       statusCode: 201,
//       success: true,
//       message: "Subjects retrieved successfully",
//       data: result,
//     });

//   } catch (error: any) {
//     sendResponse(res, {
//       statusCode: 400,
//       success: false,
//       message: error.message || "Internal server error",
//       data: null,
//     });
//   }
// };


// const getAllSubjects = async (req: Request, res: Response) => {
//   try {
//     const userId = req.user?.id; 
    
//     const result = await CategoryService.getAllSubjects(userId);

//     sendResponse(res, {
//       statusCode: 200,
//       success: true,
//       message: "Subjects retrieved successfully",
//       data: result,
//     });

//   } catch (error: any) {
//     // এই কনসোল লগটি আপনাকে আপনার VS Code টার্মিনালে আসল এরর দেখাবে
//     console.error("CRITICAL ERROR:", error); 

//     sendResponse(res, {
//       statusCode: 500,
//       success: false,
//       message: error.message || "Internal server error",
//       data: null, // এখন এটি এরর ডিটেইলস দেখাবে
//     });
//   }
// }


// category.controller.ts

// const getAllSubjects = async (req: Request, res: Response) => {
//   try {
//     // সার্ভিস থেকে সরাসরি ডাটা নিয়ে আসুন
//     const result = await CategoryService.getAllSubjects();

//     sendResponse(res, {
//       statusCode: 200,
//       success: true,
//       message: "Subjects retrieved successfully",
//       data: result,
//     });
//   } catch (error: any) {
//     console.log("Error logic:", error);
//     sendResponse(res, {
//       statusCode: 500,
//       success: false,
//       message: error.message || "Internal server error",
//       data: null,
//     });
//   }
// };



const getAllSubjects = async (req: Request, res: Response) => {
  try {
    const result = await getAllSubjects(req.query);

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Subjects retrieved successfully",
      data: result,
    });
  } catch (error: any) {
    console.error("🔥 ERROR:", error);

    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: error.message || "Internal Server Error",
      data: null,
    });
  }
};





const updateSubject= async(req:Request,res:Response)=>{
    try{
    const result=await CategoryService.updateSubject(req.body,req.params?.id as string)
    sendResponse(res,{
      statusCode:201,
      success:true,
      message:"subject updated successfully",
      data:result
    })
    }catch (error:any){
      sendResponse(res,{
        statusCode:500,
        success:false,
        message:error?.message||"Something went wrong",
        data:null,
      });
    }
}

const deleteSubject= async(req:Request,res:Response)=>{
    try{
    const result=await CategoryService.deleteSubject(req.params?.id as string)
    sendResponse(res,{
      statusCode:201,
      success:true,
      message:"subject deleted successfully",
      data:result
    })
    }catch (error:any){
      sendResponse(res,{
        statusCode:400,
        success:false,
        message:error?.message||"Something went wrong",
        data:null,
      });
    }
}



export const CategoryController = {
    createCategory,
    getAllCategory,
    getSingleCategory,
    getPublicAllCategory,
    getPublicSingleCategory,
    createSubject,
    getAllSubjects,
    updateSubject,
    deleteSubject
};
    




