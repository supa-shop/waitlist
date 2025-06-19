"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { ShoppingBag, Zap, Shield, Coins, CreditCard, Wallet, Globe, Lock } from "lucide-react"

const FloatingIcon = ({
  icon: Icon,
  delay,
  duration,
  size = "w-6 h-6",
  opacity = "opacity-20",
  startPosition,
}: {
  icon: any
  delay: number
  duration: number
  size?: string
  opacity?: string
  startPosition: { x: number; y: number }
}) => {
  return (
    <div
      className={`absolute ${opacity} text-[#ff7900] dark:text-[#ff7900]/30`}
      style={{
        left: `${startPosition.x}%`,
        top: `${startPosition.y}%`,
        animation: `float ${duration}s ease-in-out ${delay}s infinite alternate`,
      }}
    >
      <Icon className={size} />
    </div>
  )
}

const FloatingOrb = ({
  delay,
  duration,
  size = "w-20 h-20",
  startPosition,
  color = "bg-[#ff7900]/10",
}: {
  delay: number
  duration: number
  size?: string
  startPosition: { x: number; y: number }
  color?: string
}) => {
  return (
    <div
      className={`absolute ${size} ${color} rounded-full blur-xl`}
      style={{
        left: `${startPosition.x}%`,
        top: `${startPosition.y}%`,
        animation: `floatOrb ${duration}s ease-in-out ${delay}s infinite alternate`,
      }}
    />
  )
}

export function FloatingElements() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const icons = [ShoppingBag, Zap, Shield, Coins, CreditCard, Wallet, Globe, Lock]

  const iconElements = icons.map((icon, index) => ({
    icon,
    delay: index * 0.5,
    duration: 4 + (index % 3),
    size: index % 2 === 0 ? "w-5 h-5" : "w-7 h-7",
    opacity: index % 3 === 0 ? "opacity-10" : "opacity-20",
    startPosition: {
      x: 10 + ((index * 12) % 80),
      y: 10 + ((index * 15) % 70),
    },
  }))

  const orbs = Array.from({ length: 6 }, (_, index) => ({
    delay: index * 0.8,
    duration: 6 + (index % 2),
    size: index % 2 === 0 ? "w-32 h-32" : "w-24 h-24",
    startPosition: {
      x: 5 + ((index * 18) % 85),
      y: 5 + ((index * 25) % 80),
    },
    color:
      theme === "dark"
        ? index % 2 === 0
          ? "bg-[#ff7900]/5"
          : "bg-white/5"
        : index % 2 === 0
          ? "bg-[#ff7900]/8"
          : "bg-gray-200/30",
  }))

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Floating Orbs */}
      {orbs.map((orb, index) => (
        <FloatingOrb key={`orb-${index}`} {...orb} />
      ))}

      {/* Floating Icons */}
      {iconElements.map((element, index) => (
        <FloatingIcon key={`icon-${index}`} {...element} />
      ))}

      {/* Additional decorative elements */}
      <div
        className="absolute w-1 h-1 bg-[#ff7900] rounded-full opacity-30"
        style={{
          left: "20%",
          top: "30%",
          animation: "pulse 3s ease-in-out infinite",
        }}
      />
      <div
        className="absolute w-2 h-2 bg-[#ff7900] rounded-full opacity-20"
        style={{
          right: "25%",
          top: "60%",
          animation: "pulse 4s ease-in-out 1s infinite",
        }}
      />
      <div
        className="absolute w-1 h-1 bg-[#ff7900] rounded-full opacity-25"
        style={{
          left: "70%",
          bottom: "40%",
          animation: "pulse 2.5s ease-in-out 2s infinite",
        }}
      />
    </div>
  )
}
