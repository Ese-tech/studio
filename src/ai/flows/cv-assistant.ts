// CV_Assistant Story: As a job seeker, I want to upload my CV and get suggestions on how to improve it so I can increase my chances of getting noticed by recruiters.

'use server';

/**
 * @fileOverview An AI agent that provides suggestions on how to improve a CV.
 *
 * - improveCv - A function that handles the CV improvement process.
 * - ImproveCvInput - The input type for the improveCv function.
 * - ImproveCvOutput - The return type for the improveCv function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ImproveCvInputSchema = z.object({
  cvDataUri: z
    .string()
    .describe(
      'The CV document, as a data URI that must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.' // keep the backslashes, they're needed.
    ),
});
export type ImproveCvInput = z.infer<typeof ImproveCvInputSchema>;

const ImproveCvOutputSchema = z.object({
  suggestions: z.string().describe('Suggestions on how to improve the CV.'),
});
export type ImproveCvOutput = z.infer<typeof ImproveCvOutputSchema>;

export async function improveCv(input: ImproveCvInput): Promise<ImproveCvOutput> {
  return improveCvFlow(input);
}

const prompt = ai.definePrompt({
  name: 'improveCvPrompt',
  input: {schema: ImproveCvInputSchema},
  output: {schema: ImproveCvOutputSchema},
  prompt: `You are an expert career coach. A job seeker has uploaded their CV. Review it and provide detailed suggestions on how to improve it so that they can increase their chances of getting noticed by recruiters.

CV: {{media url=cvDataUri}}`,
});

const improveCvFlow = ai.defineFlow(
  {
    name: 'improveCvFlow',
    inputSchema: ImproveCvInputSchema,
    outputSchema: ImproveCvOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
