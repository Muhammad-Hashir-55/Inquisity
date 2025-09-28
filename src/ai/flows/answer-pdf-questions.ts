'use server';

/**
 * @fileOverview This file defines a Genkit flow for answering questions based on the content of a PDF document.
 *
 * It includes:
 * - `answerPdfQuestions`:  The main function to call to get answers to questions about a PDF.
 * - `AnswerPdfQuestionsInput`: The input type for the `answerPdfQuestions` function.
 * - `AnswerPdfQuestionsOutput`: The output type for the `answerPdfQuestions` function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnswerPdfQuestionsInputSchema = z.object({
  pdfText: z.string().describe('The text content extracted from the PDF document.'),
  question: z.string().describe('The question to be answered based on the PDF content.'),
});
export type AnswerPdfQuestionsInput = z.infer<typeof AnswerPdfQuestionsInputSchema>;

const AnswerPdfQuestionsOutputSchema = z.object({
  answer: z.string().describe('The answer to the question based on the PDF content.'),
});
export type AnswerPdfQuestionsOutput = z.infer<typeof AnswerPdfQuestionsOutputSchema>;

export async function answerPdfQuestions(input: AnswerPdfQuestionsInput): Promise<AnswerPdfQuestionsOutput> {
  return answerPdfQuestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'answerPdfQuestionsPrompt',
  input: {schema: AnswerPdfQuestionsInputSchema},
  output: {schema: AnswerPdfQuestionsOutputSchema},
  prompt: `You are an AI assistant that answers questions based on the content of a PDF document.

  PDF Content: {{{pdfText}}}

  Question: {{{question}}}

  Answer:`,
});

const answerPdfQuestionsFlow = ai.defineFlow(
  {
    name: 'answerPdfQuestionsFlow',
    inputSchema: AnswerPdfQuestionsInputSchema,
    outputSchema: AnswerPdfQuestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
