// import { NextFunction, Request, Response } from "express"
// import { secret } from "../modules/Auth/auth.service";
// import jwt,{ JwtPayload } from "jsonwebtoken";
// import { prisma } from "../lib/prisma";


// export enum UserRole{
//     admin="ADMIN",
//     tutor="TUTOR",
//     student="STUDENT"
// }


// const auth=(...roles:UserRole[])=>{
//     return async(req:Request,res:Response,next:NextFunction)=>{
//         try{
//           const token=req.headers.authorization;
//         if(!token){
//             throw new Error ("Token not found!!")
//         }

        
//         const decoded=jwt.verify(token, secret)as JwtPayload;
//         const userData=await prisma.user.findUnique({
//             where:{
//                 email:decoded.email,
//             },
//         });
//         if(!userData){
//             throw new Error ("Unauthorized")
//         }
//         if(userData.status !=="ACTIVE"){
//             throw new Error("Unauthorized")
//         }
//         if(roles.length && !roles.includes(decoded.role)){
//             throw new Error("Unauthorized!!!");
//         }
//         req.user=decoded;
//         //    req.user = userData;
//         next()
//         }catch(error:any) {
//             next(error)
//         }
//     };
// };



// export default auth 





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
            

            // ১. চেক করুন হেডার বা টোকেন আছে কি না
            if (!authHeader) {
                throw new Error("Authorization header not found!");
            }

            // ২. Bearer এবং Token আলাদা করা (এটিই আপনার মূল সমস্যা ছিল)
            // 'Bearer <token>' থেকে শুধু <token> অংশটি নেওয়া
            const token = authHeader.startsWith('Bearer ') 
                ? authHeader.split(' ')[1] 
                : authHeader;

            // ৩. টোকেন ভেরিফাই করা
            const decoded = jwt.verify(token, secret) as JwtPayload;

            // ৪. ডাটাবেজ থেকে ইউজারের বর্তমান অবস্থা চেক করা
            const userData = await prisma.user.findUnique({
                where: {
                    email: decoded.email,
                },
            });

            if (!userData) {
                throw new Error("User does not exist in our system!");
            }

            // ৫. ইউজার একটিভ কি না তা যাচাই করা
            if (userData.status !== "ACTIVE") {
                throw new Error("Your account is not active. Please contact support.");
            }

            // ৬. রোলে পারমিশন আছে কি না চেক করা (Role-based access control)
            if (roles.length && !roles.includes(userData.role as UserRole)) {
                throw new Error("Access Denied: You don't have permission for this action.");
            }

            // ৭. রিকোয়েস্ট অবজেক্টে ডাটা সেট করা যাতে কন্ট্রোলারে ব্যবহার করা যায়
            req.user = decoded;
            
            next(); // সব ঠিক থাকলে পরবর্তী ধাপে (Controller) যাবে
        } catch (error: any) {
            // এটি সরাসরি আপনার গ্লোবাল 'errorHandler'-এ চলে যাবে
            next(error); 
        }
    };

    
};



export default auth;