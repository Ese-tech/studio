'use server';
/**
 * @fileOverview AI-powered tool to detect and flag inappropriate content in job postings.
 *
 * - moderateJobPostingContent - A function that handles the content moderation process.
 * - ModerateJobPostingContentInput - The input type for the moderateJobPostingContent function.
 * - ModerateJobPostingContentOutput - The return type for the moderateJobPostingContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ModerateJobPostingContentInputSchema = z.object({
  jobTitle: z.string().describe('The title of the job posting.'),
  jobDescription: z.string().describe('The full description of the job posting.'),
});
export type ModerateJobPostingContentInput = z.infer<typeof ModerateJobPostingContentInputSchema>;

const ModerateJobPostingContentOutputSchema = z.object({
  isAppropriate: z.boolean().describe('Whether the job posting content is appropriate or not.'),
  flaggedCategories: z
    .array(z.string())
    .describe(
      'A list of categories for which the content was flagged as inappropriate, or an empty array if the content is appropriate.'
    ),
  reason: z.string().describe('The reasoning behind the moderation decision.'),
});
export type ModerateJobPostingContentOutput = z.infer<typeof ModerateJobPostingContentOutputSchema>;

export async function moderateJobPostingContent(
  input: ModerateJobPostingContentInput
): Promise<ModerateJobPostingContentOutput> {
  return moderateJobPostingContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'moderateJobPostingContentPrompt',
  input: {schema: ModerateJobPostingContentInputSchema},
  output: {schema: ModerateJobPostingContentOutputSchema},
  prompt: `You are an AI-powered content moderation tool designed to detect inappropriate content in job postings.

  Analyze the job title and description provided below and determine if the content is appropriate for a professional job board.  You should be sensitive to detecting things such as hate speech, dangerous content, harrassment and sexually explicit content.

  Job Title: {{{jobTitle}}}
  Job Description: {{{jobDescription}}}

  Based on your analysis, set the isAppropriate field to true if the content is appropriate, and false if it is not.  If the content is not appropriate, provide a list of categories that the content was flagged for, and a reason for the decision.

  Categories include: Hate Speech, Dangerous Content, Harassment, Sexually Explicit

  Respond in the following JSON format:
  {
    "isAppropriate": boolean,
    "flaggedCategories": string[],
    "reason": string
  }`,
  config: {
    safetySettings: [
      {
        category: 'HARM_CATEGORY_HATE_SPEECH',
        threshold: 'BLOCK_ONLY_HIGH',
      },
      {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'BLOCK_NONE',
      },
      {
        category: 'HARM_CATEGORY_HARASSMENT',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
      },
      {
        category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
        threshold: 'BLOCK_LOW_AND_ABOVE',
      },
    ],
  },
});

const moderateJobPostingContentFlow = ai.defineFlow(
  {
    name: 'moderateJobPostingContentFlow',
    inputSchema: ModerateJobPostingContentInputSchema,
    outputSchema: ModerateJobPostingContentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
