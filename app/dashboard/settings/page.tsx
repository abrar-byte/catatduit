import { SettingsTabs } from "@/components/settings-tabs"

export default function SettingsPage() {
  return (
    <div className="flex flex-col space-y-4 p-4 md:p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
      </div>
      <div className="space-y-4">
        <SettingsTabs />
      </div>
    </div>
  )
}
