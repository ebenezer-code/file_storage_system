import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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

import { Doc, Id } from "@/convex/_generated/dataModel";
import { ReactNode, useState } from "react";
import { Text, FileTextIcon, GanttChartIcon, ImageIcon } from "lucide-react";
import Image from "next/image";
import { useToast } from "@/components/ui/use-toast";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";

function FileCardActions ( { file } : { file: Doc<"files">}) {
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

function getFileUrl(fileld: Id<"_storage">) : string {
    return `${process.env.NEXT_PUBLIC_CONVEX_URL}/api/storage/${fileld}`;
}
export function FileCard({ file }: { file: Doc<"files"> }) {
  const typesIcon = {
    image: <ImageIcon />,
    pdf: <FileTextIcon />,
    csv: <GanttChartIcon />,
    docx: <Text />,
  } as Record<Doc<"files">["type"], ReactNode>;

  return (
    <Card>
      <CardHeader className="relative">
        <CardTitle className="flex items-center gap-2">
          <div className="flex justify-center">{typesIcon[file.type]}</div>
          {file.name}
        </CardTitle>
        <div className="absolute top-3 right-3">
          <FileCardActions file={file} />
        </div>
      </CardHeader>
      <CardContent className="h-[200px] flex justify-center items-center">
        {file.type === "image" && (
          <Image
            alt={file.name}
            width="200"
            height="100"
            src={getFileUrl(file.fileId)}
          />
        )}
        {
          file.type === "csv" && <GanttChartIcon className="w-20 h-20"/>
        }
        {
          file.type === "pdf" && <FileTextIcon className="w-20 h-20"/>
        }
        {
          file.type === "docx" && <Text className="w-20 h-20"/>
        }
      </CardContent>
      <CardFooter className="flex justify-center items-center">
        <Button onClick={() => window.open(getFileUrl(file.fileId), "_blank")}>Download</Button>
      </CardFooter>
    </Card>
  );
}
