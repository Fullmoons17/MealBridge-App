"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { useLanguage } from "@/lib/language-context"

export function DonorHistory() {
  const router = useRouter()
  const { t } = useLanguage()

  const allDonations = [
    {
      id: 1,
      food: "Pizza Slices (20)",
      date: "2024-01-15",
      status: "Picked Up",
      recipient: "Hope Center",
      impact: "20 meals",
    },
    {
      id: 2,
      food: "Sandwiches (15)",
      date: "2024-01-14",
      status: "Picked Up",
      recipient: "City Mission",
      impact: "15 meals",
    },
    {
      id: 3,
      food: "Salad Bowls (10)",
      date: "2024-01-13",
      status: "Picked Up",
      recipient: "Food Bank",
      impact: "10 meals",
    },
    { id: 4, food: "Pasta Dishes (25)", date: "2024-01-12", status: "Expired", recipient: "-", impact: "-" },
    {
      id: 5,
      food: "Baked Goods (30)",
      date: "2024-01-11",
      status: "Picked Up",
      recipient: "Hope Center",
      impact: "30 meals",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-[#681123] text-white p-2.5 shadow-md">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/10 h-8 w-8 p-0"
              onClick={() => router.push("/donor/dashboard")}
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <h1 className="text-sm font-bold">{t("donationHistory")}</h1>
          </div>
          <Image src="/mealbridge-logo.png" alt="MealBridge" width={28} height={28} />
        </div>
      </header>

      <div className="container mx-auto p-3 max-w-4xl">
        <Card className="p-3">
          <h2 className="text-sm font-bold mb-3">{t("allDonations")}</h2>
          <div className="space-y-2">
            {allDonations.map((donation) => (
              <div
                key={donation.id}
                className="flex items-center justify-between p-2.5 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex-1">
                  <p className="font-semibold text-xs">{donation.food}</p>
                  <p className="text-[10px] text-gray-600">{donation.date}</p>
                  {donation.recipient !== "-" && (
                    <p className="text-[10px] text-gray-600">
                      {t("recipient")}: {donation.recipient}
                    </p>
                  )}
                </div>
                <div className="text-right">
                  <span
                    className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-medium ${
                      donation.status === "Picked Up"
                        ? "bg-green-100 text-green-800"
                        : donation.status === "Expired"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {donation.status === "Picked Up"
                      ? t("pickedUp")
                      : donation.status === "Expired"
                        ? t("expired")
                        : donation.status}
                  </span>
                  {donation.impact !== "-" && (
                    <p className="text-[10px] text-gray-600 mt-1">
                      {t("impact")}: {donation.impact}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
