
import { NextFunction, Request, Response } from "express";
import { secret } from "../modules/Auth/auth.service";
import jwt, { JwtPayload } from "jsonwebtoken";
import { prisma } from "../lib/prisma";

export enum UserRole {
    admin = "ADMIN",
    tutor = "TUTOR",
    student = "STUDENT"
}


const auth = (...roles: UserRole[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const authHeader = req.headers.authorization;
            

            if (!authHeader) {
                throw new Error("Authorization header not found!");
            }

          
            const token = authHeader.startsWith('Bearer ') 
                ? authHeader.split(' ')[1] 
                : authHeader;

           
            const decoded = jwt.verify(token, secret) as JwtPayload;

            const userData = await prisma.user.findUnique({
                where: {
                    email: decoded.email,
                },
            });

            if (!userData) {
                throw new Error("User does not exist in our system!");
            }

          
            if (userData.status !== "ACTIVE") {
                throw new Error("Your account is not active. Please contact support.");
            }

           
            if (roles.length && !roles.includes(userData.role as UserRole)) {
                throw new Error("Access Denied: You don't have permission for this action.");
            }

           
            req.user = decoded;
            
            next(); 
        } catch (error: any) {
           
            next(error); 
        }
    };

    
};



export default auth;