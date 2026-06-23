"use client"

import { useState, use, useEffect } from "react";
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
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

export default function ProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const resolvedParams = use(params);
  const [ideaMode, setIdeaMode] = useState<"idea" | "event">("idea");
  
  const [profile, setProfile] = useState<any>(null);
  const [isMe, setIsMe] = useState(false);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function fetchProfile() {
      const { data: { user } } = await supabase.auth.getUser();
      
      let queryUsername = resolvedParams.username;
      
      if (queryUsername === 'me') {
        if (!user) return;
        setIsMe(true);
        const { data } = await supabase.from('users').select('*').eq('id', user.id).single();
        setProfile(data);
      } else {
        const { data } = await supabase.from('users').select('*').eq('username', queryUsername).single();
        if (user && data && user.id === data.id) {
          setIsMe(true);
        }
        setProfile(data);
      }
      setLoading(false);
    }
    fetchProfile();
  }, [resolvedParams.username, supabase]);

  if (loading) return <div className="p-8 text-center">Loading profile...</div>;
  if (!profile) return <div className="p-8 text-center">Profile not found.</div>;

  return (
    <div className="max-w-[95%] 2xl:max-w-[1600px] mx-auto space-y-6">
      {/* Header Profile Card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
            <div className="flex gap-6 items-center">
              <div className="relative">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={profile.avatar_url || ""} />
                  <AvatarFallback>{profile.full_name?.charAt(0) || "U"}</AvatarFallback>
                </Avatar>
                {isMe && (
                  <button className="absolute bottom-0 right-0 p-1.5 bg-primary text-primary-foreground rounded-full border-2 border-background hover:scale-105 transition-transform" title="Change Profile Picture">
                    <Camera className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold">{profile.full_name}</h1>
                  {profile.batch && <Badge variant="secondary">{profile.batch}</Badge>}
                </div>
                <p className="text-muted-foreground">@{profile.username || 'username_not_set'}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground pt-2">
                  {profile.college && <div className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {profile.college}</div>}
                  <div className="flex items-center gap-1"><CalendarDays className="h-4 w-4" /> Joined {new Date(profile.joined_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 items-end">
              <div className="bg-primary/10 text-primary px-4 py-2 rounded-lg font-bold text-lg text-center">
                {profile.kreds || 0} <span className="text-sm font-normal">Kreds</span>
              </div>
              {isMe && <Button variant="outline" className="w-full" onClick={() => window.location.href = '/setup'}>Edit Profile</Button>}
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
              <p className="text-sm">{profile.bio || "No bio added yet."}</p>
              <div className="space-y-3 pt-2">
                {profile.instagram_handle && (
                  <div className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors group">
                    <div className="h-8 w-8 rounded-md bg-muted flex items-center justify-center group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                      <FaInstagram className="h-4 w-4" />
                    </div>
                    <a href={profile.instagram_handle.startsWith('http') ? profile.instagram_handle : `https://instagram.com/${profile.instagram_handle.replace('@', '')}`} target="_blank" rel="noreferrer" className="hover:underline font-medium">{profile.instagram_handle}</a>
                  </div>
                )}
                {profile.twitter_handle && (
                  <div className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors group">
                    <div className="h-8 w-8 rounded-md bg-muted flex items-center justify-center group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                      <FaTwitter className="h-4 w-4" />
                    </div>
                    <a href={`https://twitter.com/${profile.twitter_handle.replace('@', '')}`} target="_blank" rel="noreferrer" className="hover:underline font-medium">{profile.twitter_handle}</a>
                  </div>
                )}
                {profile.youtube_channel && (
                  <div className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors group">
                    <div className="h-8 w-8 rounded-md bg-muted flex items-center justify-center group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                      <FaYoutube className="h-4 w-4" />
                    </div>
                    <a href={profile.youtube_channel} target="_blank" rel="noreferrer" className="hover:underline font-medium">YouTube</a>
                  </div>
                )}
                {profile.linkedin_url && (
                  <div className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors group">
                    <div className="h-8 w-8 rounded-md bg-muted flex items-center justify-center group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                      <FaLinkedin className="h-4 w-4" />
                    </div>
                    <a href={profile.linkedin_url} target="_blank" rel="noreferrer" className="hover:underline font-medium">LinkedIn</a>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          
          {profile.hobbies && profile.hobbies.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Interests</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="text-sm font-semibold text-muted-foreground mb-2">Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {profile.hobbies.map((hobby: string, i: number) => (
                      <Badge key={i} variant="outline">{hobby}</Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right Column */}
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Activity Stats</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-xl shadow-sm">
                <div className="text-3xl font-black text-primary">0</div>
                <div className="text-xs font-semibold text-muted-foreground mt-1 uppercase tracking-wider">Missions Done</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-xl shadow-sm">
                <div className="text-3xl font-black text-primary">{profile.kreds || 0}</div>
                <div className="text-xs font-semibold text-muted-foreground mt-1 uppercase tracking-wider">Kreds Earned</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-xl shadow-sm">
                <div className="text-3xl font-black text-primary">0</div>
                <div className="text-xs font-semibold text-muted-foreground mt-1 uppercase tracking-wider">Events Hosted</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-red-500/10 to-red-500/5 border border-red-500/20 rounded-xl shadow-sm">
                <div className="text-3xl font-black text-red-500">0</div>
                <div className="text-xs font-semibold text-red-600/80 mt-1 uppercase tracking-wider">Missions Declined</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Missions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-sm text-muted-foreground text-center py-4">No recent missions.</div>
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
                        <Button size="sm" className="gap-2" onClick={() => toast.success("Idea submitted successfully!")}><Send className="h-3 w-3" /> Submit Idea</Button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-6">
                  {isMe && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Phone Number</Label>
                          <Input placeholder="+91 98765 43210" defaultValue={profile.phone || ""} />
                        </div>
                        <div className="space-y-2">
                          <Label>College Name</Label>
                          <Input placeholder="Enter college" defaultValue={profile.college || ""} />
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

                      <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white" onClick={() => toast.success("Event pitch submitted successfully!")}>Submit Event Pitch</Button>
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
