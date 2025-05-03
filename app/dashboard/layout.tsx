import type React from "react"
import { DashboardNav } from "@/components/dashboard-nav"
import { UserNav } from "@/components/user-nav"
import { MobileNav } from "@/components/mobile-nav"
import Link from "next/link"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 hidden md:flex">
            <Link href="/dashboard" className="mr-6 flex items-center space-x-2">
              <span className="font-bold">Cash Track</span>
            </Link>
            <nav className="flex items-center space-x-6 text-sm font-medium">
              <Link href="/dashboard" className="transition-colors hover:text-foreground/80">
                Dashboard
              </Link>
              <Link href="/dashboard/transactions" className="transition-colors hover:text-foreground/80">
                Transactions
              </Link>
              <Link href="/dashboard/categories" className="transition-colors hover:text-foreground/80">
                Categories
              </Link>
              <Link href="/dashboard/reports" className="transition-colors hover:text-foreground/80">
                Reports
              </Link>
            </nav>
          </div>
          {/* Mobile Logo and Menu */}
          <div className="flex md:hidden">
            <Link href="/dashboard" className="flex items-center space-x-2">
              <span className="font-bold">Cash Track</span>
            </Link>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <MobileNav />
            <UserNav />
          </div>
        </div>
      </header>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        </div>
        <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
          <aside className="md:w-1/5 hidden md:block">
            <DashboardNav />
          </aside>
          <main className="flex flex-1 flex-col overflow-hidden rounded-lg border">{children}</main>
        </div>
      </div>
    </div>
  )
}
