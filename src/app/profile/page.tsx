import { CvAnalyzer } from "@/components/profile/cv-analyzer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit } from "lucide-react";

export default function ProfilePage() {
  // Mock user data
  const user = {
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    headline: 'Aspiring Full-Stack Developer',
    avatar: 'https://picsum.photos/seed/janedoe/100/100',
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <Card>
            <CardContent className="p-6 flex flex-col items-center text-center">
              <Avatar className="w-24 h-24 mb-4 border-4 border-primary/20">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <h2 className="text-2xl font-bold font-headline">{user.name}</h2>
              <p className="text-muted-foreground">{user.headline}</p>
              <p className="text-sm text-muted-foreground mt-1">{user.email}</p>
              <Button variant="outline" className="mt-4 w-full">
                <Edit className="mr-2 h-4 w-4" />
                Edit Profile
              </Button>
            </CardContent>
          </Card>
        </div>
        <div className="md:col-span-2">
          <CvAnalyzer />
        </div>
      </div>
    </div>
  );
}
