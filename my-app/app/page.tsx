import { SignInButton, SignOutButton, SignedIn, SignedOut } from "@clerk/nextjs";
// import Link from "next/link";

export default function Home() {
  return (
    <main >
      <nav>
          <header> 
              <div>
                  <span></span>
                  <h1>Dand<span>LY</span></h1>
              </div>
          </header>
          <div>
              <SignedIn>
                <SignOutButton >
                    <button>Sign Out</button>
                </SignOutButton>
              </SignedIn>
              <SignedOut>
                <SignInButton >
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
    </main>
  );
}
