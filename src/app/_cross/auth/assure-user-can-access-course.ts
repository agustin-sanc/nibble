import { type Course } from "@prisma/client";
import { type User } from "@clerk/nextjs/dist/types/server";
import { isProfessor } from "@/app/_cross/auth/is-professor";

export const assureUserCanAccessCourse = ({
  course,
  user,
}: {
  course: Course;
  user: User;
}) => {
  const userIsProfessor = isProfessor(user);

  if (userIsProfessor && course.ownerId !== user.id)
    throw new Error("El usuario no pertenece al curso");

  if (!userIsProfessor && !course.studentIds.includes(user.id))
    throw new Error("El usuario no pertenece al curso");
};
