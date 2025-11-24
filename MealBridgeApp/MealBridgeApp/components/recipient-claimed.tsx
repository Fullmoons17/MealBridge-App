"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Clock, Phone, Package } from 'lucide-react'
import Image from "next/image"
import { MobileBottomNav } from "@/components/mobile-bottom-nav"
import { useLanguage } from "@/lib/language-context"
import { LanguageSwitcher } from "@/components/language-switcher"

export function RecipientClaimed() {
  const { t, language } = useLanguage()

  const claimedDonations = [
    {
      id: 1,
      donor: "Taco Town",
      food: "Tacos",
      quantity: 25,
      pickupTime: "Today 3:00 PM",
      address: "King Fahd Road, Riyadh",
      phone: "+966 50 123 4567",
      status: "Ready for Pickup",
      image: "/delicious-pizza-slices.jpg"
    },
    {
      id: 2,
      donor: "Burger Palace",
      food: "Burgers & Fries",
      quantity: 15,
      pickupTime: "Tomorrow 12:00 PM",
      address: "Olaya Street, Riyadh",
      phone: "+966 50 987 6543",
      status: "Scheduled",
      image: "/fresh-green-salad-bowls.jpg"
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* Header */}
      <header className="bg-[#681123] text-white p-2.5 shadow-md sticky top-0 z-10">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image src="/mealbridge-logo.png" alt="MealBridge" width={28} height={28} className="rounded-full" />
            <h1 className="text-sm font-bold">{t("yourClaimedDonations")}</h1>
          </div>
          <LanguageSwitcher />
        </div>
      </header>

      <div className="container mx-auto p-3 max-w-4xl">
        {claimedDonations.length === 0 ? (
          <Card className="p-6 text-center">
            <Package className="w-12 h-12 mx-auto text-gray-400 mb-3" />
            <p className="text-sm text-gray-600">No claimed donations yet</p>
          </Card>
        ) : (
          <div className="space-y-3">
            {claimedDonations.map((donation) => (
              <Card key={donation.id} className="overflow-hidden">
                <div className="relative h-32">
                  <Image 
                    src={donation.image || "/placeholder.svg"} 
                    alt={donation.food} 
                    fill 
                    className="object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-medium ${
                      donation.status === "Ready for Pickup" 
                        ? "bg-green-100 text-green-800" 
                        : "bg-yellow-100 text-yellow-800"
                    }`}>
                      {donation.status}
                    </span>
                  </div>
                </div>
                
                <div className="p-3 space-y-2">
                  <div>
                    <h3 className="text-sm font-bold">{donation.donor}</h3>
                    <p className="text-xs text-gray-600">{donation.food} • {donation.quantity} servings</p>
                  </div>

                  <div className="space-y-1.5 text-xs">
                    <div className="flex items-center gap-1.5 text-gray-700">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{donation.pickupTime}</span>
                    </div>
                    
                    <div className="flex items-center gap-1.5 text-gray-700">
                      <MapPin className="w-3.5 h-3.5" />
                      <span className={language === 'ar' ? 'text-right' : ''}>{donation.address}</span>
                    </div>
                    
                    <div className="flex items-center gap-1.5 text-gray-700">
                      <Phone className="w-3.5 h-3.5" />
                      <a href={`tel:${donation.phone}`} className="text-[#681123] hover:underline">
                        {donation.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button 
                      size="sm" 
                      className="flex-1 bg-[#681123] hover:bg-[#4A0D1A] h-8 text-xs"
                    >
                      Get Directions
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1 h-8 text-xs"
                    >
                      Contact Donor
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      <MobileBottomNav role="recipient" />
    </div>
  )
}
