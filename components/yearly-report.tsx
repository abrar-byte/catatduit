"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileSpreadsheet } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import * as XLSX from "xlsx"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

// Mock data for yearly report
const yearlyData = [
  { month: "Jan", income: 3200, expense: 2100 },
  { month: "Feb", income: 3100, expense: 2000 },
  { month: "Mar", income: 3400, expense: 2300 },
  { month: "Apr", income: 3700, expense: 2500 },
  { month: "May", income: 3600, expense: 2400 },
  { month: "Jun", income: 3900, expense: 2600 },
  { month: "Jul", income: 4100, expense: 2800 },
  { month: "Aug", income: 4000, expense: 2700 },
  { month: "Sep", income: 3800, expense: 2500 },
  { month: "Oct", income: 3900, expense: 2600 },
  { month: "Nov", income: 4200, expense: 2900 },
  { month: "Dec", income: 4500, expense: 3100 },
]

export function YearlyReport() {
  const [year, setYear] = useState("2023")

  const exportToExcel = () => {
    // Create worksheet
    const worksheet = XLSX.utils.json_to_sheet(yearlyData)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, "Yearly Report")

    // Generate Excel file as array buffer
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" })

    // Convert to Blob
    const blob = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" })

    // Create download link
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `Cash_Track_Yearly_Report_${year}.xlsx`

    // Trigger download
    document.body.appendChild(link)
    link.click()

    // Cleanup
    document.body.removeChild(link)
    URL.revokeObjectURL(url)

    toast({
      title: "Report exported",
      description: `Your yearly report has been exported to Excel.`,
    })
  }

  // Calculate totals
  const totalIncome = yearlyData.reduce((sum, item) => sum + item.income, 0)
  const totalExpense = yearlyData.reduce((sum, item) => sum + item.expense, 0)
  const totalSavings = totalIncome - totalExpense

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <CardTitle>Yearly Report</CardTitle>
            <CardDescription>View and export your yearly financial summary.</CardDescription>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Select value={year} onValueChange={setYear}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Select year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2023">2023</SelectItem>
                <SelectItem value="2022">2022</SelectItem>
                <SelectItem value="2021">2021</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={exportToExcel} className="gap-2">
              <FileSpreadsheet className="h-4 w-4" />
              Export to Excel
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="py-4">
                <CardTitle className="text-sm font-medium">Total Income</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-emerald-600">${totalIncome.toFixed(2)}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="py-4">
                <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-rose-600">${totalExpense.toFixed(2)}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="py-4">
                <CardTitle className="text-sm font-medium">Total Savings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">${totalSavings.toFixed(2)}</div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Monthly Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={yearlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
                    <Legend />
                    <Bar dataKey="income" name="Income" fill="#10b981" />
                    <Bar dataKey="expense" name="Expense" fill="#ef4444" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Month</TableHead>
                  <TableHead className="text-right">Income</TableHead>
                  <TableHead className="text-right">Expense</TableHead>
                  <TableHead className="text-right">Savings</TableHead>
                  <TableHead className="text-right">Savings Rate</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {yearlyData.map((item, index) => {
                  const savings = item.income - item.expense
                  const savingsRate = (savings / item.income) * 100

                  return (
                    <TableRow key={index}>
                      <TableCell>{item.month}</TableCell>
                      <TableCell className="text-right text-emerald-600">${item.income.toFixed(2)}</TableCell>
                      <TableCell className="text-right text-rose-600">${item.expense.toFixed(2)}</TableCell>
                      <TableCell className="text-right font-medium">${savings.toFixed(2)}</TableCell>
                      <TableCell className="text-right">{savingsRate.toFixed(1)}%</TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
