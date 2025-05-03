"use client"

import type React from "react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react"
import { cn, formatToIDR } from "@/lib/utils"
import { useApiList } from "@/services/query/client"

const transactions = [
  {
    id: "1",
    amount: 499.99,
    type: "EXPENSE",
    description: "Grocery Shopping",
    category: "Food",
    date: "2023-04-01T12:00:00Z",
  },
  {
    id: "2",
    amount: 2500.0,
    type: "INCOME",
    description: "Salary",
    category: "Salary",
    date: "2023-04-01T12:00:00Z",
  },
  {
    id: "3",
    amount: 150.0,
    type: "EXPENSE",
    description: "Electricity Bill",
    category: "Utilities",
    date: "2023-04-02T12:00:00Z",
  },
  {
    id: "4",
    amount: 45.0,
    type: "EXPENSE",
    description: "Movie Tickets",
    category: "Entertainment",
    date: "2023-04-03T12:00:00Z",
  },
  {
    id: "5",
    amount: 200.0,
    type: "INCOME",
    description: "Freelance Work",
    category: "Side Hustle",
    date: "2023-04-04T12:00:00Z",
  },
]

interface RecentTransactionsProps extends React.HTMLAttributes<HTMLDivElement> {}

export function RecentTransactions({ className, ...props }: RecentTransactionsProps) {
  const { data: transactionsData, isPending } = useApiList("transaction", {
    queryParams: {
     sort: "-createdAt",
     take:10
    },
  });
  if(isPending){
    return <div>Loading...</div>
  }
  return (
    <Card className={className} {...props}>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
        <CardDescription>Your latest financial activities</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {!!transactionsData?.data?.length && transactionsData?.data.map((transaction) => (
            <div key={transaction.id} className="flex items-center">
              <Avatar className="h-9 w-9">
                <AvatarFallback
                  className={cn(
                    transaction.type === "INCOME" ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700",
                  )}
                >
                  {transaction.type === "INCOME" ? (
                    <ArrowUpIcon className="h-4 w-4" />
                  ) : (
                    <ArrowDownIcon className="h-4 w-4" />
                  )}
                </AvatarFallback>
              </Avatar>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">{transaction?.description}</p>
                <p className="text-sm text-muted-foreground">{transaction.category.name}</p>
              </div>
              <div className="ml-auto font-medium">
                <span className={cn(transaction.type === "INCOME" ? "text-emerald-600" : "text-rose-600")}>
                  {transaction.type === "INCOME" ? "+" : "-"}{formatToIDR(transaction.amount)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
