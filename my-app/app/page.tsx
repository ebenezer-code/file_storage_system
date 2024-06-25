"use client";
import { useOrganization, useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Image from "next/image";
import { UploadButton } from "./upload-button";
import { FileCard } from "./file-card";
import homeIcon from "../public/homeIcon.svg";
import { Loader2 } from "lucide-react";



export default function Home() {
  const organization  = useOrganization();
  const user = useUser();


  let orgID: string | undefined = undefined;
  if(organization.isLoaded && user.isLoaded) { 
    orgID = organization.organization?.id ?? user.user?.id   
  }
  const files = useQuery(api.files.getFiles, orgID ? {orgID} : "skip");
  const isLoading = files === undefined;
  return (
    <main className="container mx-auto pt-12">
      {isLoading && (
        <div className="flex flex-col items-center w-full gap-8 mt-24">
           <Loader2 className="h-32 w-32 animate-spin text-gray-700"/>
            <div className="text-2xl">Please wait, loading your files...</div>
        </div>
      )}
            {!isLoading && files.length === 0 && (
                  <div className="flex flex-col gap-6 w-full mt-12 items-center">
                      <Image 
                          alt="file storage image"
                          src={homeIcon}  priority/>
                        <div className="text-2xl">You have no files, proceed to upload!!</div>
                        <UploadButton />
                  </div>
                  )
                  } 
          {!isLoading && files.length >= 1 &&  (
            <>
              <div  className="flex justify-between items-center">
                  <div className="text-4xl font-bold">
                      Your Files
                    </div>
                    <UploadButton/>
                  </div>
                  <div className="grid grid-cols-4 gap-4 mt-4 mb-8 w-full">
                  {
                    files?.map(file => {
                      return  <FileCard key={file._id} file = {file}/>
                    })
                  }
              </div>
            </>
          )}
    </main>
  );
}
