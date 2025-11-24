import Image from 'next/image';
import { notFound } from 'next/navigation';
import { formatDistanceToNow } from 'date-fns';
import { jobs } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, MapPin, Clock, ExternalLink } from 'lucide-react';

export default function JobDetailPage({ params }: { params: { id: string } }) {
  const job = jobs.find((j) => j.id === params.id);

  if (!job) {
    notFound();
  }

  const companyLogo = PlaceHolderImages.find(p => p.id === job.company.logoId);
  const postedAt = formatDistanceToNow(new Date(job.postedAt), { addSuffix: true });

  return (
    <div className="bg-secondary/30">
      <div className="container mx-auto px-4 py-12 md:py-20">
        <header className="mb-12">
          <div className="flex items-start gap-6">
            {companyLogo && (
               <div className="w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden flex items-center justify-center bg-card shadow-sm border">
                <Image
                  src={companyLogo.imageUrl}
                  alt={`${job.company.name} logo`}
                  width={60}
                  height={60}
                  className="object-contain"
                  data-ai-hint={companyLogo.imageHint}
                />
              </div>
            )}
            <div className="flex-grow">
              <h1 className="font-headline text-3xl md:text-4xl font-bold">{job.title}</h1>
              <p className="text-lg text-muted-foreground mt-1">{job.company.name}</p>
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground mt-4">
                <div className="flex items-center gap-1.5"><Briefcase className="h-4 w-4" />{job.category}</div>
                <div className="flex items-center gap-1.5"><MapPin className="h-4 w-4" />{job.location}</div>
                <div className="flex items-center gap-1.5"><Clock className="h-4 w-4" />{postedAt}</div>
              </div>
            </div>
            <div className="hidden sm:block">
              <Button size="lg">Apply Now</Button>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            <Card>
              <CardHeader><CardTitle className="font-headline">Job Description</CardTitle></CardHeader>
              <CardContent className="prose prose-sm max-w-none text-foreground">
                <p>{job.description}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle className="font-headline">Responsibilities</CardTitle></CardHeader>
              <CardContent className="prose prose-sm max-w-none text-foreground">
                <ul className="list-disc pl-5 space-y-2">
                  {job.responsibilities.map((item, index) => <li key={index}>{item}</li>)}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle className="font-headline">Requirements</CardTitle></CardHeader>
              <CardContent className="prose prose-sm max-w-none text-foreground">
                <ul className="list-disc pl-5 space-y-2">
                  {job.requirements.map((item, index) => <li key={index}>{item}</li>)}
                </ul>
              </CardContent>
            </Card>
          </div>
          
          <aside className="space-y-6">
            <Card className="text-center">
              <CardHeader><CardTitle className="font-headline text-lg">Salary</CardTitle></CardHeader>
              <CardContent>
                <p className="text-2xl font-semibold text-primary">{job.salary}</p>
                <p className="text-sm text-muted-foreground">per year</p>
              </CardContent>
            </Card>
            <Card>
               <CardHeader><CardTitle className="font-headline text-lg">Contract Type</CardTitle></CardHeader>
              <CardContent className="flex items-center justify-center">
                <Badge variant="default" className="text-base px-4 py-1">{job.contractType}</Badge>
              </CardContent>
            </Card>
            <div className="sm:hidden">
              <Button size="lg" className="w-full">Apply Now</Button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
