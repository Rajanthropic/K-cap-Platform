import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, AlertCircle, FileCheck2, CalendarClock, ChevronRight, CalendarDays, Lightbulb, PlusCircle, CheckCircle2, XCircle } from "lucide-react";
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

export default function DashboardPage() {
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
                      <TableCell className="font-medium">Alice Johnson</TableCell>
                      <TableCell>KCAP Launch Reel</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">Review <ChevronRight className="h-4 w-4" /></Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Bob Smith</TableCell>
                      <TableCell>Watch Party</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">Review <ChevronRight className="h-4 w-4" /></Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Charlie Davis</TableCell>
                      <TableCell>KCAP Launch Reel</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">Review <ChevronRight className="h-4 w-4" /></Button>
                      </TableCell>
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
                {/* Event Pitch Example */}
                <div className="border border-orange-500/30 rounded-xl overflow-hidden shadow-sm bg-card">
                  <div className="bg-orange-500/10 p-4 border-b border-orange-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <Badge className="bg-orange-500 text-white hover:bg-orange-600">Event Pitch</Badge>
                        <h3 className="font-bold text-lg">Techfest 2026 Booth</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">Submitted by <span className="font-medium text-foreground">Alice Johnson</span> • IIT Bombay</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <Button variant="outline" className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950 border-red-200 dark:border-red-900">
                        <XCircle className="h-4 w-4 mr-2" /> Decline
                      </Button>
                      <Button className="bg-green-600 hover:bg-green-700 text-white">
                        <CheckCircle2 className="h-4 w-4 mr-2" /> Approve & Reach Out
                      </Button>
                    </div>
                  </div>
                  <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-1">Event Details</h4>
                        <p className="font-medium">Techfest 2026 (Gaming / Cultural)</p>
                        <p className="text-sm text-muted-foreground">Dec 15 - Dec 18, 2026 • Est. Footfall: 15,000</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-1">What they need from us</h4>
                        <p className="text-sm bg-muted/50 p-3 rounded-lg border">Looking for ₹50,000 sponsorship for the Valorant tournament prize pool, plus 50 Kreo branded t-shirts for the organizing committee.</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-1">What they offer in return</h4>
                        <p className="text-sm bg-muted/50 p-3 rounded-lg border">Dedicated 10x10 premium stall space in the gaming arena. Kreo logo on all main stage banners and tournament streams.</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">Promised Deliverables</h4>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline" className="bg-background">Insta Post</Badge>
                          <Badge variant="outline" className="bg-background">Insta Reel</Badge>
                          <Badge variant="outline" className="bg-background">Insta Story</Badge>
                          <Badge variant="outline" className="bg-background">YT Short</Badge>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-1">Point of Contact</h4>
                        <div className="text-sm space-y-1 bg-muted/50 p-3 rounded-lg border">
                          <p><span className="text-muted-foreground">Name:</span> Rahul Sharma</p>
                          <p><span className="text-muted-foreground">Phone:</span> +91 98765 12345</p>
                          <p><span className="text-muted-foreground">Email:</span> rahul.s@techfest.org</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Simple Idea Example */}
                <div className="border border-primary/30 rounded-xl overflow-hidden shadow-sm bg-card">
                  <div className="bg-primary/5 p-4 border-b border-primary/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <Badge variant="secondary" className="bg-primary/20 text-primary hover:bg-primary/30">Idea</Badge>
                        <h3 className="font-bold text-lg">Campus Treasure Hunt</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">Submitted by <span className="font-medium text-foreground">John Doe</span> • NIT Trichy</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950 border-red-200 dark:border-red-900">Decline</Button>
                      <Button size="sm">Reach Out</Button>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-sm text-foreground">A campus-wide QR code treasure hunt that leads to a Kreo merchandise popup stall. We could place QR codes near the engineering blocks and cafeterias. First 50 people to complete it get a discount code!</p>
                  </div>
                </div>
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
                    <TableCell className="font-medium">Instagram Reel: Kreo Unboxing</TableCell>
                    <TableCell><Badge variant="outline">Content</Badge></TableCell>
                    <TableCell><Badge className="bg-green-500/10 text-green-500">Active</Badge></TableCell>
                    <TableCell className="text-sm text-muted-foreground">Jun 5 - Jun 20</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">Edit</Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Campus Valorant Tournament</TableCell>
                    <TableCell><Badge variant="outline">Offline Event</Badge></TableCell>
                    <TableCell><Badge className="bg-green-500/10 text-green-500">Active</Badge></TableCell>
                    <TableCell className="text-sm text-muted-foreground">Jun 10 - Jun 25</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">Edit</Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Discord Watch Party</TableCell>
                    <TableCell><Badge variant="outline">Hybrid</Badge></TableCell>
                    <TableCell><Badge variant="secondary">Closed</Badge></TableCell>
                    <TableCell className="text-sm text-muted-foreground">Jun 15 - Jun 16</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">View</Button>
                    </TableCell>
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
                    <TableCell>
                      <div className="font-medium">Alice Johnson</div>
                      <div className="text-xs text-muted-foreground">alice@example.com</div>
                    </TableCell>
                    <TableCell><Badge variant="outline" className="border-primary/50 text-primary">Kreon</Badge></TableCell>
                    <TableCell>Batch 14</TableCell>
                    <TableCell className="font-medium">2,450</TableCell>
                    <TableCell><Badge className="bg-green-500/10 text-green-500">Active</Badge></TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">Manage</Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="font-medium">John Doe</div>
                      <div className="text-xs text-muted-foreground">john@example.com</div>
                    </TableCell>
                    <TableCell><Badge variant="outline" className="border-primary/50 text-primary">Kreon</Badge></TableCell>
                    <TableCell>Batch 15</TableCell>
                    <TableCell className="font-medium">1,200</TableCell>
                    <TableCell><Badge className="bg-green-500/10 text-green-500">Active</Badge></TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">Manage</Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="font-medium">Admin User</div>
                      <div className="text-xs text-muted-foreground">admin@kcap.com</div>
                    </TableCell>
                    <TableCell><Badge className="bg-purple-500 text-white hover:bg-purple-600">Admin</Badge></TableCell>
                    <TableCell className="text-muted-foreground">-</TableCell>
                    <TableCell className="text-muted-foreground">-</TableCell>
                    <TableCell><Badge className="bg-green-500/10 text-green-500">Active</Badge></TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" disabled>Manage</Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="font-medium">Eve Adams</div>
                      <div className="text-xs text-muted-foreground">eve@example.com</div>
                    </TableCell>
                    <TableCell><Badge variant="outline" className="border-primary/50 text-primary">Kreon</Badge></TableCell>
                    <TableCell>Batch 13</TableCell>
                    <TableCell className="font-medium">1,650</TableCell>
                    <TableCell><Badge variant="destructive" className="bg-red-500/10 text-red-500 hover:bg-red-500/20">Inactive</Badge></TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600">Remove</Button>
                    </TableCell>
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
