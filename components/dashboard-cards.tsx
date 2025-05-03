"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatToIDR } from "@/lib/utils"
import { useApiAnyGet } from "@/services/query/client"
import { ArrowDownIcon, ArrowUpIcon, DollarSign } from "lucide-react"
import { useMemo } from "react"

export function DashboardCards() {
  const {data:dashboardData,isPending}=useApiAnyGet('dashboard')
  if(isPending){
    return <div>Loading...</div>
  }
  const data=dashboardData.data
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
          {/* <DollarSign className="h-4 w-4 text-muted-foreground" /> */}
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatToIDR(data.totalBalance.amount)}</div>
          <p className="text-xs text-muted-foreground">{data.totalBalance.trend === "down"?'-':'+'}{data.totalBalance.changePercent}% from last month</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Income</CardTitle>
          <ArrowUpIcon className="h-4 w-4 text-emerald-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatToIDR(data.income.amount)}</div>
          <p className="text-xs text-muted-foreground">{data.income.trend === "down"?'-':'+'}{data.income.changePercent}% from last month</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Expenses</CardTitle>
          <ArrowDownIcon className="h-4 w-4 text-rose-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatToIDR(data.expenses.amount)}</div>
          <p className="text-xs text-muted-foreground">{data.expenses.trend === "down"?'-':'+'}{data.expenses.changePercent}% from last month</p>
        </CardContent>
      </Card>
    </div>
  )
}
