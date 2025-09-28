"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Upload, FileCheck, AlertCircle } from "lucide-react";
import { useAuth } from "@/context/auth-context";
import { savePdfToLocalStorage } from "@/lib/local-storage";

export function PdfUploadModal() {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "uploading" | "success" | "error">("idle");
  const [progressMessage, setProgressMessage] = useState("");
  const { toast } = useToast();
  const { user } = useAuth();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type !== "application/pdf") {
        toast({
          variant: "destructive",
          title: "Invalid File Type",
          description: "Please select a PDF file.",
        });
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast({
        variant: "destructive",
        title: "No File Selected",
        description: "Please select a PDF file to upload.",
      });
      return;
    }
    
    if (!user) {
        toast({
            variant: "destructive",
            title: "Authentication Error",
            description: "You must be logged in to upload a file.",
        });
        return;
    }

    setStatus("uploading");
    setProgressMessage("Preparing file...");

    try {
      const fileBuffer = await file.arrayBuffer();

      setProgressMessage("Extracting text from PDF...");
      // Dynamically import pdfjs-dist
      const pdfjs = await import("pdfjs-dist");
      pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

      const loadingTask = pdfjs.getDocument({ data: fileBuffer });
      const pdf = await loadingTask.promise;
      let text = "";
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        text += textContent.items.map((item: any) => item.str).join(" ");
      }
      
      setProgressMessage("Saving to local storage...");
      savePdfToLocalStorage(user.uid, file.name, text);

      setStatus("success");
      setProgressMessage("Upload complete!");
      toast({
        title: "Upload Successful",
        description: `${file.name} has been saved locally.`,
      });

      // Dispatch a custom event to notify other components like PdfList
      window.dispatchEvent(new CustomEvent('pdfsUpdated'));

      setTimeout(() => {
        setOpen(false);
        resetState();
      }, 1500);

    } catch (error: any) {
      setStatus("error");
      setProgressMessage(`Upload failed: ${error.message}`);
      toast({
        variant: "destructive",
        title: "Upload Failed",
        description: error.message || "An unknown error occurred.",
      });
    }
  };

  const resetState = () => {
    setFile(null);
    setStatus("idle");
    setProgressMessage("");
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => { if(!isOpen) resetState(); setOpen(isOpen);}}>
      <DialogTrigger asChild>
        <Button>
          <Upload className="mr-2 h-4 w-4" />
          Upload PDF
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Upload New PDF</DialogTitle>
          <DialogDescription>
            Select a PDF file to upload. It will be saved in your browser's local storage.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {status === "idle" && (
            <>
              <Input id="pdf-file" type="file" accept=".pdf" onChange={handleFileChange} />
              {file && <p className="text-sm text-muted-foreground">Selected: {file.name}</p>}
            </>
          )}

          {status !== "idle" && (
            <div className="flex flex-col items-center justify-center space-y-4 p-8 bg-muted/50 rounded-lg">
              {status === "uploading" && <Loader2 className="h-10 w-10 animate-spin text-primary" />}
              {status === "success" && <FileCheck className="h-10 w-10 text-green-500" />}
              {status === "error" && <AlertCircle className="h-10 w-10 text-destructive" />}
              <p className="text-sm text-muted-foreground text-center">{progressMessage}</p>
            </div>
          )}
        </div>
        <DialogFooter>
          {status === "idle" ? (
             <>
              <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
              <Button onClick={handleUpload} disabled={!file}>Save File</Button>
            </>
          ) : (
            <DialogClose asChild><Button variant="outline">Close</Button></DialogClose>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
