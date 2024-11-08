"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, Legend, XAxis, YAxis, Tooltip } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/_cross/components/card"

interface PracticeStats {
  practiceId: string;
  succeded_attempts: number;
  failed_attempts: number;
  succeded_ratio: number;
}

interface ChartProps {
  data: PracticeStats[];
}

export function Component({ data }: ChartProps) {
  const chartData = data.map((practice) => ({
    name: `TP ${practice.practiceId}`,
    succeeded: practice.succeded_attempts,
    failed: practice.failed_attempts,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Estadísticas por Trabajo Práctico</CardTitle>
        <CardDescription>
          Comparación de intentos exitosos y fallidos por trabajo práctico
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full">
          <BarChart
            width={800}
            height={400}
            data={chartData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="name"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar 
              dataKey="succeeded" 
              name="Intentos Exitosos"
              fill="hsl(var(--success))" 
              radius={[4, 4, 0, 0]}
            />
            <Bar 
              dataKey="failed" 
              name="Intentos Fallidos"
              fill="hsl(var(--destructive))" 
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              Comparativa de intentos por trabajo práctico
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
