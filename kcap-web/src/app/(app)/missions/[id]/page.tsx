import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CalendarDays, Users, CheckCircle2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import TutorialMissionClient from "./TutorialMissionClient";

export default async function MissionDetailPage({ params }: { params: Promise<{ id: string }> }) {
  // In a real app, fetch mission details by ID
  const resolvedParams = await params;
  
  if (resolvedParams.id === 'tutorial') {
    return <TutorialMissionClient />;
  }
  
  const isEnrolled = resolvedParams.id === 'm1'; // Mock state for demo

  return (
    <div className="max-w-[95%] 2xl:max-w-[1600px] mx-auto space-y-6">
      <Link href="/missions" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Back to Missions
      </Link>
      
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start gap-4">
            <div>
              <CardTitle className="text-2xl">Instagram Reel: KCAP Launch</CardTitle>
              <CardDescription className="flex items-center gap-2 mt-2">
                <Badge variant="secondary">Content</Badge>
                <span className="flex items-center gap-1 text-sm"><CalendarDays className="h-4 w-4" /> Jun 1 - Jun 15, 2026</span>
              </CardDescription>
            </div>
            <div className="text-right">
              <Badge className="bg-primary/10 text-primary hover:bg-primary/20 text-lg py-1 px-3">100 Kreds Max</Badge>
              <div className="text-sm text-muted-foreground mt-2 flex items-center justify-end gap-1"><Users className="h-4 w-4"/> 45/100 Enrolled</div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="font-semibold mb-2">Description</h3>
            <p className="text-sm text-muted-foreground">Create an engaging Instagram reel announcing the launch of KCAP in your college. Make sure to tag @crio_hq and use the hashtag #KCAPLaunch. The reel should highlight the benefits of joining KCAP.</p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">Targets</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500" /> Get 500+ views</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500" /> Get 50+ likes</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500" /> 5+ comments</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Reward Tiers</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-muted p-3 rounded-lg text-center">
                <div className="text-sm font-medium">Bronze</div>
                <div className="text-xs text-muted-foreground">0-30% Targets</div>
                <div className="font-bold text-primary mt-1">20 Kreds</div>
              </div>
              <div className="bg-muted p-3 rounded-lg text-center">
                <div className="text-sm font-medium">Silver</div>
                <div className="text-xs text-muted-foreground">30-70% Targets</div>
                <div className="font-bold text-primary mt-1">50 Kreds</div>
              </div>
              <div className="bg-muted p-3 rounded-lg text-center border border-primary/50">
                <div className="text-sm font-medium">Gold</div>
                <div className="text-xs text-muted-foreground">70-100% Targets</div>
                <div className="font-bold text-primary mt-1">100 Kreds</div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t pt-6">
          {!isEnrolled ? (
            <div className="w-full space-y-4">
              <div className="space-y-2">
                <Label htmlFor="tshirt">T-Shirt Size (Prerequisite)</Label>
                <Input id="tshirt" placeholder="e.g. M, L, XL" />
              </div>
              <Button className="w-full" size="lg">Enroll in Mission</Button>
            </div>
          ) : (
            <div className="w-full space-y-4">
              <div className="bg-green-50 text-green-700 p-3 rounded-lg flex items-center justify-center gap-2 font-medium">
                <CheckCircle2 className="h-5 w-5" /> You are enrolled in this mission!
              </div>
              <div className="border rounded-lg p-4 space-y-4">
                <h3 className="font-semibold">Submit Deliverables</h3>
                <div className="space-y-2">
                  <Label>Instagram Reel Link</Label>
                  <Input type="url" placeholder="https://instagram.com/reel/..." />
                </div>
                <div className="space-y-2">
                  <Label>Report / Notes</Label>
                  <Textarea placeholder="Share any additional context or metrics here..." />
                </div>
                <div className="space-y-2">
                  <Label>Views Achieved</Label>
                  <Input type="number" placeholder="e.g. 650" />
                </div>
                <Button className="w-full">Submit for Review</Button>
              </div>
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
