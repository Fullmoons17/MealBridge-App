"use client"

import { Home, Plus, History, User, Package, Search } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/lib/language-context"

interface MobileBottomNavProps {
  role: "donor" | "recipient" | "admin"
}

export function MobileBottomNav({ role }: MobileBottomNavProps) {
  const pathname = usePathname()
  const router = useRouter()
  const { t } = useLanguage()

  const donorTabs = [
    { icon: Home, label: t("home"), path: "/donor/dashboard" },
    { icon: Plus, label: t("create"), path: "/donor/create-donation" },
    { icon: History, label: t("history"), path: "/donor/history" },
    { icon: User, label: t("account"), path: "/donor/account" },
  ]

  const recipientTabs = [
    { icon: Search, label: t("browse"), path: "/recipient/dashboard" },
    { icon: Package, label: t("claimed"), path: "/recipient/claimed" },
    { icon: User, label: t("account"), path: "/recipient/account" },
  ]

  const adminTabs = [
    { icon: Home, label: t("dashboard"), path: "/admin/dashboard" },
    { icon: User, label: t("account"), path: "/admin/account" },
  ]

  const tabs = role === "donor" ? donorTabs : role === "recipient" ? recipientTabs : adminTabs

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 pb-safe z-50">
      <div className="flex justify-around items-center h-14 px-2">
        {tabs.map((tab) => {
          const isActive = pathname === tab.path
          return (
            <button
              key={tab.path}
              onClick={() => router.push(tab.path)}
              className={cn(
                "flex flex-col items-center justify-center flex-1 h-full gap-0.5 transition-colors",
                isActive ? "text-[#681123]" : "text-gray-500",
              )}
            >
              <tab.icon className={cn("w-5 h-5", isActive && "stroke-[2.5]")} />
              <span className={cn("text-[10px]", isActive && "font-semibold")}>{tab.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
