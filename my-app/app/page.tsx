"use client";
import { useOrganization, useUser } from "@clerk/nextjs";
import { useState } from "react";
import { Loader } from "lucide-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";

import { useMutation , useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast"
const formSchema = z.object({
  title: z.string().min(1).max(200),
  file: z.custom<FileList>((val) => val instanceof FileList, "Required").refine((files) => files.length > 0, "Required"),
})


export default function Home() {
  const { toast } = useToast();
  const organization  = useOrganization();
  const user = useUser();
  const generateUploadurl = useMutation(api.files.generateUploadUrl);
  

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      file: undefined,
    },
  });
const fileRef = form.register('file');

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if(!orgID) return;
    const postUrl = await generateUploadurl();
    const result = await fetch(postUrl, {
      method: "POST",
      headers: {"Content-Type": values.file[0].type},
      body: values.file[0],
    });

    const { storageId } = await result.json();
    try {
      await createFile({name: values.title,  fileId:storageId,  orgID})
      form.reset();
      setIsDialogOpen(false);
      toast({
        variant: "success",
        title: "File Uploaded!",
        description: "Now everyone can view your file",
      })

    } catch (err) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "File could not be uploaded.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      })
    }
   
  }



  let orgID: string | undefined = undefined;
  if(organization.isLoaded && user.isLoaded) { 
    orgID = organization.organization?.id ?? user.user?.id   
  }
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const files = useQuery(api.files.getFiles, orgID ? {orgID} : "skip");
  const createFile = useMutation(api.files.createFile);
  return (
    <main className="container mx-auto pt-12">
          <div  className="flex justify-between items-center">
            <p  className="text-6xl font-bold">Welcome to Dand<span>LY</span>! <br/> Your Ultimate Solution for Secure File Storage 
            </p>
            <p>Dand<span>LY</span> offers an innovative file storage system powered by homomorphic encryption, ensuring your data remains secure, private, and accessible only to you, even during processing. Experience the future of data protection with our cutting-edge technology.</p>
                    <Dialog open = {isDialogOpen} onOpenChange={(isOpen) => {
                      setIsDialogOpen(isOpen)
                      form.reset();
                    }
                      }>
                          <DialogTrigger asChild>
                              <Button onClick={() => { 
                                   
                                  }}>Upload file
                            </Button>
                          </DialogTrigger>
                            <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle className="mb-8">Upload Your File</DialogTitle>
                                        <DialogDescription>
                                            <Form {...form}>
                                               <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                                    <FormField
                                                            control={form.control}
                                                            name="title"
                                                            render={({ field }) => (
                                                              <FormItem>
                                                                <FormLabel>Title</FormLabel>
                                                                <FormControl>
                                                                  <Input placeholder="My Satin Project" {...field} />
                                                                </FormControl>
                                                                <FormMessage />
                                                      </FormItem>
                                                            )}
                                                          />
                                                           <FormField
                                                            control={form.control}
                                                            name="file"
                                                            render={() => (
                                                              <FormItem>
                                                                <FormLabel>File</FormLabel>
                                                                <FormControl>
                                                                  <Input type="file" {...fileRef}/>
                                                                </FormControl>
                                                                <FormMessage />
                                                      </FormItem>
                                                            )}
                                                          />
                                                     <Button type="submit" disabled={form.formState.isSubmitting} className="flex gap-1">
                                                      {form.formState.isSubmitting && (<Loader className = "h-3 w-3 animate-spin"/>)}
                                                      Submit</Button>
                                                  </form>
                                             </Form>
                                          </DialogDescription>
                               </DialogHeader>
                            </DialogContent>
                        </Dialog>
          </div>
        
        {
          files?.map(file => {
            return <div key={file._id}>
              <h1>{file.name}</h1>
            </div>
          })
        }
    </main>
  );
}
