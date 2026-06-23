import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CalendarDays, MapPin, Users, PlusCircle } from "lucide-react";

export default function TimelinePage() {
  const events: any[] = [];

  return (
    <div className="max-w-[95%] 2xl:max-w-[1600px] mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Timeline</h1>
          <p className="text-muted-foreground">See what's happening in the community and join events.</p>
        </div>
        
        <Dialog>
          <DialogTrigger className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 gap-2">
            <PlusCircle className="h-4 w-4" /> Host Event
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Request to Host an Event</DialogTitle>
              <DialogDescription>
                Submit your event details. Management will review and approve it.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Event Title</Label>
                <Input id="title" placeholder="e.g. Weekend Gaming Session" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="type">Event Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="watch_party">Watch Party</SelectItem>
                    <SelectItem value="gaming">Gaming Session</SelectItem>
                    <SelectItem value="learning">Learning Program</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="date">Date & Time</Label>
                  <Input id="date" type="datetime-local" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="maxp">Max Participants</Label>
                  <Input id="maxp" type="number" placeholder="Optional" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="link">Platform / Join Link</Label>
                <Input id="link" placeholder="https://discord.gg/..." />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="desc">Description</Label>
                <Textarea id="desc" placeholder="What is this event about?" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Submit Request</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex gap-2 pb-2">
        <Badge variant="default" className="cursor-pointer">All</Badge>
        <Badge variant="outline" className="cursor-pointer hover:bg-muted">Watch Parties</Badge>
        <Badge variant="outline" className="cursor-pointer hover:bg-muted">Gaming</Badge>
        <Badge variant="outline" className="cursor-pointer hover:bg-muted">Learning</Badge>
      </div>

      <div className="space-y-6">
        {events.length > 0 ? events.map(event => (
          <Card key={event.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl mb-2">{event.title}</CardTitle>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <Badge variant="secondary" className="font-normal">{event.type}</Badge>
                    <span>Hosted by <span className="font-medium text-foreground">{event.host}</span></span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-4">{event.description}</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm bg-muted/50 p-4 rounded-lg">
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-primary" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span>{event.platform}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary" />
                  <span>{event.participants} attending</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full sm:w-auto">RSVP - I'm In!</Button>
            </CardFooter>
          </Card>
        )) : (
          <div className="text-center text-muted-foreground py-12 border rounded-xl border-dashed">
            No events scheduled yet. Check back later or host your own!
          </div>
        )}
      </div>
    </div>
  );
}
