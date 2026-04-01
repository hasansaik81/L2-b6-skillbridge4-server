import { Request, Response } from "express";
import { CategoryService } from "./category.service";
import sendResponse from "../../utils/sendResponse";


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
            statusCode:400,
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
}





export const CategoryController = {
    createCategory,
    getAllCategory
    };