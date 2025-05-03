import { ReportsTabs } from "@/components/reports-tabs"

export default function ReportsPage() {
  return (
    <div className="flex flex-col space-y-4 p-4 md:p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Reports</h2>
      </div>
      <div className="space-y-4">
        <ReportsTabs />
      </div>
    </div>
  )
}
