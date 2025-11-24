import { jobs } from '@/lib/data';
import JobCard from '@/components/jobs/job-card';
import JobFilters from '@/components/jobs/job-filters';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export default function Home() {
  return (
    <>
      <section className="relative w-full pt-16 pb-20 md:pt-24 md:pb-28 bg-gradient-to-b from-background to-secondary/30">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
            Find Your Next Wave of Opportunity
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground">
            CareerWave connects you with the best jobs from top companies. Start your search and land your dream job today.
          </p>
          <div className="mt-8 mx-auto max-w-lg flex items-center gap-2">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search by job title or keyword..."
                className="w-full pl-10 h-12 text-base"
              />
            </div>
            <Button size="lg" className="h-12">
              <span className="hidden sm:inline">Search Jobs</span>
              <Search className="sm:hidden h-5 w-5"/>
            </Button>
          </div>
        </div>
      </section>
      
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <aside className="md:col-span-1">
            <JobFilters />
          </aside>
          <main className="md:col-span-3">
            <h2 className="text-2xl font-bold font-headline mb-6">Featured Jobs</h2>
            <div className="grid grid-cols-1 gap-6">
              {jobs.slice(0, 6).map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
            <div className="mt-8 text-center">
              <Button variant="outline">View All Jobs</Button>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
