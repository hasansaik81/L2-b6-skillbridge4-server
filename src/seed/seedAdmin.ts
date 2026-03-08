import { prisma } from "../lib/prisma";
import { UserRole } from "../middlewares/auth";
import bcrypt from "bcrypt"

const seedAdmin=async()=>{
    const hashedPassword= await bcrypt.hash("12345",8);

    const adminData={
        name:"Admin",
        email:"admin@skillbridge.com",
        role:UserRole.admin,
        password:hashedPassword
    };

    try{
        const isExists= await prisma.user.findUnique({
            where:{
                email:adminData.email,
            },
        });
        if(isExists){
            console.log("admin already exists!!");
            return;
        }
        const admin=await prisma.user.create({
            data:adminData
        });
        console.log("admin created successfully!!")
    }catch(error){
        console.log(error)
    }finally{
        await prisma.$disconnect
    }
    
}
seedAdmin()