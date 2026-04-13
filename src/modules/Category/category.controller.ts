import { Request, Response } from "express";
import { CategoryService } from "./category.service";
import sendResponse from "../../utils/sendResponse";


// const createCategory=async(req:Request, res:Response)=>{
 
//     try{
//       const result = await CategoryService.createCategoryIntoDB(
//         req.body,
//         req.user?.id,
//       );
//       sendResponse(res,{
//         statusCode:201,
//         success:true,
//         message:"Tutor Category  Created Successfully ",
//         data:result,

//       });
//     }catch (error:any){
      
//           sendResponse(res,{
//             statusCode:400,
//             success:false,
//             message:error?.message||"Something went wron!!",
//             data:null,
//           });
//     }
// };




export const createCategoryController = async (req: Request, res: Response) => {
  try {
    const payload = req.body;

    const result = await createCategory(payload);

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Category created successfully",
      data: result
    });

  } catch (error: any) {
    sendResponse(res, {
      statusCode: 400,
      success: false,
      message: error.message || "Something went wrong",
      data: null
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
        statusCode:400,
        success:false,
        message:error?.message||"Something went wrong",
        data:null,
      });
    }
}


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
        statusCode:400,
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
    updateSubject,
    deleteSubject
};
    
function createCategory(payload: any) {
  throw new Error("Function not implemented.");
}

