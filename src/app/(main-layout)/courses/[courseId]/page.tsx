import { prisma } from "@/app/_cross/prisma";
import { Header2, Header3 } from "@/app/_cross/components/typography";
import { ContentGrid } from "@/app/_cross/components/content-grid";
import { ContentCard } from "@/app/_cross/components/content-card";
import { CreatePracticeDialog } from "@/app/(main-layout)/courses/[courseId]/practices/(create)/create-practice-dialog";
import { CreateTheoryDialog } from "@/app/(main-layout)/courses/[courseId]/theories/(create)/create-theory-dialog";
import { getCurrentUser } from "@/app/_cross/auth/get-current-user";
import { isProfessor } from "@/app/_cross/auth/is-professor";
import { assureUserCanAccessCourse } from "@/app/_cross/auth/assure-user-can-access-course";
import { EditCourseDialog } from "@/app/(main-layout)/courses/(edit)/edit-course-dialog";

const fetchCourse = async (id: number) =>
  await prisma.course.findUnique({
    where: { id },
    include: {
      practices: {
        include: {
          exercises: {
            include: {
              practice: true,
            },
          },
          theories: true,
        },
      },
      theories: true,
    },
  });

const Course = async ({ params }: { params: { courseId: string } }) => {
  if (isNaN(Number(params.courseId))) return <p>El curso no existe</p>;

  const courseId = Number(params.courseId);
  const course = await fetchCourse(Number(courseId));

  if (!course) return <p>El curso no existe</p>;

  const user = await getCurrentUser();

  if (!user) throw new Error("User not found");

  const userIsProfessor = isProfessor(user);
  assureUserCanAccessCourse({ course, user });

  const hasPractices = course.practices?.length > 0;

  const Practices = () => (
    <>
      <div className="flex flex-row items-center justify-between">
        <Header3>Trabajos prácticos</Header3>
        {userIsProfessor && <CreatePracticeDialog courseId={course.id} />}
      </div>

      {!hasPractices && <p>No hay trabajos prácticos aún.</p>}

      {hasPractices && (
        <ContentGrid>
          {course.practices.map((practice) => (
            <ContentCard
              key={practice.id}
              type="practice"
              practice={practice}
            />
          ))}
        </ContentGrid>
      )}
    </>
  );

  const hasTheories = course.theories?.length > 0;

  const Theories = () => (
    <>
      <div className="flex flex-row items-center justify-between">
        <Header3>Unidades teóricas</Header3>
        {userIsProfessor && <CreateTheoryDialog courseId={course.id} />}
      </div>

      {!hasTheories && <p>No hay unidades teóricas aún.</p>}

      {hasTheories && (
        <ContentGrid>
          {course.theories.map((theory) => (
            <ContentCard key={theory.id} type="theory" theory={theory} />
          ))}
        </ContentGrid>
      )}
    </>
  );

  return (
    <>
      <div className="flex items-center justify-between">
        <Header2>{course.name}</Header2>
        <EditCourseDialog course={course} />
      </div>
      <p>{course.description}</p>

      <Practices />
      <Theories />
    </>
  );
};

export default Course;
