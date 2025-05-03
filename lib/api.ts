// This is a mock API client for demonstration purposes
// In a real app, you would use TanStack Query with actual API endpoints

import type { TransactionType } from "@/types/schema"

// Mock user ID
export const MOCK_USER_ID = "user123"

// Mock categories
export const categories = [
  {
    id: "1",
    name: "Food",
    type: "EXPENSE" as TransactionType,
    userId: MOCK_USER_ID,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Utilities",
    type: "EXPENSE" as TransactionType,
    userId: MOCK_USER_ID,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "3",
    name: "Entertainment",
    type: "EXPENSE" as TransactionType,
    userId: MOCK_USER_ID,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "4",
    name: "Salary",
    type: "INCOME" as TransactionType,
    userId: MOCK_USER_ID,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "5",
    name: "Side Hustle",
    type: "INCOME" as TransactionType,
    userId: MOCK_USER_ID,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

// Mock transactions
export const transactions = [
  {
    id: "1",
    amount: 499.99,
    type: "EXPENSE" as TransactionType,
    description: "Grocery Shopping",
    date: new Date("2023-04-01").toISOString(),
    userId: MOCK_USER_ID,
    categoryId: "1",
    category: categories.find((c) => c.id === "1"),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    amount: 2500.0,
    type: "INCOME" as TransactionType,
    description: "Salary",
    date: new Date("2023-04-01").toISOString(),
    userId: MOCK_USER_ID,
    categoryId: "4",
    category: categories.find((c) => c.id === "4"),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "3",
    amount: 150.0,
    type: "EXPENSE" as TransactionType,
    description: "Electricity Bill",
    date: new Date("2023-04-02").toISOString(),
    userId: MOCK_USER_ID,
    categoryId: "2",
    category: categories.find((c) => c.id === "2"),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

// API functions
export async function getTransactions() {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  return transactions
}

export async function getCategories() {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  return categories
}

export async function createTransaction(data: any) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  return {
    id: Math.random().toString(36).substring(7),
    ...data,
    userId: MOCK_USER_ID,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
}

export async function createCategory(data: any) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  return {
    id: Math.random().toString(36).substring(7),
    ...data,
    userId: MOCK_USER_ID,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
}
