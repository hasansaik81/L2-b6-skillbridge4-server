


import { NextFunction, Request, Response } from "express";
import { ReviewService } from "./reiview.service";
import sendResponse from "../../utils/sendResponse";

const createReview = async (
  req: Request,
  res: Response,
 
) => {
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
    sendResponse(res, {
      statusCode: 400,
      success: false,
      message: error.message || "Failed to create review",
    });
  }
};

const getTutorReviews = async (
  req: Request,
  res: Response,
 
) => {
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
    sendResponse(res, {
      statusCode: 400,
      success: false,
      message: error.message || "Failed to fetch reviews",
    });
  }
};

export const ReviewController = {
  createReview,
  getTutorReviews,
};

