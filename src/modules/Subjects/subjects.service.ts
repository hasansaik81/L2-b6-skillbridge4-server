import { Subject } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

const getAllSubjects= async (): Promise<Subject[]> => {
  const result = await prisma.subject.findMany({
    include: {
      category: true, 
    },
  });

  return result;
};




const createSubject = async (data: any) => {
  try {
    const { categoryId, ...rest } = data;

    if (!categoryId) {
      throw new Error("categoryId is required");
    }

    return await prisma.subject.create({
      data: {
        ...rest,
        category: {
          connect: { id: categoryId },
        },
      },
    });
  } catch (error) {
    console.error("Subject creation failed:", error);
    throw error;
  }
};



const updateSubject = async (
  data: Partial<Subject>,
  subjectId: string
) => {
  return await prisma.subject.update({
    where: {
      id: subjectId,
    },
    data: {
      ...data,
    },
  });
};


const deleteSubject = async (subjectId: string) => {
  const subject = await prisma.subject.findUnique({
    where: { id: subjectId },
  });

  if (!subject) {
    throw new Error("Subject not found");
  }

  return await prisma.subject.delete({
    where: { id: subjectId },
  });
};






export const SubjectsService = {
   createSubject,
   getAllSubjects,
    updateSubject,
    deleteSubject
    };