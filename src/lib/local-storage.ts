import { PDFDocument } from "./types";

const getStorageKey = (userId: string) => `inquisity_pdfs_${userId}`;

// Function to get all PDFs for a user
export function getUserPdfsFromLocalStorage(userId: string): PDFDocument[] {
    if (typeof window === 'undefined') return [];
    const storageKey = getStorageKey(userId);
    const storedPdfs = localStorage.getItem(storageKey);
    if (storedPdfs) {
        const pdfs: PDFDocument[] = JSON.parse(storedPdfs);
        // Sort by creation date, newest first
        return pdfs.sort((a, b) => b.createdAt - a.createdAt);
    }
    return [];
}

// Function to get a single PDF by its ID
export function getPdfById(userId: string, pdfId: string): PDFDocument | null {
    if (typeof window === 'undefined') return null;
    const userPdfs = getUserPdfsFromLocalStorage(userId);
    return userPdfs.find(pdf => pdf.id === pdfId) || null;
}

// Function to save a new PDF
export function savePdfToLocalStorage(userId: string, fileName: string, textContent: string) {
    if (typeof window === 'undefined') return;
    const userPdfs = getUserPdfsFromLocalStorage(userId);
    
    const newPdf: PDFDocument = {
        id: crypto.randomUUID(),
        name: fileName,
        storagePath: fileName, // Using filename as a placeholder
        text: textContent,
        createdAt: Date.now(),
        userId: userId
    };

    userPdfs.push(newPdf);

    const storageKey = getStorageKey(userId);
    localStorage.setItem(storageKey, JSON.stringify(userPdfs));
}

// Function to delete a PDF
export function deletePdfFromLocalStorage(userId: string, pdfId: string) {
    if (typeof window === 'undefined') return;
    let userPdfs = getUserPdfsFromLocalStorage(userId);
    userPdfs = userPdfs.filter(pdf => pdf.id !== pdfId);

    const storageKey = getStorageKey(userId);
    localStorage.setItem(storageKey, JSON.stringify(userPdfs));
}
