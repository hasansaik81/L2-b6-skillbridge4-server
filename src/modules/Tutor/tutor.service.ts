// import { prisma } from "../../lib/prisma";

import { prisma } from "../../lib/prisma";

const getAllTutors = async (query: any) => {
  try {
    const tutors = await prisma.tutorProfile.findMany({
      where: {
        user: {
          role: "TUTOR",
          status: "ACTIVE",
        },
      },
      include: {
        user: true,
        categories: true,
        reviews: true,
      },
    });

    return tutors;
  } catch (error: any) {
    throw new Error(error.message);
  }
};



export const TutorService = {
   getAllTutors 
    };