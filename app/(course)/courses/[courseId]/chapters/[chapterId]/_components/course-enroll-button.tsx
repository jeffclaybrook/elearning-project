"use client"

import { useState } from "react"
import { formatPrice } from "@/lib/format"
import { Button } from "@/components/ui/button"
import axios from "axios"
import toast from "react-hot-toast"

interface CourseEnrollButtonProps {
 price: number
 courseId: string
}

export const CourseEnrollButton = ({ price, courseId }: CourseEnrollButtonProps) => {
 const [isLoading, setIsLoading] = useState(false)

 const onClick = async () => {
  try {
   setIsLoading(true)

   const response = await axios.post(`/api/courses/${courseId}/checkout`)

   window.location.assign(response.data.url)
  } catch {
   toast.error("Something went wrong")
  } finally {
   setIsLoading(false)
  }
 }

 return (
  <Button
   size="sm"
   disabled={isLoading}
   onClick={onClick}
   className="w-full md:w-auto"
  >
   Enroll for {formatPrice(price)}
  </Button>
 )
}