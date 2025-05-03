"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProfileSettings } from "@/components/profile-settings"
import { AccountSettings } from "@/components/account-settings"
import { AppearanceSettings } from "@/components/appearance-settings"

export function SettingsTabs() {
  return (
    <Tabs defaultValue="profile" className="w-full">
      <TabsList className="grid w-full grid-cols-3 mb-8">
        <TabsTrigger value="profile">Profile</TabsTrigger>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="appearance">Appearance</TabsTrigger>
      </TabsList>
      <TabsContent value="profile">
        <ProfileSettings />
      </TabsContent>
      <TabsContent value="account">
        <AccountSettings />
      </TabsContent>
      <TabsContent value="appearance">
        <AppearanceSettings />
      </TabsContent>
    </Tabs>
  )
}
