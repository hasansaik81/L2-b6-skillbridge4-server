import { NextFunction, Request, Response } from "express";
import { TutorService } from "./tutor.service";
import sendResponse from "../../utils/sendResponse";

const createTutor=async(req:Request, res:Response,next:NextFunction)=>{

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
      next()
          
    }
};




const getAllTutor=async (req:Request,res:Response,next:NextFunction)=>{
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
     next()
  };
}

const getSingleTutor=async(req:Request,res:Response,next:NextFunction)=>{
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
   next()
  };

}



const updateTutorSubjects = async (req: Request, res: Response,next:NextFunction) => {
  try {
    
    const user = req.user as any; 
    const { subjectIds } = req.body;

    if (!user) {
        throw new Error("Unauthorized access");
    }

    const result = await TutorService.updateTutorSubjects(subjectIds, user);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Tutor subjects updated successfully!',
      data: result,
    });
    
  } catch (error: any) {
   next()
  }
};



const updateBookingStatus=async(req:Request,res:Response,next:NextFunction)=>{
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
      next()
  }
}
  

export const TutorController={
    createTutor,
    getAllTutor,
    getSingleTutor,
    updateTutorSubjects,
    updateBookingStatus
}