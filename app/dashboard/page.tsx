import { DashboardCards } from "@/components/dashboard-cards"
import { RecentTransactions } from "@/components/recent-transactions"
import { TransactionChart } from "@/components/transaction-chart"
import { createClient } from "@/lib/supabase/server"

export default async function DashboardPage() {
  const supabase=await createClient()
  const { data:{session}, error } = await supabase.auth.getSession();
  console.log("session",session);
  
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
