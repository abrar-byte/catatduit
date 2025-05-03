"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { FileSpreadsheet } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import * as XLSX from "xlsx"
import { PieChart as RePieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

// Mock data for category report
const categoryData = [
  { name: "Food", value: 619.99, type: "EXPENSE" },
  { name: "Utilities", value: 239.99, type: "EXPENSE" },
  { name: "Entertainment", value: 45.0, type: "EXPENSE" },
  { name: "Salary", value: 3500.0, type: "INCOME" },
  { name: "Side Hustle", value: 200.0, type: "INCOME" },
]

const COLORS = ["#10b981", "#0ea5e9", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899"]

export function CategoryReport() {
  const [type, setType] = useState("EXPENSE")

  const filteredData = categoryData.filter((item) => item.type === type)

  const exportToExcel = () => {
    // Create worksheet
    const worksheet = XLSX.utils.json_to_sheet(filteredData)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, "Category Report")

    // Generate Excel file as array buffer
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" })

    // Convert to Blob
    const blob = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" })

    // Create download link
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `Cash_Track_Category_Report_${type}.xlsx`

    // Trigger download
    document.body.appendChild(link)
    link.click()

    // Cleanup
    document.body.removeChild(link)
    URL.revokeObjectURL(url)

    toast({
      title: "Report exported",
      description: `Your category report has been exported to Excel.`,
    })
  }

  // Calculate total
  const total = filteredData.reduce((sum, item) => sum + item.value, 0)

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <CardTitle>Category Report</CardTitle>
            <CardDescription>View and export your spending by category.</CardDescription>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Select value={type} onValueChange={setType}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="INCOME">Income</SelectItem>
                <SelectItem value="EXPENSE">Expense</SelectItem>
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
          <Card>
            <CardHeader className="py-4">
              <CardTitle className="text-sm font-medium">
                Total {type === "INCOME" ? "Income" : "Expenses"} by Category
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-4">${total.toFixed(2)}</div>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RePieChart>
                    <Pie
                      data={filteredData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {filteredData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
                    <Legend />
                  </RePieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Category</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead className="text-right">Percentage</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((category, index) => (
                  <TableRow key={index}>
                    <TableCell>{category.name}</TableCell>
                    <TableCell>
                      <Badge variant={category.type === "INCOME" ? "success" : "destructive"}>{category.type}</Badge>
                    </TableCell>
                    <TableCell className="text-right font-medium">${category.value.toFixed(2)}</TableCell>
                    <TableCell className="text-right">{((category.value / total) * 100).toFixed(1)}%</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
