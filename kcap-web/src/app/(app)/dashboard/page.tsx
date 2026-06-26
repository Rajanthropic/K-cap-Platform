import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Users, AlertCircle, FileCheck2, CalendarClock, ChevronRight, CalendarDays, Lightbulb, PlusCircle, CheckCircle2, XCircle, Trophy, Compass } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ExportCSVButton } from "@/components/ExportCSVButton";
import { createClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return null; // Let layout handle the redirect

  const { data: profile } = await supabase.from('users').select('*').eq('id', user.id).single();
  
  const isManagement = profile?.role === 'admin' || profile?.role === 'management';

  if (!isManagement) {
    return (
      <div className="max-w-[95%] 2xl:max-w-[1600px] mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome, {profile?.full_name || 'Kreon'}!</h1>
          <p className="text-muted-foreground">Here is your quick overview of the Kreon platform.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Your Kreds</CardTitle>
              <Trophy className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{profile?.kreds || 0}</div>
              <p className="text-xs text-muted-foreground">Keep completing missions to earn more!</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Missions</CardTitle>
              <Compass className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">You are currently not enrolled in any missions.</p>
            </CardContent>
          </Card>
        </div>
        
        {/* Social Feed Component */}
        <div className="mt-8 space-y-4">
          <h2 className="text-xl font-bold border-b pb-2">Community Feed</h2>
          
          <Card className="bg-muted/30">
            <CardContent className="p-4">
              <div className="flex gap-4">
                <div className="h-10 w-10 rounded-full bg-accent flex items-center justify-center font-bold text-muted-foreground shrink-0">
                  {profile?.full_name?.charAt(0) || 'U'}
                </div>
                <div className="flex-1 space-y-3">
                  <textarea 
                    placeholder="Share what you played today, an idea, or an update!" 
                    className="w-full bg-transparent border-b border-primary/20 focus:border-primary outline-none resize-none p-2 text-sm"
                    rows={2}
                  />
                  <div className="flex justify-end">
                    <Button size="sm">Post Update</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4 pt-4">
            <div className="text-center text-muted-foreground py-12 border rounded-xl border-dashed">
              No posts yet. Be the first to share an update!
            </div>
          </div>
        </div>

      </div>
    );
  }

  return (
    <div className="max-w-[95%] 2xl:max-w-[1600px] mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Management Dashboard</h1>
          <p className="text-muted-foreground">Overview of platform activity, missions, and users.</p>
        </div>
        <Button className="gap-2"><PlusCircle className="h-4 w-4" /> Create Mission</Button>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="bg-muted/50 border">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="missions">Missions</TabsTrigger>
          <TabsTrigger value="pitches">Event Pitches</TabsTrigger>
          <TabsTrigger value="kreons">Kreons (Admin)</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Kreons</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">224</div>
                <p className="text-xs text-muted-foreground">Across 15 batches</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
                <FileCheck2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">Mission deliverables</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Event Requests</CardTitle>
                <CalendarClock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5</div>
                <p className="text-xs text-muted-foreground">Awaiting review</p>
              </CardContent>
            </Card>
            <Card className="border-red-200 bg-red-50/50 dark:bg-red-950/20 dark:border-red-900/50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-red-800 dark:text-red-400">At Risk / Inactive</CardTitle>
                <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-700 dark:text-red-500">8</div>
                <p className="text-xs text-red-600/80 dark:text-red-400/80">Inactive for &gt; 60 days</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Recent Deliverables</CardTitle>
                <CardDescription>Mission submissions awaiting review.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Kreon</TableHead>
                      <TableHead>Mission</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell colSpan={3} className="text-center text-muted-foreground h-24">No recent deliverables.</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card className="col-span-1 border-amber-200 bg-amber-50/10 dark:bg-amber-950/10 dark:border-amber-900/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><CalendarDays className="h-5 w-5 text-amber-500" /> Kreon Unavailability</CardTitle>
                <CardDescription>Track exam schedules and leaves to optimize mission timings.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-16 w-16 rounded-full border-4 border-amber-500/20 flex items-center justify-center">
                    <span className="text-xl font-bold text-amber-600">25</span>
                  </div>
                  <div>
                    <p className="font-semibold">Kreons Unavailable</p>
                    <p className="text-sm text-muted-foreground">Out of 80 active Kreons (31%)</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b pb-4 border-amber-200 dark:border-amber-900/50">
                    <div>
                      <div className="font-medium text-amber-900 dark:text-amber-200">Mid-term Exams Peak</div>
                      <div className="text-sm text-amber-700/70 dark:text-amber-400/70 mt-1">Oct 15 - Oct 25, 2026</div>
                    </div>
                    <Badge variant="secondary" className="bg-amber-200 text-amber-900 dark:bg-amber-900 dark:text-amber-100">18 Kreons</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="pitches" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Event Pitches & Ideas</CardTitle>
              <CardDescription>Review and manage ideas and offline event proposals submitted by Kreons.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="text-center text-muted-foreground py-8">No event pitches yet.</div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="missions" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Mission Management</CardTitle>
                <CardDescription>Create, edit, and track active missions.</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Mission Title</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Timeline</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell colSpan={5} className="text-center text-muted-foreground h-24">No active missions.</TableCell>
                    </TableRow>
                  </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="kreons" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>User Management (Admin)</CardTitle>
                <CardDescription>Manage roles, batches, and monitor Kreon status.</CardDescription>
              </div>
              <div className="flex gap-2">
                <ExportCSVButton />
                <Button variant="outline" className="gap-2"><Users className="h-4 w-4" /> Add User</Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Batch</TableHead>
                    <TableHead>Kreds</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell colSpan={6} className="text-center text-muted-foreground h-24">No registered Kreons yet.</TableCell>
                    </TableRow>
                  </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

      </Tabs>
    </div>
  );
}
