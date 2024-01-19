"use client"

import * as z from "zod"
import axios from "axios"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "react-hot-toast"
import { cn } from "@/lib/utils"
import { Chapter } from "@prisma/client"
import { Pencil } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Form, FormControl, FormDescription, FormField, FormItem } from "@/components/ui/form"

interface ChapterAccessFormProps {
 initialData: Chapter
 courseId: string
 chapterId: string
}

const formSchema = z.object({
 isFree: z.boolean().default(false)
})

export const ChapterAccessForm = ({ initialData, courseId, chapterId }: ChapterAccessFormProps) => {
 const [isEditing, setIsEditing] = useState(false)

 const toggleEdit = () => setIsEditing((current) => !current)

 const router = useRouter()

 const form = useForm<z.infer<typeof formSchema>>({
  resolver: zodResolver(formSchema),
  defaultValues: {
   isFree: !!initialData.isFree
  }
 })

 const { isSubmitting, isValid } = form.formState

 const onSubmit = async (values: z.infer<typeof formSchema>) => {
  try {
   await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, values)
   toast.success("Chapter updated")
   toggleEdit()
   router.refresh()
  } catch {
   toast.error("Something went wrong")
  }
 }

 return (
  <div className="mt-6 border bg-slate-100 rounded-md p-4">
   <div className="font-medium flex items-center justify-between">
    Chapter access
    <Button
     variant="ghost"
     onClick={toggleEdit}
    >
     {isEditing ? (
      <>Cancel</>
     ) : (
      <>
       <Pencil className="h-4 w-4 mr-2" />
       Edit access
      </>
     )}
    </Button>
   </div>
   {!isEditing && (
    <p
     className={cn(
      "text-sm mt-2",
      !initialData.isFree && "text-slate-500 italic"
     )}
    >
     {initialData.isFree ? (
      <>This chapter is free for preview</>
     ) : (
      <>Purchase course to preview chapter</>
     )}
    </p>
   )}
   {isEditing && (
    <Form {...form}>
     <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-4 mt-4"
     >
      <FormField
       control={form.control}
       name="isFree"
       render={({ field }) => (
        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
         <FormControl>
          <Checkbox
           checked={field.value}
           onCheckedChange={field.onChange}
          />
         </FormControl>
         <div className="space-y-1 leading-none">
          <FormDescription>
           Check this box if you want to make this chapter free for preview
          </FormDescription>
         </div>
        </FormItem>
       )}
      />
      <div className="flex items-center gap-x-2">
       <Button
        type="submit"
        disabled={!isValid || isSubmitting}
       >
        Save
       </Button>
      </div>
     </form>
    </Form>
   )}
  </div>
 )
}