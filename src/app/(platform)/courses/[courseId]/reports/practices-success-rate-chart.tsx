"use client"

import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/_cross/components/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/app/_cross/components/chart"

// Ejemplo de datos de trabajos prácticos
const tpData = [
  { name: "TP1", successRate: 85 },
  { name: "TP2", successRate: 92 },
  { name: "TP3", successRate: 78 },
  { name: "TP4", successRate: 88 },
  { name: "TP5", successRate: 95 },
]

export default function Component() {
  return (
    <Card className="w-full max-w-3xl">
      <CardHeader>
        <CardTitle>Tasa de Éxito de Trabajos Prácticos</CardTitle>
        <CardDescription>Porcentaje de éxito para cada trabajo práctico</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            successRate: {
              label: "Tasa de Éxito",
              color: "hsl(var(--chart-1))",
            },
          }}
          className="h-[400px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={tpData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 100]} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="successRate" fill="var(--color-successRate)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}