import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = () => {
    return (
        <header className="container mx-auto">
            <nav className="py-6 px4 flex justify-between items-center">
                <Link href="/">
                    <Image
                        src="/Mlogo.png"
                        width={100}
                        height={60}
                        className="h-10 w-auto object-contain"
                        alt="logo"
                    />
                
                </Link>
                
                <div className="flex items-center gap-4">
                    {/* (loging and other things) */}
                    <SignedOut>
                        <SignInButton />
                     </SignedOut>
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                </div>


            </nav>
        </header>

            
    )
};
export default Header;