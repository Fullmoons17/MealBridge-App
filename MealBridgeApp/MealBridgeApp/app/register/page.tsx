import { RegisterForm } from "@/components/register-form"
import Image from "next/image"
import Link from "next/link"

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#681123] to-[#4A0D1A] flex items-center justify-center p-3">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-2xl p-4">
          <div className="flex justify-center mb-3">
            <Image src="/mealbridge-logo.png" alt="MealBridge" width={50} height={50} />
          </div>

          <h1 className="text-xl font-bold text-center text-[#681123] mb-1">Create Account</h1>
          <p className="text-center text-gray-600 mb-4 text-xs">Join MealBridge to start making a difference</p>

          <RegisterForm />

          <p className="text-center text-xs text-gray-600 mt-4">
            Already have an account?{" "}
            <Link href="/login" className="text-[#681123] font-semibold hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
