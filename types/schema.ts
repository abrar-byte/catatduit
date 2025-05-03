// Types based on the Prisma schema

export type TransactionType = "INCOME" | "EXPENSE"

export interface User {
  id: string
  name: string
  email: string
  createdAt: string
  updatedAt: string
  transactions: Transaction[]
  categories: Category[]
}

export interface Category {
  id: string
  name: string
  type: TransactionType
  userId: string
  user?: User
  transactions?: Transaction[]
  createdAt: string
  updatedAt: string
}

export interface Transaction {
  id: string
  type: TransactionType
  amount: number
  description?: string
  date: string
  userId: string
  user?: User
  categoryId: string
  category?: Category
  createdAt: string
  updatedAt: string
}
