"use client";

import { useAuth } from "@/context/auth-context";
import { getUserPdfs } from "@/app/actions";
import { PDFDocument } from "@/lib/types";
import { useEffect, useState } from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { FileText, Loader2 } from "lucide-react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

export default function PdfList() {
  const { user } = useAuth();
  const [pdfs, setPdfs] = useState<PDFDocument[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      const fetchPdfs = async () => {
        setLoading(true);
        const idToken = await user.getIdToken();
        const userPdfs = await getUserPdfs(idToken);
        setPdfs(userPdfs);
        setLoading(false);
      };
      fetchPdfs();
    } else {
        // If there's no user, we're probably still in the initial loading state of the auth context.
        // If it finishes and there's no user, the auth guard will redirect.
        // So we can just show loading.
        setLoading(true);
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
                Uploaded {formatDistanceToNow(pdf.createdAt.toDate(), { addSuffix: true })}
              </CardDescription>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
}
