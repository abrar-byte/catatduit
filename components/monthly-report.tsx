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

// Mock data for monthly report
const monthlyTransactions = [
  {
    id: "1",
    date: "2023-04-01",
    description: "Grocery Shopping",
    category: "Food",
    type: "EXPENSE",
    amount: 499.99,
  },
  {
    id: "2",
    date: "2023-04-01",
    description: "Salary",
    category: "Salary",
    type: "INCOME",
    amount: 2500.0,
  },
  {
    id: "3",
    date: "2023-04-02",
    description: "Electricity Bill",
    category: "Utilities",
    type: "EXPENSE",
    amount: 150.0,
  },
  {
    id: "4",
    date: "2023-04-03",
    description: "Movie Tickets",
    category: "Entertainment",
    type: "EXPENSE",
    amount: 45.0,
  },
  {
    id: "5",
    date: "2023-04-04",
    description: "Freelance Work",
    category: "Side Hustle",
    type: "INCOME",
    amount: 200.0,
  },
  {
    id: "6",
    date: "2023-04-05",
    description: "Internet Bill",
    category: "Utilities",
    type: "EXPENSE",
    amount: 89.99,
  },
  {
    id: "7",
    date: "2023-04-06",
    description: "Dinner",
    category: "Food",
    type: "EXPENSE",
    amount: 120.0,
  },
  {
    id: "8",
    date: "2023-04-07",
    description: "Bonus",
    category: "Salary",
    type: "INCOME",
    amount: 1000.0,
  },
]

export function MonthlyReport() {
  const [month, setMonth] = useState("april")
  const [year, setYear] = useState("2023")

  const exportToExcel = () => {
    // Create worksheet
    const worksheet = XLSX.utils.json_to_sheet(monthlyTransactions)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, "Monthly Report")

    // Generate Excel file as array buffer
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" })

    // Convert to Blob
    const blob = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" })

    // Create download link
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `Cash_Track_Report_${month}_${year}.xlsx`

    // Trigger download
    document.body.appendChild(link)
    link.click()

    // Cleanup
    document.body.removeChild(link)
    URL.revokeObjectURL(url)

    toast({
      title: "Report exported",
      description: `Your report has been exported to Excel.`,
    })
  }

  // Calculate summary
  const totalIncome = monthlyTransactions.filter((t) => t.type === "INCOME").reduce((sum, t) => sum + t.amount, 0)

  const totalExpense = monthlyTransactions.filter((t) => t.type === "EXPENSE").reduce((sum, t) => sum + t.amount, 0)

  const balance = totalIncome - totalExpense

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <CardTitle>Monthly Report</CardTitle>
            <CardDescription>View and export your monthly financial report.</CardDescription>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Select value={month} onValueChange={setMonth}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select month" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="january">January</SelectItem>
                <SelectItem value="february">February</SelectItem>
                <SelectItem value="march">March</SelectItem>
                <SelectItem value="april">April</SelectItem>
                <SelectItem value="may">May</SelectItem>
                <SelectItem value="june">June</SelectItem>
                <SelectItem value="july">July</SelectItem>
                <SelectItem value="august">August</SelectItem>
                <SelectItem value="september">September</SelectItem>
                <SelectItem value="october">October</SelectItem>
                <SelectItem value="november">November</SelectItem>
                <SelectItem value="december">December</SelectItem>
              </SelectContent>
            </Select>
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
                <CardTitle className="text-sm font-medium">Balance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${balance >= 0 ? "text-emerald-600" : "text-rose-600"}`}>
                  ${balance.toFixed(2)}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {monthlyTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>{transaction.date}</TableCell>
                    <TableCell>{transaction.description}</TableCell>
                    <TableCell>{transaction.category}</TableCell>
                    <TableCell>
                      <Badge variant={transaction.type === "INCOME" ? "success" : "destructive"}>
                        {transaction.type}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      <span className={transaction.type === "INCOME" ? "text-emerald-600" : "text-rose-600"}>
                        {transaction.type === "INCOME" ? "+" : "-"}${transaction.amount.toFixed(2)}
                      </span>
                    </TableCell>
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
