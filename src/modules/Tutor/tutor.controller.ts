import { Request, Response } from "express";
import { TutorService } from "./tutor.service";
import sendResponse from "../../utils/sendResponse";

const createTutor=async(req:Request, res:Response)=>{

    try{
      const result=await TutorService.createTutorIntoDB(
        req.body,
        req.user?.id,
      );
      sendResponse(res,{
        statusCode:201,
        success:true,
        message:"Tutor Created",
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




const getAllTutor=async (req:Request,res:Response)=>{
  try{
    const result =await TutorService.getAllTutorIntoDB(req.user?.id);
    sendResponse(res,{
      statusCode:201,
      success:true,
      message:"Tutor retrived Successfully.",
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

const getSingleTutor=async(req:Request,res:Response)=>{
  try{
  
    const result=await TutorService.getSingleSitterIntoDB(req.params?.id as string);
    sendResponse(res,{
      statusCode:201,
      success:true,
      message:"Tutor retrived Successfully.",
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

const updateBookingStatus=async(req:Request,res:Response)=>{
  try {
    const result = await TutorService.updateBookingStatusIntoDB(
      req.body.status,
      req.params?.id as string
    );
    sendResponse(res,{
      statusCode:200,
      success:true,
      message:"Booking status updated successfully",
      data:result,
    });
  } catch (error:any) {
    sendResponse(res,{
      statusCode:400,
      success:false,
      message:error?.message||"Something went wrong",
      data:null,
    })
  }
}
  

export const TutorController={
    createTutor,
    getAllTutor,
    getSingleTutor,
    updateBookingStatus
}