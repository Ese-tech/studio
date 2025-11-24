'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { moderateJobPostingContent } from '@/ai/flows/job-posting-content-moderation';
import { contractTypes, jobCategories } from '@/lib/constants';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { AlertCircle } from 'lucide-react';

const formSchema = z.object({
  jobTitle: z.string().min(5, 'Job title must be at least 5 characters.'),
  jobDescription: z.string().min(50, 'Description must be at least 50 characters.'),
  location: z.string().min(2, 'Location is required.'),
  category: z.enum(jobCategories),
  contractType: z.enum(contractTypes),
  salary: z.string().min(3, 'Salary is required.'),
});

export function JobPostForm() {
  const [loading, setLoading] = useState(false);
  const [moderationResult, setModerationResult] = useState<{ isAppropriate: boolean; reason: string } | null>(null);
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      jobTitle: '',
      jobDescription: '',
      location: '',
      salary: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
      const moderation = await moderateJobPostingContent({
        jobTitle: values.jobTitle,
        jobDescription: values.jobDescription,
      });

      if (!moderation.isAppropriate) {
        setModerationResult({ isAppropriate: false, reason: moderation.reason });
      } else {
        // Proceed with form submission
        console.log('Job posting is appropriate. Submitting:', values);
        toast({
          title: 'Success!',
          description: 'Your job posting has been submitted for review.',
        });
        form.reset();
      }
    } catch (error) {
      console.error('Error during moderation:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not moderate job posting content.',
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FormField control={form.control} name="jobTitle" render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Title</FormLabel>
                  <FormControl><Input placeholder="e.g., Senior Frontend Developer" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField control={form.control} name="location" render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl><Input placeholder="e.g., San Francisco, CA" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField control={form.control} name="category" render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl><SelectTrigger><SelectValue placeholder="Select a category" /></SelectTrigger></FormControl>
                    <SelectContent>
                      {jobCategories.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField control={form.control} name="contractType" render={({ field }) => (
                <FormItem>
                  <FormLabel>Contract Type</FormLabel>
                   <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl><SelectTrigger><SelectValue placeholder="Select a contract type" /></SelectTrigger></FormControl>
                    <SelectContent>
                      {contractTypes.map(type => <SelectItem key={type} value={type}>{type}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField control={form.control} name="salary" render={({ field }) => (
              <FormItem>
                <FormLabel>Salary Range</FormLabel>
                <FormControl><Input placeholder="e.g., $120,000 - $160,000" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField control={form.control} name="jobDescription" render={({ field }) => (
              <FormItem>
                <FormLabel>Job Description</FormLabel>
                <FormControl><Textarea placeholder="Describe the job role, responsibilities, and qualifications." {...field} rows={8} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full md:w-auto" disabled={loading}>
            {loading ? 'Analyzing...' : 'Post Job'}
          </Button>
        </form>
      </Form>
      <AlertDialog open={moderationResult?.isAppropriate === false} onOpenChange={() => setModerationResult(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertCircle className="text-destructive" />
              Content Moderation Alert
            </AlertDialogTitle>
            <AlertDialogDescription>
              Our AI has detected potentially inappropriate content in your job posting. Please review and revise the content before posting.
              <br /><br />
              <strong>Reason:</strong> {moderationResult?.reason}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setModerationResult(null)}>I Understand</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
