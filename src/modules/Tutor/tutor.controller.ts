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


const updateTutorSubjects = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Extract the tutorId and the list of subjects from the body
    const { tutorId, subjectIds } = req.body; 

    if (!tutorId) {
      throw new Error("tutorId is required in the request body");
    }

    // Pass the tutorId directly to the service layer
    const result = await TutorService.updateTutorSubjects(tutorId, subjectIds || []);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Tutor subjects updated successfully!',
      data: result,
    });
    
  } catch (error: any) {
    next(error); // Passes error safely to global error handler
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