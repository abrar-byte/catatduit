"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "Jan",
    income: 2500,
    expense: 1800,
  },
  {
    name: "Feb",
    income: 3000,
    expense: 2100,
  },
  {
    name: "Mar",
    income: 2800,
    expense: 1900,
  },
  {
    name: "Apr",
    income: 3200,
    expense: 2300,
  },
  {
    name: "May",
    income: 3800,
    expense: 2600,
  },
  {
    name: "Jun",
    income: 4000,
    expense: 2400,
  },
]

interface TransactionChartProps extends React.HTMLAttributes<HTMLDivElement> {}

export function TransactionChart({ className, ...props }: TransactionChartProps) {
  return (
    <Card className={className} {...props}>
      <CardHeader>
        <CardTitle>Overview</CardTitle>
        <CardDescription>View your income and expenses over time</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="bar">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="bar">Bar Chart</TabsTrigger>
              <TabsTrigger value="line">Line Chart</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="bar" className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="income" name="Income" fill="#10b981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="expense" name="Expense" fill="#ef4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
          <TabsContent value="line" className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="income" name="Income" stroke="#10b981" strokeWidth={2} />
                <Line type="monotone" dataKey="expense" name="Expense" stroke="#ef4444" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
