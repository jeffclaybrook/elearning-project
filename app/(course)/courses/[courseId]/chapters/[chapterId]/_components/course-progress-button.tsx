"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useConfettiStore } from "@/hooks/use-confetti-store"
import { CheckCircle, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import axios from "axios"
import toast from "react-hot-toast"

interface CourseProgressButtonProps {
 chapterId: string
 courseId: string
 nextChapterId?: string
 isCompleted?: boolean
}

export const CourseProgressButton = ({ chapterId, courseId, nextChapterId, isCompleted }: CourseProgressButtonProps) => {
 const router = useRouter()
 const confetti = useConfettiStore()
 const [isLoading, setIsLoading] = useState(false)

 const onClick = async () => {
  try {
   setIsLoading(true)

   await axios.put(`/api/courses/${courseId}/chapters/${chapterId}/progress`, {
    isCompleted: !isCompleted
   })

   if (!isCompleted && !nextChapterId) {
    confetti.onOpen()
   }

   if (!isCompleted && nextChapterId) {
    router.push(`/courses/${courseId}/chapters/${nextChapterId}`)
   }

   toast.success("Progress updated")
   router.refresh()
  } catch {
   toast.error("Something went wrong")
  } finally {
   setIsLoading(false)
  }
 }

 const Icon = isCompleted ? XCircle : CheckCircle

 return (
  <Button
   type="button"
   disabled={isLoading}
   onClick={onClick}
   variant={isCompleted ? "outline" : "success"}
   className="w-full md:w-auto"
  >
   {isCompleted ? "Not completed" : "Mark as complete"}
   <Icon className="h-4 w-4 ml-2" />
  </Button>
 )
}