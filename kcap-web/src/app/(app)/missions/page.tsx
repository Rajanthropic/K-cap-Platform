import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { CalendarDays, Users, Database, BookOpen } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export default async function MissionsPage() {
  const supabase = await createClient();
  
  const { data: dbMissions, error } = await supabase.from('missions').select('*').eq('is_visible', true);

  const mockMissions = [
    {
      id: "tutorial",
      title: "Platform Tutorial: How to use KCAP",
      type: "other",
      startDate: new Date().toISOString().split('T')[0],
      endDate: "2099-12-31",
      description: "Welcome to KCAP! This is a tutorial mission to help you understand how to enroll in missions, submit your deliverables, and earn Kreds. Click 'View & Enroll' to learn the basics!",
      credits: 0,
      enrolled: 1,
      maxParticipants: 9999,
      status: "active"
    }
  ];

  const usingMockData = !dbMissions || dbMissions.length === 0;
  
  const missions = usingMockData ? mockMissions : dbMissions.map((m: any) => ({
    id: m.id,
    title: m.title,
    type: m.mission_type,
    startDate: m.start_date,
    endDate: m.end_date,
    description: m.description,
    credits: m.total_kreds,
    enrolled: 0, 
    maxParticipants: m.max_participants || 999,
    status: m.status
  }));

  return (
    <div className="max-w-[95%] 2xl:max-w-[1600px] mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Missions</h1>
          <p className="text-muted-foreground">Browse and enroll in available missions to earn Kreds.</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {missions.map(mission => (
          <Card key={mission.id} className="flex flex-col border-primary/50 shadow-sm">
            <CardHeader className="bg-primary/5 pb-4 border-b">
              <div className="flex justify-between items-start gap-4">
                <div>
                  <CardTitle className="text-xl flex items-center gap-2">
                    {mission.id === 'tutorial' && <BookOpen className="h-5 w-5 text-primary" />}
                    {mission.title}
                  </CardTitle>
                  <CardDescription className="flex items-center gap-2 mt-2">
                    <Badge variant="secondary" className="uppercase text-[10px] tracking-wider bg-background">{mission.type.replace('_', ' ')}</Badge>
                    {mission.id !== 'tutorial' && <span className="flex items-center gap-1 text-xs"><CalendarDays className="h-3 w-3" /> {mission.startDate} - {mission.endDate}</span>}
                  </CardDescription>
                </div>
                {mission.credits > 0 && <Badge className="bg-primary/10 text-primary hover:bg-primary/20 shrink-0 border-primary/20">{mission.credits} Kreds</Badge>}
              </div>
            </CardHeader>
            <CardContent className="flex-1 pt-4">
              <p className="text-sm">{mission.description}</p>
              {mission.id !== 'tutorial' && (
                <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" /> {mission.enrolled} / {mission.maxParticipants} Enrolled
                </div>
              )}
            </CardContent>
            <CardFooter className="flex gap-4 border-t pt-4">
              {mission.id === 'tutorial' ? (
                <Dialog>
                  <DialogTrigger className={buttonVariants({ className: "w-full" })}>
                    Read Tutorial
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                      <DialogTitle>How to Use KCAP</DialogTitle>
                      <DialogDescription>
                        Welcome to the Campus Ambassador Platform!
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4 text-sm">
                      <p><strong>1. Profile & Setup:</strong> Ensure your profile is up to date with your social links and avatar so we can track your awesome work.</p>
                      <p><strong>2. Missions:</strong> Browse this tab to find tasks (like posting reels or hosting events). Complete them and submit proof to earn Kreds.</p>
                      <p><strong>3. Kreds & Shop:</strong> Kreds are your currency. The more missions you do, the more Kreds you get to spend in the Shop (coming soon!).</p>
                      <p><strong>4. Timeline:</strong> Have an idea for a cool offline event? Pitch it in your profile or view approved community events on the Timeline.</p>
                    </div>
                  </DialogContent>
                </Dialog>
              ) : (
                <Link href={`/missions/${mission.id}`} className="flex-1">
                  <Button className="w-full">View & Enroll</Button>
                </Link>
              )}
              {mission.id !== 'tutorial' && <Button variant="outline" className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/50 border-red-200 dark:border-red-900">Decline</Button>}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
