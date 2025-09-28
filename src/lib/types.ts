import type { Timestamp } from "firebase/firestore";

export interface PDFDocument {
  id: string;
  name: string;
  storagePath: string;
  text: string;
  createdAt: Timestamp;
  userId: string;
}
