import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/icons";

export function Header() {
  return (
    <header className="px-4 lg:px-6 h-16 flex items-center bg-background/80 backdrop-blur-sm border-b sticky top-0 z-50">
      <Link href="/" className="flex items-center justify-center gap-2" prefetch={false}>
        <Logo className="h-6 w-6 text-primary" />
        <span className="font-headline text-lg font-semibold text-primary">Inquisity</span>
      </Link>
      <nav className="ml-auto flex items-center gap-4 sm:gap-6">
        <Button variant="ghost" asChild>
          <Link href="/login" prefetch={false}>
            Login
          </Link>
        </Button>
        <Button asChild>
          <Link href="/signup" prefetch={false}>
            Sign Up
          </Link>
        </Button>
      </nav>
    </header>
  );
}
