"use client"

import { Button } from "@/components/ui/button"
import { Languages } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  return (
    <Button
      variant="ghost"
      size="sm"
      className="text-white hover:bg-white/10"
      onClick={() => setLanguage(language === "en" ? "ar" : "en")}
    >
      <Languages className="w-4 h-4 mr-1" />
      {language === "en" ? "العربية" : "English"}
    </Button>
  )
}
