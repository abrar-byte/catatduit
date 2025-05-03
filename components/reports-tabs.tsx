"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MonthlyReport } from "@/components/monthly-report"
import { CategoryReport } from "@/components/category-report"
import { YearlyReport } from "@/components/yearly-report"

export function ReportsTabs() {
  return (
    <Tabs defaultValue="monthly" className="w-full">
      <TabsList className="grid w-full grid-cols-3 mb-8">
        <TabsTrigger value="monthly">Monthly</TabsTrigger>
        <TabsTrigger value="category">By Category</TabsTrigger>
        <TabsTrigger value="yearly">Yearly</TabsTrigger>
      </TabsList>
      <TabsContent value="monthly">
        <MonthlyReport />
      </TabsContent>
      <TabsContent value="category">
        <CategoryReport />
      </TabsContent>
      <TabsContent value="yearly">
        <YearlyReport />
      </TabsContent>
    </Tabs>
  )
}
