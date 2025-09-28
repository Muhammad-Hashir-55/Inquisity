'use server';

/**
 * @fileOverview A flow to generate a test from a PDF document.
 *
 * - generatePdfTest - A function that generates a test from a PDF document.
 * - GeneratePdfTestInput - The input type for the generatePdfTest function.
 * - GeneratePdfTestOutput - The return type for the generatePdfTest function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePdfTestInputSchema = z.object({
  pdfText: z
    .string()
    .describe('The text content extracted from the PDF document.'),
});
export type GeneratePdfTestInput = z.infer<typeof GeneratePdfTestInputSchema>;

const GeneratePdfTestOutputSchema = z.object({
  testQuestions: z
    .string()
    .describe('A set of test questions generated from the PDF content.'),
});
export type GeneratePdfTestOutput = z.infer<typeof GeneratePdfTestOutputSchema>;

export async function generatePdfTest(input: GeneratePdfTestInput): Promise<GeneratePdfTestOutput> {
  return generatePdfTestFlow(input);
}

const generatePdfTestPrompt = ai.definePrompt({
  name: 'generatePdfTestPrompt',
  input: {schema: GeneratePdfTestInputSchema},
  output: {schema: GeneratePdfTestOutputSchema},
  prompt: `You are an expert test generator. Given the content of a PDF document, generate a set of multiple-choice questions to test the user's understanding of the material.

PDF Content: {{{pdfText}}}

Generate a test with multiple-choice questions and answers. Return the test as a string.
`,
});

const generatePdfTestFlow = ai.defineFlow(
  {
    name: 'generatePdfTestFlow',
    inputSchema: GeneratePdfTestInputSchema,
    outputSchema: GeneratePdfTestOutputSchema,
  },
  async input => {
    const {output} = await generatePdfTestPrompt(input);
    return output!;
  }
);
