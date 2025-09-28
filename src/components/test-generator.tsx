"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BrainCircuit, Loader2 } from "lucide-react";
import { generateTestFromPdf } from "@/app/actions";
import { ScrollArea } from "./ui/scroll-area";

export default function TestGenerator({ pdfText }: { pdfText: string }) {
  const [testContent, setTestContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateTest = async () => {
    setIsLoading(true);
    setTestContent("");
    const result = await generateTestFromPdf(pdfText);
    if (result.success) {
      setTestContent(result.test);
    } else {
      setTestContent("Failed to generate test. Please try again.");
    }
    setIsLoading(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Generate a Test</CardTitle>
        <CardDescription>
          Create a multiple-choice quiz from your document to test your knowledge.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center space-y-4">
          {!testContent && !isLoading && (
            <div className="text-center space-y-4 py-8">
              <BrainCircuit className="mx-auto h-12 w-12 text-muted-foreground" />
              <p className="text-muted-foreground">Click the button to generate a test.</p>
            </div>
          )}
          <Button onClick={handleGenerateTest} disabled={isLoading} size="lg">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Generating...
              </>
            ) : (
              "Generate Test Now"
            )}
          </Button>

          {testContent && (
            <ScrollArea className="mt-6 p-4 border rounded-md w-full h-[50vh] bg-muted/50">
                <pre className="whitespace-pre-wrap font-sans text-sm">
                    {testContent}
                </pre>
            </ScrollArea>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
