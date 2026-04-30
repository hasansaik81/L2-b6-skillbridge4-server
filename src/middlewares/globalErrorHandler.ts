// import { NextFunction, Request, Response } from "express";
// import { Prisma } from "../../generated/prisma/client";

// export function errorHandler(
//   err: any,
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) {
//   let statusCode = 500;
//   let errMessage = "Internal server Error!";
//   let errorDetails = err;

//   if (err instanceof Prisma.PrismaClientValidationError) {
//     ((statusCode = 400), (errMessage = "Incorrect body or missing a fields"));
//   }

//   res.status(statusCode);
//   res.json({ success: false, message: errMessage, error: errorDetails });
// }





import { NextFunction, Request, Response } from "express";
import { Prisma } from "../../generated/prisma/client";

function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    let statusCode = 500; // ডিফল্ট স্ট্যাটাস ৫০০ রাখা ভালো
    let message = err.message || "Internal Server Error";
    let error = err;

    // Prisma Validation Errors
    if (err instanceof Prisma.PrismaClientValidationError) {
        statusCode = 400;
        message = "Missing field or incorrect field type.";
    }
    // Prisma Known Request Errors (P2002, P2025 etc)
    else if (err instanceof Prisma.PrismaClientKnownRequestError) {
        statusCode = 400;
        if (err.code === "P2025") message = "Record not found.";
        else if (err.code === "P2002") message = "Duplicate key error.";
        else if (err.code === "P2003") message = "Foreign key constraint failed.";
    }
    // JWT specific errors
    else if (err.name === 'JsonWebTokenError') {
        statusCode = 401;
        message = "Invalid token format (JWT Malformed). Ensure you send 'Bearer <token>'.";
    }
    // Prisma Initialization Errors
    else if (err instanceof Prisma.PrismaClientInitializationError) {
        statusCode = 500;
        if (err.errorCode === "P1001") message = "Cannot connect to the database.";
    }

    // রেসপন্স পাঠানো
    res.status(statusCode).json({
        success: false,
        message,
        error: {
            name: err.name,
            message: err.message
        }
    });
}

export default errorHandler;