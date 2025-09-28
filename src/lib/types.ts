export interface PDFDocument {
  id: string;
  name: string;
  storagePath: string; // This can be deprecated or repurposed if needed. For now, it will be the filename.
  text: string;
  createdAt: number; // Storing as timestamp (milliseconds)
  userId: string;
}
