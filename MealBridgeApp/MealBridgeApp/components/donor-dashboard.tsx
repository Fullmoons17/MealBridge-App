"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Plus, MapPin, Package, Utensils, LogOut } from 'lucide-react'
import Image from "next/image"
import { useRouter } from 'next/navigation'
import { useLanguage } from "@/lib/language-context"
import { LanguageSwitcher } from "./language-switcher"
import { MobileBottomNav } from "./mobile-bottom-nav"

export function DonorDashboard() {
  const router = useRouter()
  const [userName, setUserName] = useState("User")
  const { t } = useLanguage()

  useEffect(() => {
    const name = localStorage.getItem("userName") || "User"
    setUserName(name)
  }, [])

  const recentDonations = [
    { id: 1, food: "Pizza Slices (20)", date: "2024-01-15", status: "Picked Up", recipient: "Hope Center" },
    { id: 2, food: "Sandwiches (15)", date: "2024-01-14", status: "Claimed", recipient: "City Mission" },
    { id: 3, food: "Salad Bowls (10)", date: "2024-01-13", status: "Available", recipient: "-" },
  ]

  const stats = [
    { label: t("totalDonations"), value: "47", icon: Package },
    { label: t("mealsShared"), value: "623", icon: Utensils },
    { label: t("activeListings"), value: "3", icon: MapPin },
  ]

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <header className="bg-[#681123] text-white sticky top-0 z-40 shadow-md">
        <div className="flex items-center justify-between p-3">
          <div className="flex items-center gap-2">
            <Image src="/mealbridge-logo.png" alt="MealBridge" width={28} height={28} className="rounded-lg" />
            <div>
              <h1 className="text-sm font-bold">MealBridge</h1>
              <p className="text-[10px] text-white/80">
                {t("hello")}, {userName}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <LanguageSwitcher />
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/10 h-8 w-8 p-0"
              onClick={() => router.push("/")}
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="p-3 space-y-4 max-w-2xl mx-auto">
        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-2">
          {stats.map((stat, index) => (
            <Card key={index} className="p-3 text-center">
              <stat.icon className="w-4 h-4 text-[#681123] mx-auto mb-1" />
              <p className="text-xl font-bold text-[#681123]">{stat.value}</p>
              <p className="text-[10px] text-gray-600 mt-0.5">{stat.label}</p>
            </Card>
          ))}
        </div>

        {/* Quick Action Card */}
        <Card
          className="p-4 bg-gradient-to-br from-[#681123] to-[#4A0D1A] text-white cursor-pointer active:scale-95 transition-transform"
          onClick={() => router.push("/donor/create-donation")}
        >
          <div className="flex items-center gap-3">
            <div className="bg-white/20 backdrop-blur-sm p-2.5 rounded-full">
              <Plus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base">{t("createNewDonation")}</h3>
              <p className="text-xs text-white/80 mt-0.5">{t("createDonationDesc")}</p>
            </div>
          </div>
        </Card>

        {/* Recent Donations */}
        <div>
          <h3 className="text-sm font-bold mb-2 px-1">{t("recentDonations")}</h3>
          <div className="space-y-2">
            {recentDonations.map((donation) => (
              <Card key={donation.id} className="p-3">
                <div className="flex justify-between items-start mb-1.5">
                  <div>
                    <p className="font-semibold text-sm">{donation.food}</p>
                    <p className="text-xs text-gray-500">{donation.date}</p>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                      donation.status === "Picked Up"
                        ? "bg-green-100 text-green-800"
                        : donation.status === "Claimed"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {donation.status === "Picked Up"
                      ? t("pickedUp")
                      : donation.status === "Claimed"
                        ? t("claimed")
                        : t("available")}
                  </span>
                </div>
                {donation.recipient !== "-" && <p className="text-xs text-gray-600">{donation.recipient}</p>}
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav role="donor" />
    </div>
  )
}
