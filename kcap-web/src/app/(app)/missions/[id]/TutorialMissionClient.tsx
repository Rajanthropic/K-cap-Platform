"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { BookOpen, CheckCircle2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function TutorialMissionClient() {
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [checks, setChecks] = useState([false, false, false]);
  const [completed, setCompleted] = useState(false);
  const router = useRouter();

  const handleEnroll = () => {
    setIsEnrolled(true);
    toast.success("Successfully enrolled in Platform Tutorial!");
  };

  const handleCheck = (index: number) => {
    const newChecks = [...checks];
    newChecks[index] = !newChecks[index];
    setChecks(newChecks);
  };

  const handleSubmit = () => {
    if (!checks.every(Boolean)) {
      toast.error("Please check all boxes to confirm you've read the tutorial.");
      return;
    }
    setCompleted(true);
    toast.success("Tutorial marked as Complete! 50 Kreds awarded!");
    setTimeout(() => {
      router.push("/missions");
    }, 2000);
  };

  return (
    <div className="max-w-[95%] 2xl:max-w-[1600px] mx-auto space-y-6">
      <Link href="/missions" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Back to Missions
      </Link>
      
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start gap-4">
            <div>
              <CardTitle className="text-2xl flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-primary" /> Platform Tutorial: How to use KCAP
              </CardTitle>
              <CardDescription className="flex items-center gap-2 mt-2">
                <Badge variant="secondary">Tutorial</Badge>
              </CardDescription>
            </div>
            <div className="text-right">
              <Badge className="bg-primary/10 text-primary hover:bg-primary/20 text-lg py-1 px-3">50 Kreds</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="font-semibold mb-2 text-lg">Welcome to KCAP!</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Here is everything you need to know about the Campus Ambassador Platform:
            </p>
            <div className="space-y-4 text-sm bg-muted/30 p-6 rounded-lg border">
              <div>
                <strong className="block text-foreground mb-1">1. Completing Missions</strong>
                <p className="text-muted-foreground">Missions are the core of KCAP. Browse the missions tab, enroll in tasks like posting reels or organizing events, and submit your proof (like a URL) to earn Kreds.</p>
              </div>
              <div>
                <strong className="block text-foreground mb-1">2. Pitching Ideas & Events</strong>
                <p className="text-muted-foreground">Have a great idea for a campus event? Go to your Profile page and use the 'Idea Box' or 'Pitch Event' forms. Management will review them and grant you Kreds or sponsorships!</p>
              </div>
              <div>
                <strong className="block text-foreground mb-1">3. Leaderboard & Ranks</strong>
                <p className="text-muted-foreground">Earn Kreds to climb the global leaderboard and flex your rank. Top performers get special overachiever badges and exclusive rewards.</p>
              </div>
            </div>
          </div>

          {isEnrolled && !completed && (
            <div className="space-y-4 pt-4 border-t">
              <h3 className="font-semibold">Checklist</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox id="c1" checked={checks[0]} onCheckedChange={() => handleCheck(0)} />
                  <label htmlFor="c1" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    I understand how to find and enroll in Missions.
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="c2" checked={checks[1]} onCheckedChange={() => handleCheck(1)} />
                  <label htmlFor="c2" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    I know how to pitch ideas from my Profile page.
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="c3" checked={checks[2]} onCheckedChange={() => handleCheck(2)} />
                  <label htmlFor="c3" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    I am ready to earn Kreds and climb the leaderboard!
                  </label>
                </div>
              </div>
            </div>
          )}

        </CardContent>
        <CardFooter className="border-t pt-6">
          {!isEnrolled ? (
            <Button className="w-full" size="lg" onClick={handleEnroll}>Accept Mission</Button>
          ) : completed ? (
            <div className="w-full bg-green-500/10 text-green-600 p-4 rounded-lg flex items-center justify-center gap-2 font-medium">
              <CheckCircle2 className="h-5 w-5" /> Tutorial Completed!
            </div>
          ) : (
            <Button className="w-full" size="lg" onClick={handleSubmit}>Complete Tutorial</Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}