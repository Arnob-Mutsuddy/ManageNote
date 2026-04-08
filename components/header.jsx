import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { PenBox, FolderOpen } from "lucide-react";
import UserMenu from "./user-menu";

const Header = () => {
  return (
    <header className="w-full bg-cyan-100">
      <nav className="max-w-6xl mx-auto py-6 px-4 flex justify-between items-center">
        
        <Link href="/">
          <Image
            src="/Mlogo.png"
            width={200}
            height={200}
            className="h-10 w-auto object-contain"
            alt="logo"
          />
        </Link>

        <div className="flex items-center gap-4">
          <SignedIn>
            <Link href="/dashboard#collections">
              <Button variant="outline" className="flex items-center gap-2">
                <FolderOpen size={18} />
                <span className="hidden md:inline">Collections</span>
              </Button>
            </Link>
          </SignedIn>

          <Link href="/journal/write">
            <Button variant="journal" className="flex items-center gap-2">
              <PenBox size={18} />
              <span className="hidden md:inline">Write New</span>
            </Button>
          </Link>

          <SignedOut>
            <SignInButton forceRedirectUrl="/dashboard">
              <Button variant="outline">Login</Button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserMenu />
          </SignedIn>
        </div>

      </nav>
    </header>
  );
};

export default Header;
