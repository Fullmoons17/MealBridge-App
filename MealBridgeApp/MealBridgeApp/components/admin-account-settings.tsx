"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Save, Mail, UserIcon, Shield } from 'lucide-react'
import Image from "next/image"
import { useRouter } from 'next/navigation'

export function AdminAccountSettings() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    fullName: "Admin User",
    email: "admin@mealbridge.com",
    username: "admin",
    role: "System Administrator",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSave = () => {
    alert("Admin account settings saved successfully!")
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <header className="bg-[#681123] text-white p-3 shadow-md sticky top-0 z-40">
        <div className="flex items-center justify-between max-w-2xl mx-auto">
          <div className="flex items-center gap-2">
            <Image src="/mealbridge-logo.png" alt="MealBridge" width={28} height={28} className="rounded-lg" />
            <h1 className="text-sm font-bold">Admin Settings</h1>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/10 h-8 w-8 p-0"
            onClick={() => router.push("/admin/dashboard")}
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </div>
      </header>

      <div className="p-3 max-w-2xl mx-auto">
        <Card className="p-4">
          <div className="space-y-3">
            <div>
              <Label htmlFor="fullName" className="flex items-center gap-1.5 mb-1 text-xs">
                <UserIcon className="w-3 h-3" />
                Full Name
              </Label>
              <Input
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Your full name"
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
                placeholder="admin@email.com"
                className="text-xs h-9"
              />
            </div>

            <div>
              <Label htmlFor="username" className="mb-1 block text-xs">
                Username
              </Label>
              <Input
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="admin username"
                className="text-xs h-9"
              />
            </div>

            <div>
              <Label htmlFor="role" className="flex items-center gap-1.5 mb-1 text-xs">
                <Shield className="w-3 h-3" />
                Admin Role
              </Label>
              <Input
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                disabled
                className="bg-gray-100 text-xs h-9"
              />
              <p className="text-[10px] text-gray-500 mt-1">Contact super admin to change role permissions</p>
            </div>

            <div className="flex gap-2 pt-2">
              <Button onClick={handleSave} className="bg-[#681123] hover:bg-[#4A0D1A] flex-1 text-xs h-9">
                <Save className="w-3.5 h-3.5 mr-1.5" />
                Save Changes
              </Button>
              <Button variant="outline" onClick={() => router.push("/admin/dashboard")} className="flex-1 text-xs h-9">
                Cancel
              </Button>
            </div>
          </div>
        </Card>

        <Card className="p-4 mt-3">
          <h3 className="text-sm font-semibold mb-2">Security Settings</h3>
          <div className="space-y-2">
            <Button variant="outline" className="w-full justify-start text-xs h-8 bg-transparent">
              Change Password
            </Button>
            <Button variant="outline" className="w-full justify-start text-xs h-8 bg-transparent">
              Enable Two-Factor Auth
            </Button>
            <Button variant="outline" className="w-full justify-start text-xs h-8 bg-transparent">
              View Login History
            </Button>
          </div>
        </Card>

        <Card className="p-4 mt-3">
          <h3 className="text-sm font-semibold mb-2">Admin Actions</h3>
          <div className="space-y-2">
            <Button variant="outline" className="w-full justify-start text-xs h-8 bg-transparent">
              Download System Logs
            </Button>
            <Button variant="outline" className="w-full justify-start text-xs h-8 bg-transparent">
              Backup Database
            </Button>
            <Button variant="outline" className="w-full justify-start text-xs h-8 bg-transparent">
              View Audit Trail
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
