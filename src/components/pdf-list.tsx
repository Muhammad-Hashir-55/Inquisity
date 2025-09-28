"use client";

import { useAuth } from "@/context/auth-context";
import { PDFDocument } from "@/lib/types";
import { useEffect, useState } from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { FileText, Loader2 } from "lucide-react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { getUserPdfsFromLocalStorage } from "@/lib/local-storage";

export default function PdfList() {
  const { user } = useAuth();
  const [pdfs, setPdfs] = useState<PDFDocument[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setLoading(true);
      const userPdfs = getUserPdfsFromLocalStorage(user.uid);
      setPdfs(userPdfs);
      setLoading(false);
    } else {
        setLoading(true);
    }

    // Set up a listener for storage changes to update the list
    const handleStorageChange = () => {
      if (user) {
        const userPdfs = getUserPdfsFromLocalStorage(user.uid);
        setPdfs(userPdfs);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('pdfsUpdated', handleStorageChange);


    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('pdfsUpdated', handleStorageChange);
    }

  }, [user]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-16">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground">Loading your documents...</p>
      </div>
    );
  }

  if (pdfs.length === 0) {
    return (
      <div className="text-center py-16 border-2 border-dashed rounded-lg">
        <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
        <h3 className="mt-4 text-lg font-medium">No Documents Found</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Get started by uploading your first PDF.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {pdfs.map((pdf) => (
        <Link href={`/dashboard/pdf/${pdf.id}`} key={pdf.id}>
          <Card className="hover:border-primary/80 hover:shadow-md transition-all">
            <CardHeader>
              <div className="flex items-start justify-between">
                <FileText className="h-8 w-8 text-primary" />
              </div>
            </CardHeader>
            <div className="p-6 pt-0">
               <CardTitle className="text-base font-medium truncate mb-1" title={pdf.name}>
                {pdf.name}
              </CardTitle>
              <CardDescription>
                Uploaded {formatDistanceToNow(new Date(pdf.createdAt), { addSuffix: true })}
              </CardDescription>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
}
