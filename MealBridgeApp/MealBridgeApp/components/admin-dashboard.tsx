"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  CheckCircle,
  XCircle,
  Users,
  Package,
  TrendingUp,
  Utensils,
  BarChart3,
  Map,
  AlertTriangle,
  DollarSign,
  LogOut,
} from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/lib/language-context"
import { LanguageSwitcher } from "./language-switcher"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { MobileBottomNav } from "./mobile-bottom-nav"

// Mock reports data and report dialog
const mockReports = {
  weeklyVolume: {
    title: "Weekly Donation Volume Report",
    data: [
      { week: "Week 1", donations: 142, meals: 3420 },
      { week: "Week 2", donations: 156, meals: 3780 },
      { week: "Week 3", donations: 178, meals: 4210 },
      { week: "Week 4", donations: 189, meals: 4560 },
    ],
    summary: "Total donations increased by 33% compared to last month. Peak donation time: 2-4 PM.",
  },
  userGrowth: {
    title: "User Growth Analytics",
    data: [
      { category: "Donors", count: 542, growth: "+12%" },
      { category: "Recipients", count: 389, growth: "+18%" },
      { category: "New This Week", count: 47, growth: "+5%" },
    ],
    summary: "Strong growth in recipient registrations. Donor retention rate: 87%.",
  },
  geographic: {
    title: "Geographic Distribution Report",
    data: [
      { area: "Riyadh Central", donations: 234, coverage: "High" },
      { area: "Al Malaz", donations: 189, coverage: "Medium" },
      { area: "Olaya", donations: 156, coverage: "High" },
      { area: "King Fahd District", donations: 142, coverage: "Medium" },
    ],
    summary: "Best coverage in central Riyadh. Opportunity to expand in northern districts.",
  },
  hygiene: {
    title: "Hygiene & Safety Incidents",
    data: [
      { month: "December", incidents: 2, resolved: 2, severity: "Low" },
      { month: "January", incidents: 1, resolved: 1, severity: "Low" },
    ],
    summary: "All incidents resolved within 24 hours. 98.7% compliance rate with safety standards.",
  },
  impact: {
    title: "Impact Assessment Report",
    data: [
      { metric: "Meals Distributed", value: "52,617" },
      { metric: "People Fed", value: "~17,539" },
      { metric: "Food Waste Reduced", value: "15.8 tons" },
      { metric: "CO2 Emissions Saved", value: "23.4 tons" },
    ],
    summary:
      "MealBridge has prevented 15.8 tons of food waste, equivalent to feeding 17,539 people and saving 23.4 tons of CO2 emissions.",
  },
}

export function AdminDashboard() {
  const router = useRouter()
  const { t } = useLanguage()
  // State for report dialog
  const [selectedReport, setSelectedReport] = useState<string | null>(null)

  const pendingUsers = [
    { id: 1, name: "New Restaurant", type: "Donor", email: "restaurant@example.com", date: "2024-01-15" },
    { id: 2, name: "Community Food Bank", type: "Recipient", email: "foodbank@example.com", date: "2024-01-14" },
  ]

  const systemStats = {
    totalUsers: 1247,
    totalDonations: 3842,
    activeDonations: 23,
    mealsShared: 52617,
  }

  const recentActivity = [
    { action: "New donation posted", user: "Pizza Palace", time: "5 min ago" },
    { action: "Donation claimed", user: "Hope Center", time: "12 min ago" },
    { action: "User verified", user: "Green Cafe", time: "23 min ago" },
    { action: "Pickup completed", user: "City Mission", time: "1 hour ago" },
  ]

  // Function to get current report data
  const getCurrentReport = () => {
    if (!selectedReport) return null
    return mockReports[selectedReport as keyof typeof mockReports]
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Compact admin header */}
      <header className="bg-[#681123] text-white sticky top-0 z-40 shadow-md">
        <div className="flex items-center justify-between p-3">
          <div className="flex items-center gap-2">
            <Image src="/mealbridge-logo.png" alt="MealBridge" width={28} height={28} className="rounded-lg" />
            <div>
              <h1 className="text-sm font-bold">Admin Panel</h1>
              <p className="text-[10px] text-white/80">MealBridge</p>
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

      <div className="p-3 space-y-3 max-w-2xl mx-auto">
        {/* System Stats - Mobile Grid */}
        <div className="grid grid-cols-2 gap-2">
          <Card className="p-3">
            <Users className="w-4 h-4 text-[#681123] mb-1" />
            <p className="text-xl font-bold text-[#681123]">{systemStats.totalUsers}</p>
            <p className="text-[10px] text-gray-600">{t("totalUsers")}</p>
          </Card>
          <Card className="p-3">
            <Package className="w-4 h-4 text-[#681123] mb-1" />
            <p className="text-xl font-bold text-[#681123]">{systemStats.totalDonations}</p>
            <p className="text-[10px] text-gray-600">{t("totalDonations")}</p>
          </Card>
          <Card className="p-3">
            <TrendingUp className="w-4 h-4 text-green-600 mb-1" />
            <p className="text-xl font-bold text-green-600">{systemStats.activeDonations}</p>
            <p className="text-[10px] text-gray-600">{t("activeDonations")}</p>
          </Card>
          <Card className="p-3">
            <Utensils className="w-4 h-4 text-[#681123] mb-1" />
            <p className="text-xl font-bold text-[#681123]">{systemStats.mealsShared.toLocaleString()}</p>
            <p className="text-[10px] text-gray-600">{t("mealsShared")}</p>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="verify" className="w-full">
          <TabsList className="grid w-full grid-cols-2 h-9">
            <TabsTrigger value="verify" className="text-xs">
              {t("verifyUsers")}
            </TabsTrigger>
            <TabsTrigger value="reports" className="text-xs">
              {t("viewReports")}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="verify" className="space-y-2 mt-3">
            {pendingUsers.map((user) => (
              <Card key={user.id} className="p-3">
                <div className="mb-2">
                  <p className="font-semibold text-sm">{user.name}</p>
                  <p className="text-xs text-gray-600">{user.email}</p>
                  <p className="text-[10px] text-gray-500 mt-0.5">
                    {user.type} • {user.date}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" className="flex-1 bg-green-600 hover:bg-green-700 text-xs h-8">
                    <CheckCircle className="w-3.5 h-3.5 mr-1" />
                    {t("approve")}
                  </Button>
                  <Button size="sm" variant="destructive" className="flex-1 text-xs h-8">
                    <XCircle className="w-3.5 h-3.5 mr-1" />
                    {t("reject")}
                  </Button>
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="reports" className="space-y-2 mt-3">
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start text-xs h-9 bg-transparent"
              onClick={() => setSelectedReport("weeklyVolume")}
            >
              <BarChart3 className="w-3.5 h-3.5 mr-2" />
              {t("weeklyVolumeReport")}
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start text-xs h-9 bg-transparent"
              onClick={() => setSelectedReport("userGrowth")}
            >
              <TrendingUp className="w-3.5 h-3.5 mr-2" />
              {t("userGrowthAnalytics")}
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start text-xs h-9 bg-transparent"
              onClick={() => setSelectedReport("geographic")}
            >
              <Map className="w-3.5 h-3.5 mr-2" />
              {t("geographicDistribution")}
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start text-xs h-9 bg-transparent"
              onClick={() => setSelectedReport("hygiene")}
            >
              <AlertTriangle className="w-3.5 h-3.5 mr-2" />
              {t("safetyIncidents")}
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start text-xs h-9 bg-transparent"
              onClick={() => setSelectedReport("impact")}
            >
              <DollarSign className="w-3.5 h-3.5 mr-2" />
              {t("impactAssessment")}
            </Button>
          </TabsContent>
        </Tabs>
      </div>

      {/* Report Dialog */}
      <Dialog open={!!selectedReport} onOpenChange={() => setSelectedReport(null)}>
        <DialogContent className="max-w-[90vw] max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-base font-bold text-[#681123]">{getCurrentReport()?.title}</DialogTitle>
          </DialogHeader>

          {getCurrentReport() && (
            <div className="space-y-3">
              <div className="space-y-2">
                {getCurrentReport()?.data.map((item: any, index: number) => (
                  <Card key={index} className="p-2.5 bg-gray-50">
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {Object.entries(item).map(([key, value]) => (
                        <div key={key}>
                          <p className="text-[10px] text-gray-500 uppercase">{key}</p>
                          <p className="font-semibold text-xs">{String(value)}</p>
                        </div>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>

              <div className="bg-[#681123] text-white p-3 rounded-lg">
                <h4 className="font-bold text-sm mb-1.5">{t("summary")}</h4>
                <p className="text-xs">{getCurrentReport()?.summary}</p>
              </div>

              <Button
                className="w-full bg-[#681123] hover:bg-[#4A0D1A] text-xs h-9"
                onClick={() => setSelectedReport(null)}
              >
                {t("close")}
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav role="admin" />
    </div>
  )
}
