"use client";

import { FC } from "react";
import { Button } from "../../../../_cross/components/button";

interface DownloadButtonProps {
  studentsEvaluation?: {
    students_evaluations: Record<
      string,
      { resolution_score: number; resolution_capacity: number }
    >;
  };
  users?: any[];
}

const DownloadButton: FC<DownloadButtonProps> = ({
  studentsEvaluation,
  users,
}) => {
  if (!studentsEvaluation || !users) {
    return null;
  }

  return (
    <Button
      onClick={() => {
        const data = Object.entries(
          studentsEvaluation.students_evaluations,
        ).map(([studentId, evaluation], index) => ({
          index: index + 1,
          firstName: users.find((user) => user.id === studentId)?.firstName,
          lastName: users.find((user) => user.id === studentId)?.lastName,
          email: users.find((user) => user.id === studentId)?.emailAddresses[0]
            ?.emailAddress,
          resolutionScore: evaluation.resolution_score.toFixed(2),
          resolutionCapacity: evaluation.resolution_capacity.toFixed(2),
        }));

        const csvHeader =
          ",Nombre,Appellidos,Email,Puntaje de resolución,Capacidad de resolución\n";
        const csvRows = data
          .map((row) => Object.values(row).join(","))
          .join("\n");
        const csvContent = csvHeader + csvRows;

        // Crea un archivo blob y un enlace de descarga
        const blob = new Blob([csvContent], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "data.csv";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }}
    >
      Descargar
    </Button>
  );
};

export default DownloadButton;
