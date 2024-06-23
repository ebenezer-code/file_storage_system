"use client";
import { SignInButton, SignOutButton, SignedIn, SignedOut, useOrganization, useUser } from "@clerk/nextjs";
// import Link from "next/link";
import { useMutation , useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function Home() {
  const organization  = useOrganization();
  const user = useUser();

  let orgID: string | undefined = undefined;
  if(organization.isLoaded && user.isLoaded) { 
    orgID = organization.organization?.id ?? user.user?.id   
  }

  const files = useQuery(api.files.getFiles, orgID ? {orgID} : "skip");
  const createFile = useMutation(api.files.createFile);
  return (
    <main >

        <section>
          <div>
              <h1>Icon goes here</h1>
          </div>
          <div>
            <p>Welcome to Dand<span>LY</span>! <br/> Your Ultimate Solution for Secure File Storage 
            </p>
            <p>Dand<span>LY</span> offers an innovative file storage system powered by homomorphic encryption, ensuring your data remains secure, private, and accessible only to you, even during processing. Experience the future of data protection with our cutting-edge technology.</p>
          </div>
        </section>
        <button onClick={() => { 
          if(!orgID) return;
          createFile({name: "Hello world", orgID},)
        }}>Click Me</button>
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
