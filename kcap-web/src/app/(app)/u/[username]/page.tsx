"use client"

import { useState, use } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CalendarDays, MapPin, Link as LinkIcon, Share2, Gamepad2, Camera, ImagePlus, Edit3, Send } from "lucide-react";
import { FaInstagram, FaTwitter, FaYoutube, FaGithub, FaSteam, FaLinkedin } from "react-icons/fa";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

export default function ProfilePage({ params }: { params: Promise<{ username: string }> }) {
  // Mock data
  const resolvedParams = use(params);
  const isMe = resolvedParams.username === 'me' || resolvedParams.username === 'johndoe';
  const [ideaMode, setIdeaMode] = useState<"idea" | "event">("idea");
  
  return (
    <div className="max-w-[95%] 2xl:max-w-[1600px] mx-auto space-y-6">
      {/* Header Profile Card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
            <div className="flex gap-6 items-center">
              <div className="relative">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                {isMe && (
                  <button className="absolute bottom-0 right-0 p-1.5 bg-primary text-primary-foreground rounded-full border-2 border-background hover:scale-105 transition-transform" title="Change Profile Picture">
                    <Camera className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold">John Doe</h1>
                  <Badge variant="secondary">Batch 15</Badge>
                </div>
                <p className="text-muted-foreground">@{resolvedParams.username === 'me' ? 'johndoe' : resolvedParams.username}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground pt-2">
                  <div className="flex items-center gap-1"><MapPin className="h-4 w-4" /> IIT Bombay</div>
                  <div className="flex items-center gap-1"><CalendarDays className="h-4 w-4" /> Joined Jun 2026</div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 items-end">
              <div className="bg-primary/10 text-primary px-4 py-2 rounded-lg font-bold text-lg text-center">
                150 <span className="text-sm font-normal">Kreds</span>
              </div>
              {isMe && <Button variant="outline" className="w-full">Edit Profile</Button>}
              {isMe && <Button className="w-full gap-2"><Share2 className="h-4 w-4" /> Share Report Card</Button>}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="md:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">About</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm">Passionate developer and community builder. Always ready to learn and share knowledge!</p>
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors group">
                  <div className="h-8 w-8 rounded-md bg-muted flex items-center justify-center group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                    <FaInstagram className="h-4 w-4" />
                  </div>
                  <a href="#" className="hover:underline font-medium">@johndoe_kreo</a>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors group">
                  <div className="h-8 w-8 rounded-md bg-muted flex items-center justify-center group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                    <FaTwitter className="h-4 w-4" />
                  </div>
                  <a href="#" className="hover:underline font-medium">@johndoe</a>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors group">
                  <div className="h-8 w-8 rounded-md bg-muted flex items-center justify-center group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                    <FaYoutube className="h-4 w-4" />
                  </div>
                  <a href="#" className="hover:underline font-medium">JohnDoeGaming</a>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors group">
                  <div className="h-8 w-8 rounded-md bg-muted flex items-center justify-center group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                    <FaSteam className="h-4 w-4" />
                  </div>
                  <a href="#" className="hover:underline font-medium">Steam: johndoe_99</a>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors group">
                  <div className="h-8 w-8 rounded-md bg-muted flex items-center justify-center group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                    <FaLinkedin className="h-4 w-4" />
                  </div>
                  <a href="#" className="hover:underline font-medium">linkedin.com/in/johndoe</a>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Interests</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-semibold text-muted-foreground">Favorite Character</h4>
                  {isMe && <Button variant="ghost" size="sm" className="h-6 text-xs px-2 text-muted-foreground hover:text-foreground"><ImagePlus className="h-3 w-3 mr-1" /> Change Image</Button>}
                </div>
                <div className="flex items-center gap-3 bg-muted p-3 rounded-lg border border-border/50">
                  <div className="h-10 w-10 rounded-full bg-black flex items-center justify-center overflow-hidden">
                    <img src="https://placehold.co/100x100/1a1a1a/ffffff?text=🦇" alt="Batman" />
                  </div>
                  <div>
                    <div className="font-bold">Batman</div>
                    <div className="text-xs text-muted-foreground">DC Comics</div>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-muted-foreground mb-2">Tags</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">Gaming</Badge>
                  <Badge variant="outline">Valorant</Badge>
                  <Badge variant="outline">Music</Badge>
                  <Badge variant="outline">Sci-Fi Movies</Badge>
                  <Badge variant="outline">Chess</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Unavailability</CardTitle>
                {isMe && (
                  <Dialog>
                    <DialogTrigger className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 w-8 p-0 text-muted-foreground">
                        <Edit3 className="h-4 w-4" />
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Update Unavailability</DialogTitle>
                        <DialogDescription>Let management know when you'll be unavailable for missions.</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label>Reason (e.g. Mid-term Exams)</Label>
                          <Input placeholder="Enter reason" defaultValue="Mid-term Exams" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Start Date</Label>
                            <Input type="date" defaultValue="2026-10-15" />
                          </div>
                          <div className="space-y-2">
                            <Label>End Date</Label>
                            <Input type="date" defaultValue="2026-10-25" />
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit">Save Changes</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-400 p-3 rounded-lg text-sm flex items-start gap-2">
                <CalendarDays className="h-4 w-4 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold">Mid-term Exams</span>
                  <p className="mt-1 opacity-80">Unavailable from Oct 15 - Oct 25, 2026</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Activity Stats</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-xl shadow-sm">
                <div className="text-3xl font-black text-primary">1/2</div>
                <div className="text-xs font-semibold text-muted-foreground mt-1 uppercase tracking-wider">Missions Done</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-xl shadow-sm">
                <div className="text-3xl font-black text-primary">1200</div>
                <div className="text-xs font-semibold text-muted-foreground mt-1 uppercase tracking-wider">Kreds Earned</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-xl shadow-sm">
                <div className="text-3xl font-black text-primary">3</div>
                <div className="text-xs font-semibold text-muted-foreground mt-1 uppercase tracking-wider">Events Hosted</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-red-500/10 to-red-500/5 border border-red-500/20 rounded-xl shadow-sm">
                <div className="text-3xl font-black text-red-500">1</div>
                <div className="text-xs font-semibold text-red-600/80 mt-1 uppercase tracking-wider">Missions Declined</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Missions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                <div>
                  <h4 className="font-semibold">Instagram Reel: CRIO Launch</h4>
                  <p className="text-sm text-muted-foreground">Content • Completed on Jun 1, 2026</p>
                </div>
                <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/20">+50 Kreds</Badge>
              </div>
              <div className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                <div>
                  <h4 className="font-semibold">Host a College Watch Party</h4>
                  <p className="text-sm text-muted-foreground">Offline Event • Completed on May 25, 2026</p>
                </div>
                <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/20">+100 Kreds</Badge>
              </div>
            </CardContent>
          </Card>
          <Card className={`transition-colors duration-300 ${ideaMode === 'event' ? 'border-orange-500/50 shadow-[0_0_15px_rgba(249,115,22,0.1)]' : 'border-primary/50 shadow-[0_0_15px_rgba(168,85,247,0.1)]'}`}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{ideaMode === 'event' ? 'Pitch an Event' : 'Idea Box'}</CardTitle>
                {isMe && (
                  <div className="flex items-center gap-2 bg-muted p-1 rounded-lg">
                    <button 
                      onClick={() => setIdeaMode("idea")}
                      className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${ideaMode === 'idea' ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
                    >
                      Idea
                    </button>
                    <button 
                      onClick={() => setIdeaMode("event")}
                      className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${ideaMode === 'event' ? 'bg-orange-500 text-white shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
                    >
                      Event Pitch
                    </button>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {ideaMode === 'idea' ? (
                <div className="space-y-4">
                  {isMe && (
                    <div className="space-y-2">
                      <Textarea placeholder="Share your thoughts or suggest a mission idea..." className="resize-none border-primary/20 focus-visible:ring-primary/30" />
                      <div className="flex justify-end">
                        <Button size="sm" className="gap-2"><Send className="h-3 w-3" /> Submit Idea</Button>
                      </div>
                    </div>
                  )}
                  <div className="border p-4 rounded-lg bg-primary/5 border-primary/10">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold">Campus Treasure Hunt</h4>
                      <Badge variant="secondary" className="bg-background">Pending Review</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">A campus-wide QR code treasure hunt that leads to a Kreo merchandise popup stall.</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {isMe && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Phone Number</Label>
                          <Input placeholder="+91 98765 43210" />
                        </div>
                        <div className="space-y-2">
                          <Label>College Name</Label>
                          <Input placeholder="Enter college" defaultValue="IIT Bombay" />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Fest / Event Name</Label>
                          <Input placeholder="e.g. Techfest 2026" />
                        </div>
                        <div className="space-y-2">
                          <Label>Fest Type</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="gaming">Gaming</SelectItem>
                              <SelectItem value="music">Music</SelectItem>
                              <SelectItem value="cultural">Cultural</SelectItem>
                              <SelectItem value="sports">Sports</SelectItem>
                              <SelectItem value="others">Others</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Event Dates</Label>
                          <div className="flex items-center gap-2">
                            <Input type="date" className="text-xs" />
                            <span className="text-muted-foreground">-</span>
                            <Input type="date" className="text-xs" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label>Estimated Footfall</Label>
                          <Input type="number" placeholder="e.g. 5000" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Describe what you need from us</Label>
                        <Textarea placeholder="Sponsorship amount, merchandise, prizes..." className="resize-none" />
                      </div>

                      <div className="space-y-2">
                        <Label>What can you offer in return?</Label>
                        <Textarea placeholder="Logo placement, dedicated stall, shoutouts..." className="resize-none" />
                      </div>

                      <div className="space-y-3">
                        <Label>Social Media Deliverables</Label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                          <div className="flex items-center space-x-2">
                            <Checkbox id="d-post" />
                            <label htmlFor="d-post" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Insta Post</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="d-reel" />
                            <label htmlFor="d-reel" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Insta Reel</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="d-story" />
                            <label htmlFor="d-story" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Insta Story</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="d-twitter" />
                            <label htmlFor="d-twitter" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Twitter Post</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="d-yt-short" />
                            <label htmlFor="d-yt-short" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">YT Short</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="d-yt-long" />
                            <label htmlFor="d-yt-long" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">YT Long Form</label>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3 pt-2 border-t border-border/50">
                        <Label>Point of Contact (If different)</Label>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <Input placeholder="POC Name" className="text-sm" />
                          <Input placeholder="POC Email" type="email" className="text-sm" />
                          <Input placeholder="POC Contact" className="text-sm" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Additional Notes</Label>
                        <Textarea placeholder="Any other details..." className="resize-none h-16" />
                      </div>

                      <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">Submit Event Pitch</Button>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
