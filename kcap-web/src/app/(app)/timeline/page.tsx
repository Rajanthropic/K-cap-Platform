"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
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
import { toast } from "sonner";
import { useState } from "react";

export default function TimelinePage() {
  const events: any[] = [];
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState("All");

  const filteredEvents = filter === "All" ? events : events.filter(e => e.type.toLowerCase().includes(filter.toLowerCase()));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Event request submitted successfully! Management will review it shortly.");
    setIsOpen(false);
  };

  return (
    <div className="max-w-[95%] 2xl:max-w-[1600px] mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Timeline</h1>
          <p className="text-muted-foreground">See what's happening in the community and join events.</p>
        </div>
        
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger className={buttonVariants({ className: "h-10 px-4 py-2 gap-2" })}>
            <PlusCircle className="h-4 w-4" /> Host Event
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Request to Host an Event</DialogTitle>
              <DialogDescription>
                Submit your event details. Management will review and approve it.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Event Title</Label>
                  <Input id="title" placeholder="e.g. Weekend Gaming Session" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="type">Event Type</Label>
                  <Select required>
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
                    <Input id="date" type="datetime-local" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="maxp">Max Participants</Label>
                    <Input id="maxp" type="number" placeholder="Optional" />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="link">Platform / Join Link</Label>
                  <Input id="link" placeholder="https://discord.gg/..." required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="desc">Description</Label>
                  <Textarea id="desc" placeholder="What is this event about?" required />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Submit Request</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex gap-2 pb-2">
        <Badge variant={filter === "All" ? "default" : "outline"} className="cursor-pointer hover:bg-muted/80" onClick={() => setFilter("All")}>All</Badge>
        <Badge variant={filter === "Watch Parties" ? "default" : "outline"} className="cursor-pointer hover:bg-muted/80" onClick={() => setFilter("Watch Parties")}>Watch Parties</Badge>
        <Badge variant={filter === "Gaming" ? "default" : "outline"} className="cursor-pointer hover:bg-muted/80" onClick={() => setFilter("Gaming")}>Gaming</Badge>
        <Badge variant={filter === "Learning" ? "default" : "outline"} className="cursor-pointer hover:bg-muted/80" onClick={() => setFilter("Learning")}>Learning</Badge>
      </div>

      <div className="space-y-6">
        {filteredEvents.length > 0 ? filteredEvents.map(event => (
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
