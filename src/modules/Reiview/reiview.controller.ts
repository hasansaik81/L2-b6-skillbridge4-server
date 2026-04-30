


import { NextFunction, Request, Response } from "express";
import { ReviewService } from "./reiview.service";
import sendResponse from "../../utils/sendResponse";

const createReview = async (req: Request,res: Response,next:NextFunction) => {
  try {
    const validated = req.body;

    const result = await ReviewService.createReview(
      req.user?.id,
      validated
    );

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Review created successfully",
      data: result,
    });
  } catch (error: any) {
        next()
  }
};

const getTutorReviews = async (req: Request,res: Response, next:NextFunction) => {
  try {
    const  tutorId = req.params.id as string

    const result = await ReviewService.getTutorReviews(tutorId);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Reviews fetched successfully",
      data: result,
    });
  } catch (error:any) {
    next()
  }
};

export const ReviewController = {
  createReview,
  getTutorReviews,
};

