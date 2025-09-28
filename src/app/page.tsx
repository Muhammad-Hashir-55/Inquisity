import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, FileText, BrainCircuit, MessageSquare } from "lucide-react";
import Link from "next/link";
import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-primary/10">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-primary">
                    Inquisity
                  </h1>
                  <p className="text-2xl font-medium text-foreground/80">
                    Fuel Your Curiosity, Master Every PDF.
                  </p>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Unlock the knowledge within your documents. Upload your PDFs, ask questions, and generate tests with the power of AI.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg">
                    <Link href="/signup">Get Started for Free</Link>
                  </Button>
                  <Button asChild variant="secondary" size="lg">
                    <Link href="/login">Sign In</Link>
                  </Button>
                </div>
              </div>
              <Image
                src="https://picsum.photos/seed/inquisity-hero/600/400"
                alt="Hero"
                width={600}
                height={400}
                data-ai-hint="abstract technology"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
              />
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-accent/20 px-3 py-1 text-sm font-medium text-accent-foreground">
                  Key Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline text-primary">
                  Transform Your Document Workflow
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Inquisity provides a seamless experience for interacting with your PDFs, from effortless uploads to AI-powered insights.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 lg:max-w-none mt-12">
              <div className="grid gap-1 text-center">
                <FileText className="h-10 w-10 mx-auto text-primary" />
                <h3 className="text-lg font-bold">PDF Upload &amp; Storage</h3>
                <p className="text-sm text-muted-foreground">
                  Securely upload and store your PDF documents. Access them anytime, anywhere, neatly organized in your personal dashboard.
                </p>
              </div>
              <div className="grid gap-1 text-center">
                <MessageSquare className="h-10 w-10 mx-auto text-primary" />
                <h3 className="text-lg font-bold">AI-Powered Q&amp;A</h3>
                <p className="text-sm text-muted-foreground">
                  Converse with your documents. Ask complex questions and get instant, context-aware answers from the content of your PDFs.
                </p>
              </div>
              <div className="grid gap-1 text-center">
                <BrainCircuit className="h-10 w-10 mx-auto text-primary" />
                <h3 className="text-lg font-bold">Automatic Test Generation</h3>
                <p className="text-sm text-muted-foreground">
                  Put your knowledge to the test. Automatically generate multiple-choice quizzes based on your documents to reinforce learning.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary/10">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight font-headline text-primary">
                Ready to Dive In?
              </h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Create an account today and start turning your documents into interactive knowledge bases.
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm space-y-2">
              <Button asChild size="lg" className="w-full">
                <Link href="/signup">Sign Up Now</Link>
              </Button>
              <p className="text-xs text-muted-foreground">
                Already have an account?{" "}
                <Link href="/login" className="underline underline-offset-2 text-primary">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; 2024 Inquisity. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4">
            Terms of Service
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
