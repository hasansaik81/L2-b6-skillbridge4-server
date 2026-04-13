import { prisma } from "../../lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const secret = "iadmcttoken";

const createUserIntoDb=async(payload:any)=>{
 const hashPassword=await bcrypt.hash(payload.password,8) 

const result =await prisma.user.create({
data:{...payload,password:hashPassword},
});
const {password, ...newResult}=result;
return  newResult
}


const loginUserIntoDb=async(payload:any)=>{
 const user=await prisma.user.findUnique({
    where:{
        email:payload.email
    },
 })
 if(!user){
    throw new Error ("User not found")
 } 
 const ispasswordMatched=await bcrypt.compare(
    payload.password,
    user.password,
 );
 if(!ispasswordMatched){
    throw new Error ("Invalid creadential!!");
 };
   
 const userData={
    id:user.id,
    name:user.name,
    role:user.role,
    status:user.status,
    email:user.email
 }
const token = jwt.sign(userData , secret ,{expiresIn:"1d"})
return{
    token,
    user,
}
}

const getMe = async (userId: string) => {
  return prisma.user.findUnique({
    where: { id: userId },
    include: {
      tutorProfile: true,
    },
  });
};

export const AuthService = {
    createUserIntoDb,
    loginUserIntoDb,
      getMe

    };