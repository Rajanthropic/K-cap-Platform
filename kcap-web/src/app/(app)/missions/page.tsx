import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarDays, Users, Database } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function MissionsPage() {
  const supabase = await createClient();
  
  // Fetch actual missions from your Supabase database!
  const { data: dbMissions, error } = await supabase.from('missions').select('*').eq('is_visible', true);

  // If your DB is empty (which it is right after running the schema), we'll fall back to these mocks 
  // so the page doesn't look blank. But once you add data to Supabase, they will show up here!
  const mockMissions = [
    {
      id: "m1",
      title: "Instagram Reel: KCAP Launch",
      type: "content",
      startDate: "2026-06-01",
      endDate: "2026-06-15",
      description: "Create an engaging Instagram reel announcing the launch of KCAP in your college.",
      credits: 100,
      enrolled: 45,
      maxParticipants: 100,
      status: "active"
    },
    {
      id: "m2",
      title: "Host a College Watch Party",
      type: "offline_event",
      startDate: "2026-06-10",
      endDate: "2026-06-20",
      description: "Organize a watch party for the upcoming Kreo e-sports tournament in your campus.",
      credits: 250,
      enrolled: 10,
      maxParticipants: 20,
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
    enrolled: 0, // In a real scenario, we'd join with mission_enrollments count
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
        {!usingMockData && (
          <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/20 flex items-center gap-1 border-green-500/20">
            <Database className="h-3 w-3" /> Connected to Supabase
          </Badge>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {missions.map(mission => (
          <Card key={mission.id} className="flex flex-col">
            <CardHeader>
              <div className="flex justify-between items-start gap-4">
                <div>
                  <CardTitle className="text-xl">{mission.title}</CardTitle>
                  <CardDescription className="flex items-center gap-2 mt-2">
                    <Badge variant="secondary" className="uppercase text-[10px] tracking-wider">{mission.type.replace('_', ' ')}</Badge>
                    <span className="flex items-center gap-1 text-xs"><CalendarDays className="h-3 w-3" /> {mission.startDate} - {mission.endDate}</span>
                  </CardDescription>
                </div>
                <Badge className="bg-primary/10 text-primary hover:bg-primary/20 shrink-0 border-primary/20">{mission.credits} Kreds</Badge>
              </div>
            </CardHeader>
            <CardContent className="flex-1">
              <p className="text-sm">{mission.description}</p>
              <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="h-4 w-4" /> {mission.enrolled} / {mission.maxParticipants} Enrolled
              </div>
            </CardContent>
            <CardFooter className="flex gap-4 border-t pt-4">
              <Link href={`/missions/${mission.id}`} className="flex-1">
                <Button className="w-full">View & Enroll</Button>
              </Link>
              <Button variant="outline" className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/50 border-red-200 dark:border-red-900">Decline</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
