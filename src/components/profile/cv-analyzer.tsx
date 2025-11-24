'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { improveCv } from '@/ai/flows/cv-assistant';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';

export function CvAnalyzer() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string | null>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.size > 4 * 1024 * 1024) { // 4MB limit
        toast({
          variant: 'destructive',
          title: 'File too large',
          description: 'Please upload a file smaller than 4MB.',
        });
        return;
      }
      setFile(selectedFile);
      setSuggestions(null);
    }
  };

  const handleAnalyze = async () => {
    if (!file) {
      toast({
        variant: 'destructive',
        title: 'No file selected',
        description: 'Please select a CV file to analyze.',
      });
      return;
    }

    setLoading(true);
    setSuggestions(null);

    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async (event) => {
        const cvDataUri = event.target?.result as string;
        try {
          const result = await improveCv({ cvDataUri });
          setSuggestions(result.suggestions);
          toast({
            title: 'Analysis Complete',
            description: 'Your CV suggestions are ready.',
          });
        } catch (aiError) {
          console.error('AI analysis error:', aiError);
          toast({
            variant: 'destructive',
            title: 'Analysis Failed',
            description: 'There was an error analyzing your CV. Please try again.',
          });
        } finally {
          setLoading(false);
        }
      };
      reader.onerror = (error) => {
        console.error('File reading error:', error);
        toast({
            variant: 'destructive',
            title: 'File Error',
            description: 'Could not read the selected file.',
        });
        setLoading(false);
      }
    } catch (error) {
      console.error('Error in handleAnalyze:', error);
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-2xl">AI CV Assistant</CardTitle>
        <CardDescription>Upload your CV (PDF, DOCX) to get instant feedback and suggestions for improvement from our AI coach.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Input type="file" onChange={handleFileChange} accept=".pdf,.doc,.docx" />
          <p className="text-xs text-muted-foreground">Max file size: 4MB.</p>
        </div>
        <Button onClick={handleAnalyze} disabled={!file || loading} className="w-full sm:w-auto">
          {loading ? 'Analyzing...' : 'Analyze My CV'}
        </Button>
        {suggestions && (
          <Alert>
            <Terminal className="h-4 w-4" />
            <AlertTitle>AI Suggestions</AlertTitle>
            <AlertDescription>
                <div className="prose prose-sm max-w-none whitespace-pre-wrap mt-2">{suggestions}</div>
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}
