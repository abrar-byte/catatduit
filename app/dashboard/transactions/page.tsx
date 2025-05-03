import { TransactionList } from "@/components/transaction-list"
import { TransactionFilters } from "@/components/transaction-filters"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { AddTransactionDialog } from "@/components/add-transaction-dialog"

export default function TransactionsPage() {
  return (
    <div className="flex flex-col space-y-4 p-4 md:p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Transactions</h2>
        <AddTransactionDialog>
          <Button size="sm">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Transaction
          </Button>
        </AddTransactionDialog>
      </div>
      <TransactionFilters />
      <TransactionList />
    </div>
  )
}
