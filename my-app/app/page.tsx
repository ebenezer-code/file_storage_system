"use client";
import { SignInButton, SignOutButton, SignedIn, SignedOut } from "@clerk/nextjs";
// import Link from "next/link";
import { useMutation , useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function Home() {
  const files = useQuery(api.files.getFiles);
  const createFile = useMutation(api.files.createFile);
  return (
    <main >
      <nav>
         
          <div>
              <SignedIn>
                <SignOutButton >
                    <button>Sign Out</button>
                </SignOutButton>
              </SignedIn>
              <SignedOut>
                <SignInButton mode="modal">
                    <button>Sign In</button>
                </SignInButton>
              </SignedOut>
          </div>
        </nav>

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
        <button onClick={() => createFile({name: "Hello world"},)}>Click Me</button>
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
