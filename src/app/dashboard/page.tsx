import { getUserPdfs } from "@/app/actions";
import PdfList from "@/components/pdf-list";
import { auth } from "@/lib/firebase";
import { PdfUploadModal } from "@/components/pdf-upload-modal";

export default function DashboardPage() {
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
      <PdfList />
    </div>
  );
}
