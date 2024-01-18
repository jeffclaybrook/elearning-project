"use client"

import { ReactNode } from "react"
import {
 AlertDialog,
 AlertDialogAction,
 AlertDialogCancel,
 AlertDialogContent,
 AlertDialogDescription,
 AlertDialogFooter,
 AlertDialogHeader,
 AlertDialogTitle,
 AlertDialogTrigger
} from "@/components/ui/alert-dialog"

interface ConfirmModalProps {
 children: ReactNode
 onConfirm: () => void
}

export const ConfirmModal = ({
 children,
 onConfirm
}: ConfirmModalProps) => (
 <AlertDialog>
  <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
  <AlertDialogContent>
   <AlertDialogHeader>
    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
    <AlertDialogDescription>This action cannot be undone</AlertDialogDescription>
   </AlertDialogHeader>
   <AlertDialogFooter>
    <AlertDialogCancel>Cancel</AlertDialogCancel>
    <AlertDialogAction onClick={onConfirm}>Continue</AlertDialogAction>
   </AlertDialogFooter>
  </AlertDialogContent>
 </AlertDialog>
)