import { getUserPdfs } from "@/app/actions";
import PdfList from "@/components/pdf-list";
import { auth } from "@/lib/firebase";
import { currentUser } from "@genkit-ai/next/auth";
import { PdfUploadModal } from "@/components/pdf-upload-modal";

export default async function DashboardPage() {
  // This is a workaround to get the user on the server.
  // In a real app, you'd get this from your session management.
  // For now, we assume the user is logged in if they reach this page,
  // but we can't get the UID directly without a proper session.
  // We'll rely on the client to pass the UID where needed.
  // A better server-side solution would involve middleware or Next-Auth.js.
  // However, we will use the client-side user for now.
  const user = await currentUser();
  const pdfs = user ? await getUserPdfs(user.uid) : [];

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold font-headline">Your Documents</h1>
          <p className="text-muted-foreground">
            Upload, manage, and interact with your PDFs.
          </p>
        </div>
        <PdfUploadModal />
      </div>
      <PdfList initialPdfs={pdfs} />
    </div>
  );
}
