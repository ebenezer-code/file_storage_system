"use client";
import { useOrganization, useUser } from "@clerk/nextjs";
import { useState } from "react";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

import { UploadButton } from "./upload-button";


export default function Home() {
  const organization  = useOrganization();
  const user = useUser();
 


  let orgID: string | undefined = undefined;
  if(organization.isLoaded && user.isLoaded) { 
    orgID = organization.organization?.id ?? user.user?.id   
  }
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const files = useQuery(api.files.getFiles, orgID ? {orgID} : "skip");

  return (
    <main className="container mx-auto pt-12">
          <div  className="flex justify-between items-center">
            <p  className="text-6xl font-bold">Welcome to Dand<span>LY</span>! <br/> Your Ultimate Solution for Secure File Storage 
            </p>
            <p>Dand<span>LY</span> offers an innovative file storage system powered by homomorphic encryption, ensuring your data remains secure, private, and accessible only to you, even during processing. Experience the future of data protection with our cutting-edge technology.</p>
            <UploadButton />
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
