"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { MapPin, Clock, Package, LogOut, Map, List, Filter, X } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/lib/language-context"
import { LanguageSwitcher } from "./language-switcher"
import { MobileBottomNav } from "./mobile-bottom-nav"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Donation {
  id: number
  donor: string
  food: string
  foodType: string
  quantity: number
  distance: string
  expiresIn: string
  address: string
  image: string
  lat: number
  lng: number
  donorPhone?: string
  pickupInstructions?: string
  allergens?: string
}

export function RecipientDashboard() {
  const router = useRouter()
  const [userName, setUserName] = useState("User")
  const [showMap, setShowMap] = useState(false)
  const [showClaimDialog, setShowClaimDialog] = useState(false)
  const [showRatingDialog, setShowRatingDialog] = useState(false)
  const [selectedDonation, setSelectedDonation] = useState<Donation | null>(null)
  const [pickupAddress, setPickupAddress] = useState("")
  const [pickupNotes, setPickupNotes] = useState("")
  const [rating, setRating] = useState(0)
  const [feedback, setFeedback] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [filterFoodType, setFilterFoodType] = useState("all")
  const [sortBy, setSortBy] = useState("nearest")
  const { t } = useLanguage()

  useEffect(() => {
    const name = localStorage.getItem("userName") || "User"
    setUserName(name)
  }, [])

  const availableDonations: Donation[] = [
    {
      id: 1,
      donor: "Pizza Palace",
      food: "Pizza Slices",
      foodType: "prepared",
      quantity: 20,
      distance: "2.3 km",
      expiresIn: "3 hours",
      address: "King Fahd Road, Riyadh",
      image: "/delicious-pizza-slices.jpg",
      lat: 24.7136,
      lng: 46.6753,
      donorPhone: "+966 50 123 4567",
      pickupInstructions: "Please ring the back entrance bell. Available for pickup between 2 PM - 5 PM.",
      allergens: "Wheat, Dairy, Possible traces of nuts",
    },
    {
      id: 2,
      donor: "Green Cafe",
      food: "Salad Bowls",
      foodType: "fresh",
      quantity: 15,
      distance: "4.1 km",
      expiresIn: "2 hours",
      address: "Olaya Street, Riyadh",
      image: "/fresh-green-salad-bowls.jpg",
      lat: 24.7435,
      lng: 46.6621,
      donorPhone: "+966 50 234 5678",
      pickupInstructions: "Come to the main counter and ask for donation pickup.",
      allergens: "None",
    },
    {
      id: 3,
      donor: "Bagel Shop",
      food: "Assorted Bagels",
      foodType: "baked",
      quantity: 30,
      distance: "5.8 km",
      expiresIn: "5 hours",
      address: "Al Malaz, Riyadh",
      image: "/fresh-assorted-bagels.jpg",
      lat: 24.6877,
      lng: 46.7219,
      donorPhone: "+966 50 345 6789",
      pickupInstructions: "Pick up from side door. Staff will assist you with packaging.",
      allergens: "Wheat, Sesame seeds, Eggs",
    },
  ]

  const filteredDonations = availableDonations
    .filter((d) => filterFoodType === "all" || d.foodType === filterFoodType)
    .sort((a, b) => {
      if (sortBy === "nearest") {
        return Number.parseFloat(a.distance) - Number.parseFloat(b.distance)
      } else if (sortBy === "expiring") {
        return Number.parseFloat(a.expiresIn) - Number.parseFloat(b.expiresIn)
      }
      return 0
    })

  const claimedDonations = [{ id: 1, donor: "Taco Town", food: "Tacos", quantity: 25, pickupTime: "Today 3:00 PM" }]

  const handleClaimClick = (donation: Donation) => {
    setSelectedDonation(donation)
    setShowClaimDialog(true)
  }

  const handleConfirmClaim = () => {
    console.log("[v0] Claiming donation:", selectedDonation?.id)
    setShowClaimDialog(false)
    setTimeout(() => setShowRatingDialog(true), 500)
    setPickupAddress("")
    setPickupNotes("")
  }

  const handleSubmitRating = () => {
    console.log("[v0] Rating:", rating, "Feedback:", feedback)
    setShowRatingDialog(false)
    setRating(0)
    setFeedback("")
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Compact mobile header */}
      <header className="bg-[#681123] text-white sticky top-0 z-40 shadow-md">
        <div className="flex items-center justify-between p-2.5">
          <div className="flex items-center gap-2">
            <Image src="/mealbridge-logo.png" alt="MealBridge" width={24} height={24} className="rounded-lg" />
            <div>
              <h1 className="text-xs font-bold">MealBridge</h1>
              <p className="text-[9px] text-white/80">
                {t("hello")}, {userName}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <LanguageSwitcher />
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/10 h-7 w-7 p-0"
              onClick={() => router.push("/")}
            >
              <LogOut className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="p-2.5 space-y-2.5 max-w-2xl mx-auto">
        <div className="flex gap-1.5">
          <Button
            size="sm"
            variant="outline"
            className="text-[10px] h-7 px-2 bg-transparent"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="w-3 h-3 mr-1" />
            {t("filters")}
          </Button>
          <Button
            size="sm"
            className={`flex-1 text-[10px] h-7 ${!showMap ? "bg-[#681123] text-white" : "bg-white text-gray-700 border"}`}
            onClick={() => setShowMap(false)}
          >
            <List className="w-3 h-3 mr-1" />
            {t("listView")}
          </Button>
          <Button
            size="sm"
            className={`flex-1 text-[10px] h-7 ${showMap ? "bg-[#681123] text-white" : "bg-white text-gray-700 border"}`}
            onClick={() => setShowMap(true)}
          >
            <Map className="w-3 h-3 mr-1" />
            {t("mapView")}
          </Button>
        </div>

        {showFilters && (
          <Card className="p-2 space-y-2">
            <div className="flex justify-between items-center">
              <h3 className="text-[11px] font-bold">{t("filterOptions")}</h3>
              <Button size="sm" variant="ghost" className="h-5 w-5 p-0" onClick={() => setShowFilters(false)}>
                <X className="w-3 h-3" />
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label className="text-[10px]">{t("foodType")}</Label>
                <Select value={filterFoodType} onValueChange={setFilterFoodType}>
                  <SelectTrigger className="h-7 text-[10px] mt-0.5">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t("allTypes")}</SelectItem>
                    <SelectItem value="prepared">{t("preparedMeals")}</SelectItem>
                    <SelectItem value="fresh">{t("freshProduce")}</SelectItem>
                    <SelectItem value="baked">{t("bakedGoods")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-[10px]">{t("sortBy")}</Label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="h-7 text-[10px] mt-0.5">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="nearest">{t("nearestFirst")}</SelectItem>
                    <SelectItem value="expiring">{t("expiringSoon")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>
        )}

        {showMap ? (
          <Card className="p-0 overflow-hidden">
            <div className="relative w-full h-96 bg-gray-200">
              <iframe
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115423.89273249699!2d46.571788!3d24.7136!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f03890d489399%3A0xa5e87c40a63f3270!2sRiyadh%20Saudi%20Arabia!5e0!3m2!1sen!2s!4v1234567890"
              />
              {/* Donation markers overlay */}
              <div className="absolute inset-0 pointer-events-none">
                {filteredDonations.map((donation, idx) => {
                  const centerLat = 24.7136
                  const centerLng = 46.6753
                  // Adjust scale for better marker positioning
                  const latDiff = (donation.lat - centerLat) * 2800
                  const lngDiff = (donation.lng - centerLng) * 3200

                  return (
                    <div
                      key={donation.id}
                      className="absolute"
                      style={{
                        left: `calc(50% + ${lngDiff}px)`,
                        top: `calc(50% - ${latDiff}px)`,
                        transform: "translate(-50%, -50%)",
                      }}
                    >
                      <div className="pointer-events-auto bg-white rounded-lg shadow-lg p-2 border-2 border-[#681123] max-w-[140px]">
                        <div className="flex items-start gap-1.5">
                          <MapPin className="w-4 h-4 text-[#681123] flex-shrink-0 mt-0.5" />
                          <div className="min-w-0">
                            <p className="font-bold text-[10px] truncate">{donation.food}</p>
                            <p className="text-[9px] text-gray-600 truncate">{donation.donor}</p>
                            <p className="text-[9px] text-orange-600 font-medium">{donation.expiresIn}</p>
                            <Button
                              size="sm"
                              className="w-full mt-1 bg-[#681123] hover:bg-[#4A0D1A] text-[9px] h-6 pointer-events-auto"
                              onClick={() => handleClaimClick(donation)}
                            >
                              {t("claim")}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </Card>
        ) : (
          <div className="space-y-2">
            <h3 className="text-[11px] font-bold px-0.5">{t("availableDonations")}</h3>
            {filteredDonations.map((donation) => (
              <Card key={donation.id} className="overflow-hidden">
                <img
                  src={donation.image || "/placeholder.svg"}
                  alt={donation.food}
                  className="w-full h-24 object-cover"
                />
                <div className="p-2">
                  <div className="flex justify-between items-start mb-1.5">
                    <div>
                      <h4 className="font-bold text-xs">{donation.food}</h4>
                      <p className="text-[10px] text-gray-600">{donation.donor}</p>
                    </div>
                    <span className="bg-orange-100 text-orange-800 px-1.5 py-0.5 rounded-full text-[9px] font-medium">
                      {donation.expiresIn}
                    </span>
                  </div>

                  <div className="space-y-0.5 mb-2">
                    <div className="flex items-center text-[10px] text-gray-700">
                      <Package className="w-3 h-3 mr-1 text-[#681123]" />
                      {donation.quantity} {t("servings")}
                    </div>
                    <div className="flex items-center text-[10px] text-gray-700">
                      <MapPin className="w-3 h-3 mr-1 text-[#681123]" />
                      {donation.distance} {t("away")}
                    </div>
                  </div>

                  <Button
                    size="sm"
                    className="w-full bg-[#681123] hover:bg-[#4A0D1A] active:scale-95 transition-transform text-[10px] h-7"
                    onClick={() => handleClaimClick(donation)}
                  >
                    {t("claimDonation")}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Claimed Donations */}
        {claimedDonations.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-sm font-bold px-1">{t("yourClaimedDonations")}</h3>
            {claimedDonations.map((donation) => (
              <Card key={donation.id} className="p-3 border-2 border-green-500">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-sm">
                      {donation.food} ({donation.quantity} {t("servings")})
                    </p>
                    <p className="text-xs text-gray-600">{donation.donor}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      <Clock className="w-3 h-3 inline mr-1" />
                      {t("pickup")}: {donation.pickupTime}
                    </p>
                  </div>
                  <Button size="sm" className="bg-green-600 hover:bg-green-700 text-xs">
                    {t("viewDetails")}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Claim Dialog */}
      <Dialog open={showClaimDialog} onOpenChange={setShowClaimDialog}>
        <DialogContent className="max-w-[90vw] max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-base font-bold text-[#681123]">{t("claimDonation")}</DialogTitle>
            <DialogDescription className="text-xs">{t("reviewDonationDetails")}</DialogDescription>
          </DialogHeader>

          {selectedDonation && (
            <div className="space-y-3">
              <div className="bg-gray-50 p-3 rounded-lg space-y-1.5">
                <h3 className="font-bold text-sm">{t("donationDetails")}</h3>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <p className="text-gray-600">{t("foodItem")}</p>
                    <p className="font-semibold">{selectedDonation.food}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">{t("quantity")}</p>
                    <p className="font-semibold">
                      {selectedDonation.quantity} {t("servings")}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-3 rounded-lg space-y-1.5 text-xs">
                <h3 className="font-bold text-sm">{t("pickupInformation")}</h3>
                <div>
                  <p className="text-gray-600">{t("pickupAddress")}</p>
                  <p className="font-semibold">{selectedDonation.address}</p>
                </div>
                <div>
                  <p className="text-gray-600">{t("contactPhone")}</p>
                  <p className="font-semibold">{selectedDonation.donorPhone}</p>
                </div>
              </div>

              <div className="space-y-2">
                <div>
                  <Label htmlFor="pickup-address" className="text-xs">
                    {t("yourPickupAddress")}
                  </Label>
                  <Input
                    id="pickup-address"
                    placeholder={t("enterYourAddress")}
                    value={pickupAddress}
                    onChange={(e) => setPickupAddress(e.target.value)}
                    className="mt-1 text-xs h-9"
                  />
                </div>
              </div>
            </div>
          )}

          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setShowClaimDialog(false)} className="flex-1 text-xs h-9">
              {t("cancel")}
            </Button>
            <Button className="bg-[#681123] hover:bg-[#4A0D1A] flex-1 text-xs h-9" onClick={handleConfirmClaim}>
              {t("confirmClaim")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showRatingDialog} onOpenChange={setShowRatingDialog}>
        <DialogContent className="max-w-[90vw]">
          <DialogHeader>
            <DialogTitle className="text-base font-bold text-[#681123]">{t("rateDonation")}</DialogTitle>
            <DialogDescription className="text-xs">{t("shareYourExperience")}</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label className="text-xs mb-2 block">{t("yourRating")}</Label>
              <div className="flex gap-2 justify-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button key={star} onClick={() => setRating(star)} className="text-2xl transition-colors">
                    {star <= rating ? "⭐" : "☆"}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="feedback" className="text-xs">
                {t("feedback")}
              </Label>
              <textarea
                id="feedback"
                rows={3}
                className="w-full mt-1 p-2 border rounded-md text-xs"
                placeholder={t("shareThoughts")}
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
              />
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setShowRatingDialog(false)} className="flex-1 text-xs h-9">
              {t("skip")}
            </Button>
            <Button className="bg-[#681123] hover:bg-[#4A0D1A] flex-1 text-xs h-9" onClick={handleSubmitRating}>
              {t("submitRating")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav role="recipient" />
    </div>
  )
}
