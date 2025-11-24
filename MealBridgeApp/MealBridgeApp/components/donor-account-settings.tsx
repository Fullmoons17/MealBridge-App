"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Save, Building2, Mail, Phone, MapPin } from 'lucide-react'
import Image from "next/image"
import { useRouter } from 'next/navigation'

export function DonorAccountSettings() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    businessName: "Pizza Palace",
    contactName: "John Smith",
    email: "donor@example.com",
    phone: "(555) 123-4567",
    address: "123 Main Street, City, State 12345",
    businessType: "Restaurant",
    description: "Italian restaurant specializing in pizza and pasta",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSave = () => {
    localStorage.setItem("userName", formData.businessName)
    alert("Account settings saved successfully!")
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <header className="bg-[#681123] text-white p-3 shadow-md sticky top-0 z-40">
        <div className="flex items-center justify-between max-w-2xl mx-auto">
          <div className="flex items-center gap-2">
            <Image src="/mealbridge-logo.png" alt="MealBridge" width={28} height={28} className="rounded-lg" />
            <h1 className="text-sm font-bold">Account Settings</h1>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/10 h-8 w-8 p-0"
            onClick={() => router.push("/donor/dashboard")}
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </div>
      </header>

      <div className="p-3 max-w-2xl mx-auto">
        <Card className="p-4">
          <div className="space-y-3">
            <div>
              <Label htmlFor="businessName" className="flex items-center gap-1.5 mb-1 text-xs">
                <Building2 className="w-3 h-3" />
                Business Name
              </Label>
              <Input
                id="businessName"
                name="businessName"
                value={formData.businessName}
                onChange={handleChange}
                placeholder="Your business name"
                className="text-xs h-9"
              />
            </div>

            <div>
              <Label htmlFor="contactName" className="mb-1 block text-xs">
                Contact Person Name
              </Label>
              <Input
                id="contactName"
                name="contactName"
                value={formData.contactName}
                onChange={handleChange}
                placeholder="Primary contact name"
                className="text-xs h-9"
              />
            </div>

            <div>
              <Label htmlFor="email" className="flex items-center gap-1.5 mb-1 text-xs">
                <Mail className="w-3 h-3" />
                Email Address
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                className="text-xs h-9"
              />
            </div>

            <div>
              <Label htmlFor="phone" className="flex items-center gap-1.5 mb-1 text-xs">
                <Phone className="w-3 h-3" />
                Phone Number
              </Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="(555) 000-0000"
                className="text-xs h-9"
              />
            </div>

            <div>
              <Label htmlFor="address" className="flex items-center gap-1.5 mb-1 text-xs">
                <MapPin className="w-3 h-3" />
                Business Address
              </Label>
              <Input
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Full address"
                className="text-xs h-9"
              />
            </div>

            <div>
              <Label htmlFor="businessType" className="mb-1 block text-xs">
                Business Type
              </Label>
              <Input
                id="businessType"
                name="businessType"
                value={formData.businessType}
                onChange={handleChange}
                placeholder="e.g., Restaurant, Catering, Grocery"
                className="text-xs h-9"
              />
            </div>

            <div>
              <Label htmlFor="description" className="mb-1 block text-xs">
                Business Description
              </Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Tell recipients about your business"
                rows={3}
                className="text-xs"
              />
            </div>

            <div className="flex gap-2 pt-2">
              <Button onClick={handleSave} className="bg-[#681123] hover:bg-[#4A0D1A] flex-1 text-xs h-9">
                <Save className="w-3.5 h-3.5 mr-1.5" />
                Save Changes
              </Button>
              <Button variant="outline" onClick={() => router.push("/donor/dashboard")} className="flex-1 text-xs h-9">
                Cancel
              </Button>
            </div>
          </div>
        </Card>

        <Card className="p-4 mt-3">
          <h3 className="text-sm font-semibold mb-2">Account Actions</h3>
          <div className="space-y-2">
            <Button variant="outline" className="w-full justify-start text-xs h-8 bg-transparent">
              Change Password
            </Button>
            <Button variant="outline" className="w-full justify-start text-xs h-8 bg-transparent">
              Download My Data
            </Button>
            <Button variant="destructive" className="w-full justify-start text-xs h-8">
              Delete Account
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
