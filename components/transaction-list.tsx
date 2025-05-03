"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { formatDate, formatToIDR } from "@/lib/utils";
import { useApiList } from "@/services/query/client";
import { useSearchParams } from "next/navigation";

// Mock data
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
  {
    id: "6",
    amount: 89.99,
    type: "EXPENSE",
    description: "Internet Bill",
    category: "Utilities",
    date: "2023-04-05T12:00:00Z",
  },
  {
    id: "7",
    amount: 120.0,
    type: "EXPENSE",
    description: "Dinner",
    category: "Food",
    date: "2023-04-06T12:00:00Z",
  },
  {
    id: "8",
    amount: 1000.0,
    type: "INCOME",
    description: "Bonus",
    category: "Salary",
    date: "2023-04-07T12:00:00Z",
  },
];

export function TransactionList() {
  const searchParams = useSearchParams();

  const [data, setData] = useState(transactions);
  const type = searchParams?.get("type") || "";
  const startDate = searchParams?.get("startDate") || "";
  const endDate = searchParams?.get("endDate") || "";
  const categoryId = searchParams?.get("categoryId") || "";
  const minAmount = searchParams?.get("minAmount") || "";
  const maxAmount = searchParams?.get("maxAmount") || "";
console.log("minAmount",minAmount);

  const { data: transactionsData, isPending } = useApiList("transaction", {
    queryParams: {
      ...(type && { type }),
      ...(startDate && {createdAt:{ gte: new Date(startDate)} }),
      ...(endDate && {createdAt: {lte: new Date(endDate)} }),
      ...(categoryId && { categoryId }),
      ...(minAmount && {amount:{ gte: parseFloat(minAmount)} }),
      ...(maxAmount && {amount:{ lte: parseFloat(maxAmount)} }),
    },
  });

  const handleDelete = (id: string) => {
    setData(data.filter((transaction) => transaction.id !== id));
  };

  if (isPending) {
    return <div>Loading...</div>;
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Type</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead className="w-[70px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!!transactionsData?.data?.length &&
            transactionsData?.data?.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>{formatDate(transaction.date)}</TableCell>
                <TableCell>{transaction.description}</TableCell>
                <TableCell>{transaction.category?.name}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      transaction.type === "INCOME" ? "success" : "destructive"
                    }
                  >
                    {transaction.type}
                  </Badge>
                </TableCell>
                <TableCell className="text-right font-medium">
                  <span
                    className={
                      transaction.type === "INCOME"
                        ? "text-emerald-600"
                        : "text-rose-600"
                    }
                  >
                    {transaction.type === "INCOME" ? "+" : "-"}
                    {formatToIDR(transaction.amount)} 
                  </span>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => handleDelete(transaction.id)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
