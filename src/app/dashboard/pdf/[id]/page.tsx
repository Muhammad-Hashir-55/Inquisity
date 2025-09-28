"use client";

import { notFound, useParams } from "next/navigation";
import { FileText, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ChatInterface from "@/components/chat-interface";
import TestGenerator from "@/components/test-generator";
import { useEffect, useState } from "react";
import { getPdfById } from "@/lib/local-storage";
import { PDFDocument } from "@/lib/types";
import PdfPageLoading from "./loading";
import { useAuth } from "@/context/auth-context";

export default function PdfPage() {
  const params = useParams();
  const { user } = useAuth();
  const [pdf, setPdf] = useState<PDFDocument | null>(null);
  const [loading, setLoading] = useState(true);

  const docId = params.id as string;

  useEffect(() => {
    if (user && docId) {
      const foundPdf = getPdfById(user.uid, docId);
      setPdf(foundPdf);
    }
    setLoading(false);
  }, [user, docId]);

  if (loading) {
    return <PdfPageLoading />;
  }
  
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
