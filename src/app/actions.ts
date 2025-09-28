"use server";

import { answerPdfQuestions } from '@/ai/flows/answer-pdf-questions';
import { generatePdfTest } from '@/ai/flows/generate-pdf-test';

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
