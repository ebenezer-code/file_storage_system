import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
  } from "@/components/ui/dropdown-menu"
import { ChevronDown, Trash2 } from "lucide-react";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
  } from "@/components/ui/alert-dialog"
import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { useToast } from "@/components/ui/use-toast";
  
  



export function DropDownMenu ({ file } : {file: Doc<"files">}) {
    const deleteFile = useMutation(api.files.deleteFile);
    const { toast } = useToast();
    const[isConfirmed, setIsConfirmed] = useState(false);
    return(
            <>
            <AlertDialog open = {isConfirmed} onOpenChange={setIsConfirmed}>
                      <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete this file.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick = {async () => {
                                    await deleteFile({ fileId: file._id });
                                    toast({
                                        variant: "success",
                                        title: "File successfully deleted!",
                                        description: "Your file is now completely deleted from the system.",
                                      })
                                }}>Continue</AlertDialogAction>
                            </AlertDialogFooter>
                    </AlertDialogContent>
            </AlertDialog>

            <DropdownMenu>
                        <DropdownMenuTrigger>
                            <ChevronDown className="cursor-pointer"/>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                                <DropdownMenuItem className="flex items-center text-red-600 gap-2 cursor-pointer" onClick={() => setIsConfirmed(true)}>
                                    <Trash2 className="w-4 h-4"/>
                                    Delete
                                </DropdownMenuItem>

                        </DropdownMenuContent>
                </DropdownMenu>
            </>
        
    )
}