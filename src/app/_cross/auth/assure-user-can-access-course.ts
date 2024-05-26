import { type Course } from "@prisma/client";
import { type User } from "@clerk/nextjs/dist/types/server";

export const assureUserCanAccessCourse = ({
  course,
  user,
}: {
  course: Course;
  user: User;
}) => {
  const userIsNotCourseOwner = course.ownerId !== user.id;
  const userIsNotCourseStudent = !course.studentIds.includes(user.id);

  if (userIsNotCourseOwner && userIsNotCourseStudent)
    throw new Error("El usuario no puede acceder a la información del curso.");
};
