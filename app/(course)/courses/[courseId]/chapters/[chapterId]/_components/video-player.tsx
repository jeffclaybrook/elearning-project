"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useConfettiStore } from "@/hooks/use-confetti-store"
import { Loader2, Lock } from "lucide-react"
import { cn } from "@/lib/utils"
import MuxPlayer from "@mux/mux-player-react"
import axios from "axios"
import toast from "react-hot-toast"

interface VideoPlayerProps {
 playbackId: string
 courseId: string
 chapterId: string
 nextChapterId?: string
 title: string
 isLocked: boolean
 completeOnEnd: boolean
}

export const VideoPlayer = ({ playbackId, courseId, chapterId, nextChapterId, title, isLocked, completeOnEnd }: VideoPlayerProps) => {
 const [isReady, setIsReady] = useState(false)
 const router = useRouter()
 const confetti = useConfettiStore()

 const onEnd = async () => {
  try {
   if (completeOnEnd) {
    await axios.put(`/api/courses/${courseId}/chapters/${chapterId}/progress`, {
     isCompleted: true
    })

    if (!nextChapterId) {
     confetti.onOpen()
    }

    toast.success("Progress updated")
    router.refresh()

    if (nextChapterId) {
     router.push(`/courses/${courseId}/chapters/${nextChapterId}`)
    }
   }
  } catch {
   toast.error("Something went wrong")
  }
 }

 return (
  <div className="relative aspect-video">
   {!isReady && !isLocked && (
    <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
     <Loader2 className="h-8 w-8 animate-spin text-secondary" />
    </div>
   )}
   {isLocked && (
    <div className="absolute inset-0 flex items-center justify-center bg-slate-800 flex-col gap-y-2 text-secondary">
     <Lock className="h-8 w-8" />
     <p className="text-sm">This chapter is locked</p>
    </div>
   )}
   {!isLocked && (
    <MuxPlayer
     title={title}
     onCanPlay={() => setIsReady(true)}
     onEnded={onEnd}
     autoPlay
     playbackId={playbackId}
     className={cn(
      !isReady && "hidden"
     )}
    />
   )}
  </div>
 )
}