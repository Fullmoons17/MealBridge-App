"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Utensils, HandHeart, BarChart3 } from 'lucide-react'
import { useLanguage } from "@/lib/language-context"
import { LanguageSwitcher } from "@/components/language-switcher"

export default function LandingPage() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#681123] to-[#4A0D1A] text-white">
      <div className="absolute top-2 right-2">
        <LanguageSwitcher />
      </div>

      <div className="container mx-auto px-3 py-4 flex flex-col items-center justify-center min-h-screen">
        <div className="text-center space-y-4 max-w-2xl">
          <Image src="/mealbridge-logo.png" alt="MealBridge Logo" width={120} height={120} className="mx-auto" />

          <h1 className="text-2xl md:text-3xl font-bold text-balance">{t("landingTitle")}</h1>

          <p className="text-sm md:text-base text-white/90 text-balance">{t("landingSubtitle")}</p>

          <p className="text-xs md:text-sm text-white/80">{t("landingDescription")}</p>

          <div className="flex flex-col sm:flex-row gap-2 justify-center pt-2">
            <Button asChild size="sm" className="bg-white text-[#681123] hover:bg-white/90 text-sm px-6 h-9">
              <Link href="/register">{t("getStarted")}</Link>
            </Button>
            <Button
              asChild
              size="sm"
              variant="outline"
              className="border-white text-white hover:bg-white/10 text-sm px-6 bg-transparent h-9"
            >
              <Link href="/login">{t("login")}</Link>
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2">
              <Utensils className="w-6 h-6 mx-auto mb-1" />
              <h3 className="font-semibold text-xs mb-0.5">{t("donorRole")}</h3>
              <p className="text-[10px] leading-tight text-white/80">{t("donorDesc")}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2">
              <HandHeart className="w-6 h-6 mx-auto mb-1" />
              <h3 className="font-semibold text-xs mb-0.5">{t("recipientRole")}</h3>
              <p className="text-[10px] leading-tight text-white/80">{t("recipientDesc")}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2">
              <BarChart3 className="w-6 h-6 mx-auto mb-1" />
              <h3 className="font-semibold text-xs mb-0.5">{t("adminRole")}</h3>
              <p className="text-[10px] leading-tight text-white/80">{t("adminDesc")}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
