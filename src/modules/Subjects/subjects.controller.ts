import { NextFunction, Request, Response } from "express";
import { prisma } from "../../lib/prisma";
import sendResponse from "../../utils/sendResponse";
;
import { SubjectsService } from "./subjects.service";

 const getAllSubjects = async (req: Request,res: Response,next: NextFunction
) => {
  try {
    console.log("SUBJECT API HIT");

    const subjects = await prisma.subject.findMany({
      include: {
        category: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Subjects fetched successfully",
      data: subjects,
    });
  } catch (error: any) {
    next(error);
  }
};


const createSubject= async(req:Request,res:Response,next:NextFunction)=>{
    try{
    const result=await SubjectsService.createSubject(req.body)
    sendResponse(res,{
      statusCode:201,
      success:true,
      message:"subject create successfully",
      data:result
    })

    }catch (error:any){
        next(error)
    }
}

const updateSubject= async(req:Request,res:Response,next:NextFunction)=>{
    try{
    const result=await SubjectsService.updateSubject(req.body,req.params?.id as string)
    sendResponse(res,{
      statusCode:201,
      success:true,
      message:"subject updated successfully",
      data:result
    })
    }catch (error:any){
    next(error)
    }
}

const deleteSubject= async(req:Request,res:Response,next:NextFunction)=>{
    try{
    const result=await SubjectsService.deleteSubject(req.params?.id as string)
    sendResponse(res,{
      statusCode:201,
      success:true,
      message:"subject deleted successfully",
      data:result
    })
    }catch (error:any){
     next(error)
    }
}


export const SubjectsController = {
    getAllSubjects,
    createSubject,
    updateSubject,
    deleteSubject
    };