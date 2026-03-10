import { NextFunction, Request, Response } from "express"
import { secret } from "../modules/Auth/auth.service";
import jwt,{ JwtPayload } from "jsonwebtoken";
import { prisma } from "../lib/prisma";


export enum UserRole{
    admin="ADMIN",
    tutor="TUTOR",
    student="STUDENT"
}


const auth=(...roles:UserRole[])=>{
    return async(req:Request,res:Response,next:NextFunction)=>{
        try{
          const token=req.headers.authorization;
        if(!token){
            throw new Error ("Token not found!!")
        }

        
        const decoded=jwt.verify(token, secret)as JwtPayload;
        const userData=await prisma.user.findUnique({
            where:{
                email:decoded.email,
            },
        });
        if(!userData){
            throw new Error ("Unauthorized")
        }
        if(userData.status !=="ACTIVE"){
            throw new Error("Unauthorized")
        }
        if(roles.length && !roles.includes(decoded.role)){
            throw new Error("Unauthorized!!!");
        }
        req.user=decoded;
        //    req.user = userData;
        next()
        }catch(error:any) {
            next(error)
        }
    };
};


// const auth = (...roles: UserRole[]) => {
//   return async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const authHeader = req.headers.authorization;

//       if (!authHeader) {
//         throw new Error("Authorization header missing");
//       }

//       const token = authHeader.split(" ")[1];

//       if (!token) {
//         throw new Error("Token missing");
//       }

//       const decoded = jwt.verify(token, secret) as JwtPayload;

//       const userData = await prisma.user.findUnique({
//         where: {
//           email: decoded.email,
//         },
//       });

//       if (!userData) {
//         throw new Error("User not found");
//       }

//       req.user = decoded;

//       next();
//     } catch (error) {
//       next(error);
//     }
//   };
// };

export default auth 