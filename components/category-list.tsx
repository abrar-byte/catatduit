"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react"
import { useApiList } from "@/services/query/client"

// Mock data
const categories = [
  {
    id: "1",
    name: "Food",
    type: "EXPENSE",
  },
  {
    id: "2",
    name: "Utilities",
    type: "EXPENSE",
  },
  {
    id: "3",
    name: "Entertainment",
    type: "EXPENSE",
  },
  {
    id: "4",
    name: "Salary",
    type: "INCOME",
  },
  {
    id: "5",
    name: "Side Hustle",
    type: "INCOME",
  },
  {
    id: "6",
    name: "Transportation",
    type: "EXPENSE",
  },
  {
    id: "7",
    name: "Housing",
    type: "EXPENSE",
  },
  {
    id: "8",
    name: "Investments",
    type: "INCOME",
  },
]

export function CategoryList() {
  const [data, setData] = useState(categories)

    const { data: categoryData, isPending } = useApiList('category',{
      queryParams:{
        sort: "-createdAt"
      }
    })

  const handleDelete = (id: string) => {
    setData(data.filter((category) => category.id !== id))
  }

  if(isPending) {
    return <div>Loading...</div>
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead className="w-[70px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!!categoryData?.data && categoryData?.data.map((category) => (
            <TableRow key={category.id}>
              <TableCell className="font-medium">{category.name}</TableCell>
              <TableCell>
                <Badge variant={category.type === "INCOME" ? "success" : "destructive"}>{category.type}</Badge>
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
                    <DropdownMenuItem onClick={() => handleDelete(category.id)}>
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
  )
}
