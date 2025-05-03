import { NextResponse } from 'next/server';
import { restrict } from '@/lib/server/auth';
import { prisma } from '@/lib/prisma';
import {
  startOfMonth,
  endOfMonth,
  subMonths,
} from 'date-fns';
import { handleError } from '@/lib/server';

export async function GET() {
  try {
    const user = await restrict();

    const now = new Date();

    const currentMonthStart = startOfMonth(now);
    const currentMonthEnd = endOfMonth(now);

    const previousMonthStart = startOfMonth(subMonths(now, 1));
    const previousMonthEnd = endOfMonth(subMonths(now, 1));

    // Transaksi bulan ini
    const currentMonthTransactions = await prisma.transaction.findMany({
      where: {
        userId: user?.id,
        createdAt: {
          gte: currentMonthStart,
          lte: currentMonthEnd,
        },
      },
    });

    // Transaksi bulan lalu
    const previousMonthTransactions = await prisma.transaction.findMany({
      where: {
        userId: user?.id,
        createdAt: {
          gte: previousMonthStart,
          lte: previousMonthEnd,
        },
      },
    });

    // Semua transaksi (untuk total balance)
    const allTransactions = await prisma.transaction.findMany({
      where: {
        userId: user?.id,
      },
    });

    const sum = (transactions: typeof allTransactions, type: 'INCOME' | 'EXPENSE') =>
      transactions
        .filter(t => t.type === type)
        .reduce((acc, t) => acc + t.amount, 0);

    const totalIncome = sum(allTransactions, 'INCOME');
    const totalExpenses = sum(allTransactions, 'EXPENSE');
    const totalBalance = totalIncome - totalExpenses;

    const currentMonthIncome = sum(currentMonthTransactions, 'INCOME');
    const currentMonthExpenses = sum(currentMonthTransactions, 'EXPENSE');
    const previousMonthIncome = sum(previousMonthTransactions, 'INCOME');
    const previousMonthExpenses = sum(previousMonthTransactions, 'EXPENSE');
    const previousMonthBalance = previousMonthIncome - previousMonthExpenses;

    // Perubahan persen
    const incomeChangePercent = previousMonthIncome === 0
      ? 100
      : ((currentMonthIncome - previousMonthIncome) / previousMonthIncome) * 100;

    const expensesChangePercent = previousMonthExpenses === 0
      ? 0
      : ((currentMonthExpenses - previousMonthExpenses) / previousMonthExpenses) * 100;

    const balanceChangePercent = previousMonthBalance === 0
      ? 100
      : ((totalBalance - previousMonthBalance) / Math.abs(previousMonthBalance)) * 100;

    return NextResponse.json({
      data: {
        totalBalance: {
          amount: totalBalance,
          changePercent: parseFloat(balanceChangePercent.toFixed(1)),
          trend: totalBalance >= previousMonthBalance ? 'up' : 'down',
        },
        income: {
          amount: currentMonthIncome,
          changePercent: parseFloat(incomeChangePercent.toFixed(1)),
          trend: currentMonthIncome >= previousMonthIncome ? 'up' : 'down',
        },
        expenses: {
          amount: currentMonthExpenses,
          changePercent: parseFloat(expensesChangePercent.toFixed(1)),
          trend: currentMonthExpenses >= previousMonthExpenses ? 'up' : 'down',
        }
      }
    });

  } catch (error) {
   return handleError(error);
  }
}
