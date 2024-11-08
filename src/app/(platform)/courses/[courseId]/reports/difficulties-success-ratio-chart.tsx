"use client"

import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/_cross/components/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/app/_cross/components/chart"

type DifficultyData = {
  difficulty: string
  succeded_attempts: number
  failed_attempts: number
  succeded_ratio: number
}

const chartConfig = {
  succeeded: {
    label: "Ratio de éxito",
    color: "hsl(var(--chart-3))",
  },
  label: {
    color: "hsl(var(--background))",
  },
} satisfies ChartConfig

export function DifficultiesSuccessRatioChart({ data }: { data: DifficultyData[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ratio de éxito por dificultad</CardTitle>
        <CardDescription>Porcentaje de ejercicios resueltos correctamente por nivel de dificultad</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={data}
            layout="vertical"
            margin={{
              right: 16,
              left: 16,
              top: 16,
              bottom: 16
            }}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="difficulty"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <XAxis 
              type="number" 
              domain={[0, 1]}
              tickFormatter={(value) => `${(value * 100).toFixed(0)}%`}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar
              dataKey="succeded_ratio"
              fill="hsl(var(--chart-3))"
              radius={4}
            >
              <LabelList
                dataKey="difficulty"
                position="insideLeft"
                offset={8}
                className="fill-[--color-label]"
                fontSize={12}
              />
              <LabelList
                dataKey="succeded_ratio"
                position="right"
                offset={8}
                className="fill-foreground"
                fontSize={12}
                formatter={(value: number) => `${(value * 100).toFixed(0)}%`}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Mostrando el ratio de éxito para cada nivel de dificultad
        </div>
      </CardFooter>
    </Card>
  )
} 