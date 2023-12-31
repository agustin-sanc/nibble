import { ContentGrid } from "@/app/_cross/components/content-grid";
import { Header2 } from "@/app/_cross/components/typography";
import { prisma } from "@/app/_cross/prisma";
import { ContentCard } from "@/app/_cross/components/content-card";
import { CreateCourseDialog } from "@/app/(main-layout)/courses/(create)/create-course-dialog";
import { getCurrentUser } from "@/app/_cross/auth/get-current-user";
import { isProfessor } from "@/app/_cross/auth/is-professor";
import { Button } from "@/app/_cross/components/button";
import Link from "next/link";

const Courses = async () => {
  const user = await getCurrentUser();
  const currentUserIsProfessor = isProfessor(user);

  const courses = await prisma.course.findMany({
    where: {
      ...(currentUserIsProfessor
        ? { ownerId: user.id }
        : { studentIds: { has: user.id } }),
    },
  });

  const hasCourses = courses.length > 0;

  return (
    <>
      <div className="flex justify-between">
        <Header2>Cursos</Header2>
        {currentUserIsProfessor && <CreateCourseDialog />}
      </div>

      {!hasCourses && <p>No perteneces a ningún curso aún.</p>}

      {hasCourses && (
        <ContentGrid>
          {courses.map((course) => (
            <ContentCard
              key={course.id}
              title={course.name}
              subtitle={course.description}
            >
              <Button variant="outline" className="w-full" asChild>
                <Link href={`/courses/${course.id}`}>Abrir curso</Link>
              </Button>
            </ContentCard>
          ))}
        </ContentGrid>
      )}
    </>
  );
};

export default Courses;
