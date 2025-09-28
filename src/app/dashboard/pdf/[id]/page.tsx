import { getPdfDocument } from "@/app/actions";
import { auth } from "@/lib/firebase";
import { notFound } from "next/navigation";
import { FileText, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ChatInterface from "@/components/chat-interface";
import TestGenerator from "@/components/test-generator";
import { getTokens } from "next-firebase-auth-edge/lib/next/tokens";
import { cookies } from "next/headers";
import { authConfig } from "@/lib/auth-config";

type PageProps = {
  params: {
    id: string;
  };
};

export default async function PdfPage({ params }: PageProps) {
  const tokens = await getTokens(cookies(), authConfig);

  if (!tokens) {
    notFound();
  }

  const pdf = await getPdfDocument(tokens.token, params.id);
  if (!pdf) {
    notFound();
  }

  return (
    <div className="container mx-auto">
      <div className="mb-6">
        <Button variant="ghost" asChild>
          <Link href="/dashboard" className="flex items-center gap-2 text-muted-foreground">
            <ArrowLeft className="h-4 w-4" />
            Back to Documents
          </Link>
        </Button>
      </div>

      <div className="flex items-start gap-4 mb-6">
        <FileText className="h-8 w-8 text-primary mt-1" />
        <div>
          <h1 className="text-3xl font-bold font-headline">{pdf.name}</h1>
          <p className="text-muted-foreground">
            Interact with your document using AI.
          </p>
        </div>
      </div>
      
      <Tabs defaultValue="qa" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="qa">Q&A</TabsTrigger>
          <TabsTrigger value="test">Generate Test</TabsTrigger>
        </TabsList>
        <TabsContent value="qa">
            <ChatInterface pdfText={pdf.text} />
        </TabsContent>
        <TabsContent value="test">
            <TestGenerator pdfText={pdf.text} />
        </TabsContent>
      </Tabs>

    </div>
  );
}
