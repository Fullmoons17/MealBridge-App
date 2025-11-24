"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useRouter } from 'next/navigation'
import { useLanguage } from "@/lib/language-context"

export function RegisterForm() {
  const router = useRouter()
  const { t } = useLanguage()
  const [role, setRole] = useState("donor")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    organization: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Store role in localStorage for demo
    localStorage.setItem("userRole", role)
    localStorage.setItem("userName", formData.name)

    // Redirect based on role
    if (role === "donor") {
      router.push("/donor/dashboard")
    } else if (role === "recipient") {
      router.push("/recipient/dashboard")
    } else {
      router.push("/admin/dashboard")
    }
  }

  const handleGoogleSignup = () => {
    console.log("[v0] Google signup clicked")
    localStorage.setItem("userRole", role)
    localStorage.setItem("userName", "Google User")
    if (role === "donor") {
      router.push("/donor/dashboard")
    } else if (role === "recipient") {
      router.push("/recipient/dashboard")
    } else {
      router.push("/admin/dashboard")
    }
  }

  const handleAppleSignup = () => {
    console.log("[v0] Apple signup clicked")
    localStorage.setItem("userRole", role)
    localStorage.setItem("userName", "Apple User")
    if (role === "donor") {
      router.push("/donor/dashboard")
    } else if (role === "recipient") {
      router.push("/recipient/dashboard")
    } else {
      router.push("/admin/dashboard")
    }
  }

  return (
    <div className="space-y-2.5">
      <div className="space-y-2">
        <Button
          type="button"
          variant="outline"
          className="w-full h-9 text-xs flex items-center justify-center gap-2"
          onClick={handleGoogleSignup}
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          {t("continueWithGoogle")}
        </Button>
        
        <Button
          type="button"
          variant="outline"
          className="w-full h-9 text-xs flex items-center justify-center gap-2"
          onClick={handleAppleSignup}
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
            <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
          </svg>
          {t("continueWithApple")}
        </Button>
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-[10px] uppercase">
          <span className="bg-white px-2 text-gray-500">{t("orContinueWith")}</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-2.5">
        <div>
          <Label htmlFor="name" className="text-xs">{t("fullName")}</Label>
          <Input
            id="name"
            type="text"
            placeholder={t("fullName")}
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="h-9 text-xs"
          />
        </div>

        <div>
          <Label htmlFor="email" className="text-xs">{t("email")}</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="h-9 text-xs"
          />
        </div>

        <div>
          <Label htmlFor="phone" className="text-xs">{t("phone")}</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="+966 50 000 0000"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="h-9 text-xs"
          />
        </div>

        <div>
          <Label htmlFor="password" className="text-xs">{t("newPassword")}</Label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            required
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="h-9 text-xs"
          />
        </div>

        <div>
          <Label className="text-xs">I am a:</Label>
          <RadioGroup value={role} onValueChange={setRole} className="mt-1.5 space-y-1">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="donor" id="donor" className="h-3.5 w-3.5" />
              <Label htmlFor="donor" className="font-normal cursor-pointer text-xs">
                {t("donorRole")}
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="recipient" id="recipient" className="h-3.5 w-3.5" />
              <Label htmlFor="recipient" className="font-normal cursor-pointer text-xs">
                {t("recipientRole")}
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="admin" id="admin" className="h-3.5 w-3.5" />
              <Label htmlFor="admin" className="font-normal cursor-pointer text-xs">
                {t("adminRole")}
              </Label>
            </div>
          </RadioGroup>
        </div>

        {(role === "donor" || role === "recipient") && (
          <div>
            <Label htmlFor="organization" className="text-xs">{t("organizationName")}</Label>
            <Input
              id="organization"
              type="text"
              placeholder="Your Organization Name"
              value={formData.organization}
              onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
              className="h-9 text-xs"
            />
          </div>
        )}

        <Button type="submit" className="w-full bg-[#681123] hover:bg-[#4A0D1A] h-9 text-xs">
          {t("register")}
        </Button>
      </form>
    </div>
  )
}
