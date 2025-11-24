import { JobPostForm } from "@/components/employer/job-post-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function PostJobPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Create a New Job Posting</CardTitle>
            <CardDescription>Fill out the details below to find your next great hire.</CardDescription>
          </CardHeader>
          <CardContent>
            <JobPostForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
