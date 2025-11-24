"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Upload, MapPin, Clock, Check } from "lucide-react"
import { useRouter } from "next/navigation"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { useLanguage } from "@/lib/language-context"

export function CreateDonationForm() {
  const router = useRouter()
  const { t } = useLanguage()
  const [step, setStep] = useState(1)
  const [showRatingDialog, setShowRatingDialog] = useState(false)
  const [rating, setRating] = useState(0)
  const [feedback, setFeedback] = useState("")
  const [formData, setFormData] = useState({
    foodType: "",
    quantity: "",
    description: "",
    expiryTime: "",
    pickupAddress: "",
    contactPerson: "",
    contactPhone: "",
    image: null as File | null,
  })

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, image: e.target.files[0] })
    }
  }

  const handleNext = () => {
    if (step < 3) setStep(step + 1)
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
    else router.push("/donor/dashboard")
  }

  const handleSubmit = () => {
    console.log("[v0] Donation created")
    setShowRatingDialog(true)
  }

  const handleSubmitRating = () => {
    console.log("[v0] Rating:", rating, "Feedback:", feedback)
    setShowRatingDialog(false)
    router.push("/donor/dashboard")
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <header className="bg-[#681123] text-white p-3 shadow-md sticky top-0 z-40">
        <div className="flex items-center gap-2 max-w-2xl mx-auto">
          <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 h-8 w-8 p-0" onClick={handleBack}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-sm font-bold">{t("createDonation")}</h1>
        </div>
      </header>

      <div className="p-3 max-w-2xl mx-auto">
        <div className="mb-4">
          <div className="flex items-center justify-center gap-2">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                    s === step
                      ? "bg-[#681123] text-white"
                      : s < step
                        ? "bg-green-500 text-white"
                        : "bg-gray-300 text-gray-600"
                  }`}
                >
                  {s < step ? <Check className="w-3.5 h-3.5" /> : s}
                </div>
                {s < 3 && <div className={`w-12 h-0.5 ${s < step ? "bg-green-500" : "bg-gray-300"}`} />}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-1.5 text-[10px] text-gray-600">
            <span>{t("foodDetails")}</span>
            <span>{t("photoUpload")}</span>
            <span>{t("pickupInfo")}</span>
          </div>
        </div>

        <Card className="p-4">
          {/* Step 1: Food Details */}
          {step === 1 && (
            <div className="space-y-3">
              <h2 className="text-base font-bold mb-2">{t("foodDetails")}</h2>

              <div>
                <Label htmlFor="foodType" className="text-xs">
                  {t("foodType")}
                </Label>
                <Input
                  id="foodType"
                  placeholder="e.g., Pizza, Sandwiches, Salads"
                  value={formData.foodType}
                  onChange={(e) => setFormData({ ...formData, foodType: e.target.value })}
                  className="text-xs h-9 mt-1"
                />
              </div>

              <div>
                <Label htmlFor="quantity" className="text-xs">
                  {t("quantityServings")}
                </Label>
                <Input
                  id="quantity"
                  type="number"
                  placeholder="e.g., 20"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  className="text-xs h-9 mt-1"
                />
              </div>

              <div>
                <Label htmlFor="description" className="text-xs">
                  {t("description")}
                </Label>
                <Textarea
                  id="description"
                  placeholder="Describe the food, ingredients, allergens, etc."
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="text-xs mt-1"
                />
              </div>

              <div>
                <Label htmlFor="expiryTime" className="text-xs">
                  {t("bestBeforeHours")}
                </Label>
                <Input
                  id="expiryTime"
                  type="number"
                  placeholder="e.g., 4"
                  value={formData.expiryTime}
                  onChange={(e) => setFormData({ ...formData, expiryTime: e.target.value })}
                  className="text-xs h-9 mt-1"
                />
              </div>

              <Button onClick={handleNext} className="w-full bg-[#681123] hover:bg-[#4A0D1A] text-xs h-9 mt-4">
                {t("nextStep")}
              </Button>
            </div>
          )}

          {/* Step 2: Upload Photo */}
          {step === 2 && (
            <div className="space-y-3">
              <h2 className="text-base font-bold mb-2">{t("uploadPhoto")}</h2>

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                {formData.image ? (
                  <div>
                    <Check className="w-12 h-12 text-green-500 mx-auto mb-2" />
                    <p className="text-xs text-gray-700 font-medium">{formData.image.name}</p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setFormData({ ...formData, image: null })}
                      className="mt-3 text-xs h-8"
                    >
                      {t("changePhoto")}
                    </Button>
                  </div>
                ) : (
                  <div>
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-xs text-gray-600 mb-3">Upload a photo of the food</p>
                    <Input type="file" accept="image/*" onChange={handleImageUpload} className="text-xs" />
                  </div>
                )}
              </div>

              <div className="flex gap-2 mt-4">
                <Button onClick={handleBack} variant="outline" className="flex-1 text-xs h-9 bg-transparent">
                  {t("back")}
                </Button>
                <Button onClick={handleNext} className="flex-1 bg-[#681123] hover:bg-[#4A0D1A] text-xs h-9">
                  {t("nextStep")}
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Pickup Info */}
          {step === 3 && (
            <div className="space-y-3">
              <h2 className="text-base font-bold mb-2">{t("pickupInfo")}</h2>

              <div>
                <Label htmlFor="pickupAddress" className="text-xs">
                  {t("pickupAddress")}
                </Label>
                <div className="relative mt-1">
                  <MapPin className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-gray-400" />
                  <Input
                    id="pickupAddress"
                    placeholder="123 Main St, City, State"
                    className="pl-8 text-xs h-9"
                    value={formData.pickupAddress}
                    onChange={(e) => setFormData({ ...formData, pickupAddress: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="contactPerson" className="text-xs">
                  {t("contactPerson")}
                </Label>
                <Input
                  id="contactPerson"
                  placeholder="John Doe"
                  value={formData.contactPerson}
                  onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                  className="text-xs h-9 mt-1"
                />
              </div>

              <div>
                <Label htmlFor="contactPhone" className="text-xs">
                  {t("contactPhone")}
                </Label>
                <Input
                  id="contactPhone"
                  type="tel"
                  placeholder="+966 50 123 4567"
                  value={formData.contactPhone}
                  onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                  className="text-xs h-9 mt-1"
                />
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-4">
                <div className="flex items-start gap-2">
                  <Clock className="w-3.5 h-3.5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-medium text-blue-900">{t("pickupWindow")}</p>
                    <p className="text-[10px] text-blue-700 mt-0.5">
                      {t("recipientsNotified")} {formData.expiryTime || "4"} {t("hours")}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <Button onClick={handleBack} variant="outline" className="flex-1 text-xs h-9 bg-transparent">
                  {t("back")}
                </Button>
                <Button onClick={handleSubmit} className="flex-1 bg-green-600 hover:bg-green-700 text-xs h-9">
                  <Check className="w-3.5 h-3.5 mr-1.5" />
                  {t("confirm")}
                </Button>
              </div>
            </div>
          )}
        </Card>
      </div>

      <Dialog open={showRatingDialog} onOpenChange={setShowRatingDialog}>
        <DialogContent className="max-w-[90vw]">
          <DialogHeader>
            <DialogTitle className="text-base font-bold text-[#681123]">{t("shareYourExperience")}</DialogTitle>
            <DialogDescription className="text-xs">{t("shareYourExperience")}</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label className="text-xs mb-2 block">{t("rateYourExperience")}</Label>
              <div className="flex gap-2 justify-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button key={star} onClick={() => setRating(star)} className="text-2xl transition-colors">
                    {star <= rating ? "⭐" : "☆"}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="donor-feedback" className="text-xs">
                {t("feedback")}
              </Label>
              <textarea
                id="donor-feedback"
                rows={3}
                className="w-full mt-1 p-2 border rounded-md text-xs"
                placeholder="Tell us about your donation experience..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
              />
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setShowRatingDialog(false)
                router.push("/donor/dashboard")
              }}
              className="flex-1 text-xs h-9"
            >
              {t("skip")}
            </Button>
            <Button className="bg-[#681123] hover:bg-[#4A0D1A] flex-1 text-xs h-9" onClick={handleSubmitRating}>
              {t("submit")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
