// import { Request, Response, NextFunction } from "express";
// import { BookingService } from "./booking.service";
// import sendResponse from "../../utils/sendResponse";


// // Create Booking Controller
// const createBooking = async (req: Request, res: Response) => {
//   try {
//     const result= await BookingService.createBookingIntoDB(
  
//     req.body,
//     req.user?.id
//     )
  
//    sendResponse(res, {
//     statusCode: 201,
//     success: true,
//     message:"Booking created successfully",
//     data: result,
//    })
//   }catch(error:any){
//     sendResponse(res,{
//         statusCode: 400,
//         success: false,
//         message: error.message || "Failed to create booking",
//     })
//   }
// };
// export const BookingController = {
//   createBooking,
// };


import { Request, Response } from "express";
import { BookingService } from "./booking.service";
import sendResponse from "../../utils/sendResponse";

const createBooking = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id; // auth middleware থেকে আসবে

    if (!userId) {
      throw new Error("Unauthorized");
    }

    const result = await BookingService.createBookingIntoDB(
      req.body,
      userId
    );

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Booking created successfully",
      data: result,
    });

  } catch (error: any) {
    sendResponse(res, {
      statusCode: 400,
      success: false,
      message: error.message || "Failed to create booking",
    });
  }
};

export const BookingController = {
  createBooking,
};
