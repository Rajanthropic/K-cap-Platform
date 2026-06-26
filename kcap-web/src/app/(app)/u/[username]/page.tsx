"use client"

import { useState, use, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CalendarDays, MapPin, Link as LinkIcon, Share2, Gamepad2, Camera, ImagePlus, Edit3, Send, LogOut } from "lucide-react";
import { FaInstagram, FaTwitter, FaYoutube, FaGithub, FaSteam, FaLinkedin } from "react-icons/fa";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

import { useParams } from "next/navigation";

export default function ProfilePage() {
  const params = useParams();
  const usernameParam = params?.username as string;
  const [ideaMode, setIdeaMode] = useState<"idea" | "event">("idea");
  
  const [profile, setProfile] = useState<any>(null);
  const [isMe, setIsMe] = useState(false);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error(error.message);
    } else {
      window.location.href = '/login';
    }
  };

  useEffect(() => {
    async function fetchProfile() {
      const { data: { user } } = await supabase.auth.getUser();
      
      let queryUsername = usernameParam;
      
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
    if (usernameParam) fetchProfile();
  }, [usernameParam, supabase]);

  const [ideaText, setIdeaText] = useState("");
  const [submittedIdeas, setSubmittedIdeas] = useState<any[]>([]);
  
  const handleIdeaSubmit = () => {
    if (!ideaText.trim()) return;
    toast.success("Idea submitted successfully! It has been sent to management.");
    setSubmittedIdeas([{ title: "Your New Pitch", desc: ideaText, status: "Pending" }, ...submittedIdeas]);
    setIdeaText("");
  };

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
              {isMe && (
                <Dialog>
                  <DialogTrigger className={buttonVariants({ variant: "default", className: "w-full gap-2" })}>
                    <Share2 className="h-4 w-4" /> Share Report Card
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[400px] bg-transparent border-0 shadow-none">
                    <div className="relative w-full aspect-[63/88] rounded-2xl overflow-hidden bg-gradient-to-br from-yellow-300 via-yellow-500 to-yellow-600 p-[10px] shadow-2xl shadow-yellow-500/50 rotate-0 hover:scale-105 transition-transform duration-300">
                      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 mix-blend-overlay pointer-events-none"></div>
                      <div className="bg-slate-50 w-full h-full rounded-xl flex flex-col p-4 relative z-10 border-[6px] border-yellow-200">
                        
                        {/* Card Header */}
                        <div className="flex justify-between items-center mb-3">
                          <h2 className="font-black text-xl text-slate-800 tracking-tighter uppercase">{profile.full_name}</h2>
                          <div className="flex items-center gap-1">
                            <span className="text-xs font-bold text-red-600">KREDS</span>
                            <span className="text-xl font-black text-slate-800">{profile.kreds || 0}</span>
                          </div>
                        </div>

                        {/* Image Window */}
                        <div className="w-full aspect-[4/3] bg-gradient-to-tr from-slate-200 to-slate-100 border-[3px] border-slate-300 rounded shadow-inner mb-3 overflow-hidden relative group flex items-center justify-center">
                          {profile.avatar_url ? (
                            <img src={profile.avatar_url} className="w-full h-full object-contain" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-6xl opacity-20">👤</div>
                          )}
                          <div className="absolute bottom-1 right-1 bg-slate-800/80 text-white text-[10px] px-2 py-0.5 rounded backdrop-blur">
                            Lv. {Math.floor((profile.kreds || 0) / 100) + 1}
                          </div>
                        </div>

                        {/* Card Stats */}
                        <div className="bg-gradient-to-r from-yellow-100 to-transparent p-1 -mx-2 px-3 text-[10px] italic text-slate-600 mb-4 border-y border-yellow-200/50">
                          {profile.college || "No College Assigned"} • {profile.batch || "No Batch"}
                        </div>

                        {/* Abilities / Data */}
                        <div className="flex-1 space-y-4">
                          <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                            <div className="flex items-center gap-2">
                              <span className="h-4 w-4 rounded-full bg-blue-500 inline-block shadow-[inset_-2px_-2px_4px_rgba(0,0,0,0.3)]"></span>
                              <span className="font-bold text-sm text-slate-800">Missions Completed</span>
                            </div>
                            <span className="font-black text-slate-800 text-lg">0</span>
                          </div>
                          
                          <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                            <div className="flex items-center gap-2">
                              <span className="h-4 w-4 rounded-full bg-red-500 inline-block shadow-[inset_-2px_-2px_4px_rgba(0,0,0,0.3)]"></span>
                              <span className="font-bold text-sm text-slate-800">Avg. Score</span>
                            </div>
                            <span className="font-black text-slate-800 text-lg">N/A</span>
                          </div>

                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <span className="h-4 w-4 rounded-full bg-green-500 inline-block shadow-[inset_-2px_-2px_4px_rgba(0,0,0,0.3)]"></span>
                              <span className="font-bold text-sm text-slate-800">Ideas Pitched</span>
                            </div>
                            <span className="font-black text-slate-800 text-lg">0</span>
                          </div>
                        </div>

                        {/* Footer/Weakness */}
                        <div className="mt-auto pt-4 flex gap-4 text-[10px] font-medium text-slate-500">
                          <div className="flex-1">
                            <span className="block text-slate-400">weakness</span>
                            <span className="text-slate-700">Missed Deadlines ×2</span>
                          </div>
                          <div className="flex-1">
                            <span className="block text-slate-400">resistance</span>
                            <span className="text-slate-700">Procrastination -20</span>
                          </div>
                          <div className="flex-1 text-right">
                            <span className="block text-slate-400">social</span>
                            <span className="text-slate-700 truncate w-full block">{profile.instagram_handle || "@kreon"}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              )}
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
                      <Textarea value={ideaText} onChange={(e) => setIdeaText(e.target.value)} placeholder="Share your thoughts or suggest a mission idea..." className="resize-none border-primary/20 focus-visible:ring-primary/30" />
                      <div className="flex justify-between items-center">
                        <Dialog>
                          <DialogTrigger className={buttonVariants({ variant: "outline", size: "sm" })}>
                            View My Ideas
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>My Submitted Ideas</DialogTitle>
                              <DialogDescription>Track the status of your pitches.</DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                              {submittedIdeas.length > 0 ? submittedIdeas.map((idea, idx) => (
                                <div key={idx} className="border p-3 rounded-lg text-sm">
                                  <div className="flex justify-between items-start mb-2">
                                    <div className="font-medium">{idea.title}</div>
                                    <Badge variant="secondary" className="bg-yellow-500/10 text-yellow-600">{idea.status}</Badge>
                                  </div>
                                  <p className="text-muted-foreground">{idea.desc}</p>
                                </div>
                              )) : (
                                <div className="text-center text-muted-foreground py-8">You haven't submitted any ideas yet.</div>
                              )}
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Button size="sm" className="gap-2" onClick={handleIdeaSubmit} disabled={!ideaText.trim()}><Send className="h-3 w-3" /> Submit Idea</Button>
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
      {isMe && (
        <div className="flex justify-center pt-8 md:hidden">
          <Button variant="destructive" className="gap-2 px-8 w-full max-w-sm" onClick={handleLogout}>
            <LogOut className="h-4 w-4" /> Log Out
          </Button>
        </div>
      )}
    </div>
  );
}
