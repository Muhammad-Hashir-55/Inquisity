"use server";

import { firestore, storage } from "@/lib/firebase";
import { PDFDocument } from "@/lib/types";
import { addDoc, collection, getDocs, query, serverTimestamp, doc, getDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { revalidatePath } from "next/cache";
import { answerPdfQuestions } from '@/ai/flows/answer-pdf-questions';
import { generatePdfTest } from '@/ai/flows/generate-pdf-test';
import { adminAuth } from "@/lib/firebase-admin";


async function getAuthenticatedUser(idToken: string) {
    if (!adminAuth) {
        throw new Error("Firebase Admin SDK not initialized. Check server logs for details.");
    }
    try {
        const decodedToken = await adminAuth.verifyIdToken(idToken);
        return decodedToken;
    } catch (error) {
        console.error("Error verifying ID token:", error);
        return null;
    }
}


export async function uploadPdfAndCreateDocument(
  idToken: string,
  fileName: string,
  fileBuffer: ArrayBuffer,
  extractedText: string
) {
  try {
    const user = await getAuthenticatedUser(idToken);
    if (!user) {
        throw new Error("User is not authenticated.");
    }
    
    // Upload file to Firebase Storage
    const storageRef = ref(storage, `users/${user.uid}/pdfs/${Date.now()}_${fileName}`);
    await uploadBytes(storageRef, fileBuffer);
    
    // Create document in Firestore
    const pdfsCollection = collection(firestore, 'users', user.uid, 'pdfs');
    await addDoc(pdfsCollection, {
      name: fileName,
      storagePath: storageRef.fullPath,
      text: extractedText,
      createdAt: serverTimestamp(),
      userId: user.uid,
    });

    revalidatePath("/dashboard");
    return { success: true, message: "File uploaded successfully." };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

export async function getUserPdfs(idToken: string): Promise<PDFDocument[]> {
    try {
        const user = await getAuthenticatedUser(idToken);
        if (!user) {
            return [];
        }
        const q = query(collection(firestore, 'users', user.uid, 'pdfs'));
        const querySnapshot = await getDocs(q);
        const pdfs: PDFDocument[] = [];
        querySnapshot.forEach((doc) => {
            pdfs.push({ id: doc.id, ...doc.data() } as PDFDocument);
        });
        return pdfs.sort((a, b) => b.createdAt.toMillis() - a.createdAt.toMillis());
    } catch (error) {
        console.error("Error getting user PDFs:", error);
        return [];
    }
}


export async function getPdfDocument(idToken: string, docId: string): Promise<PDFDocument | null> {
    try {
        const user = await getAuthenticatedUser(idToken);
        if (!user) {
            return null;
        }

        const docRef = doc(firestore, 'users', user.uid, 'pdfs', docId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() } as PDFDocument;
        } else {
            console.log("No such document!");
            return null;
        }
    } catch (error) {
        console.error("Error getting document:", error);
        return null;
    }
}

export async function askQuestionAboutPdf(pdfText: string, question: string) {
    try {
        if (!question.trim()) {
            return { success: false, answer: "Question cannot be empty." };
        }
        const result = await answerPdfQuestions({ pdfText, question });
        return { success: true, answer: result.answer };
    } catch (error: any) {
        console.error("Error asking question:", error);
        return { success: false, answer: "Sorry, I couldn't process your question." };
    }
}


export async function generateTestFromPdf(pdfText: string) {
    try {
        const result = await generatePdfTest({ pdfText });
        return { success: true, test: result.testQuestions };
    } catch (error: any) {
        console.error("Error generating test:", error);
        return { success: false, test: "Sorry, I couldn't generate a test at this moment." };
    }
}
