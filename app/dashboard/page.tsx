import { DashboardCards } from "@/components/dashboard-cards"
import { RecentTransactions } from "@/components/recent-transactions"
import { TransactionChart } from "@/components/transaction-chart"


export default  function DashboardPage() {
  
  
  return (
    <div className="flex flex-col space-y-4 p-4 md:p-8">
      <DashboardCards />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <TransactionChart className="lg:col-span-4" />
        <RecentTransactions className="lg:col-span-3" />
      </div>
    </div>
  )
}
