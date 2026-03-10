import { NextFunction, Request, Response } from "express";
import { AuthService } from "./auth.service";
import sendResponse from "../../utils/sendResponse";

const createUser=async(req:Request,res:Response,next:NextFunction)=>{
   
    try{
  const result=await AuthService.createUserIntoDb(req.body)
  sendResponse(res,{
    statusCode:201,
    success:true,
    message:"User created",
    data:result,
  });
    }catch(error:any) {
       next(error)

    }
}

const loginUser = async (req: Request, res: Response) => {
  try {
    const result = await AuthService.loginUserIntoDb(req.body);

    res.cookie("token", result.token, {
      secure: false,
      httpOnly: true,
      sameSite: "strict", // none / strict / lax
    });

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "User logged in successfully",
      data: result,
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: error?.message || "Something went wrong",
      data: null,
    });
  }
};
// const getMe = async (userId: string) => {
//   return prisma.user.findUnique({
//     where: { id: userId },
//     include: {
//       tutorProfile: true,
//     },
//   });
// };
    


export const AuthController = {
    // Add controller methods here
    createUser,
    loginUser
    };