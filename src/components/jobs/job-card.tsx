import Image from 'next/image';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import type { Job } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Briefcase, MapPin, Clock } from 'lucide-react';

interface JobCardProps {
  job: Job;
}

export default function JobCard({ job }: JobCardProps) {
  const companyLogo = PlaceHolderImages.find(p => p.id === job.company.logoId);
  const postedAt = formatDistanceToNow(new Date(job.postedAt), { addSuffix: true });

  return (
    <Card className="hover:shadow-md transition-shadow duration-300 flex flex-col">
      <CardHeader className="flex flex-row items-start gap-4">
        {companyLogo && (
          <div className="w-12 h-12 flex-shrink-0 rounded-lg overflow-hidden flex items-center justify-center bg-secondary">
             <Image
              src={companyLogo.imageUrl}
              alt={`${job.company.name} logo`}
              width={40}
              height={40}
              className="object-contain"
              data-ai-hint={companyLogo.imageHint}
            />
          </div>
        )}
        <div className="flex-grow">
          <CardTitle className="text-xl font-headline group-hover:text-primary">
            <Link href={`/job/${job.id}`} className="stretched-link">
              {job.title}
            </Link>
          </CardTitle>
          <CardDescription className="text-sm">{job.company.name}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Briefcase className="h-4 w-4" />
            <span>{job.category}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin className="h-4 w-4" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            <span>{postedAt}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <span className="text-lg font-semibold text-foreground">{job.salary}</span>
        <div className="flex gap-2">
            <Badge variant="secondary">{job.contractType}</Badge>
        </div>
      </CardFooter>
    </Card>
  );
}
