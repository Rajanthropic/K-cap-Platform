"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Camera } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export default function SetupPage() {
  const supabase = createClient()
  const router = useRouter()
  
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [userId, setUserId] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  const [formData, setFormData] = useState({
    username: "",
    phone: "",
    college: "",
    batch: "",
    bio: "",
    hobbies: "",
    instagram_handle: "",
    linkedin_url: "",
    twitter_handle: "",
    youtube_channel: "",
    github_url: "", // using twitter_handle or adding a column if needed
  })

  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)

  useEffect(() => {
    async function checkUser() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push("/login")
        return
      }
      setUserId(user.id)
      
      const { data: profile } = await supabase.from('users').select('*').eq('id', user.id).single()
      if (profile) {
        setFormData(prev => ({
          ...prev,
          username: profile.username || "",
          phone: profile.phone || "",
          college: profile.college || "",
          bio: profile.bio || "",
          hobbies: profile.hobbies ? profile.hobbies.join(", ") : "",
          instagram_handle: profile.instagram_handle || "",
          linkedin_url: profile.linkedin_url || "",
          twitter_handle: profile.twitter_handle || "",
          youtube_channel: profile.youtube_channel || "",
        }))
      }
      setFetching(false)
    }
    checkUser()
  }, [supabase, router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData(prev => ({ ...prev, [id]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size must be less than 5MB");
        return;
      }
      const imageUrl = URL.createObjectURL(file);
      setAvatarPreview(imageUrl);
      // Here you would typically also upload it to Supabase Storage and get the public URL to save to the user's profile
    }
  }

  const handleSubmit = async () => {
    if (!userId) return
    setLoading(true)

    const hobbiesArray = formData.hobbies.split(',').map(h => h.trim()).filter(Boolean)

    const { error } = await supabase
      .from('users')
      .update({
        username: formData.username,
        phone: formData.phone,
        college: formData.college,
        bio: formData.bio,
        hobbies: hobbiesArray,
        instagram_handle: formData.instagram_handle,
        linkedin_url: formData.linkedin_url,
        twitter_handle: formData.twitter_handle,
        youtube_channel: formData.youtube_channel,
      })
      .eq('id', userId)

    if (error) {
      toast.error(error.message)
    } else {
      toast.success("Profile saved successfully!")
      window.location.href = "/u/me"
    }
    setLoading(false)
  }

  if (fetching) return <div className="flex h-screen items-center justify-center">Loading...</div>

  return (
    <div className="min-h-screen w-screen bg-muted/40 p-4 flex items-start justify-center overflow-y-auto py-12">
      <Card className="w-full max-w-3xl border-primary/20 shadow-[0_0_20px_rgba(168,85,247,0.1)]">
        <CardHeader>
          <CardTitle className="text-3xl text-primary font-black uppercase tracking-tight">Kreon Profile Setup</CardTitle>
          <CardDescription>Welcome to the platform! Tell us about yourself.</CardDescription>
          <div className="bg-primary/10 text-primary-foreground p-3 rounded-lg text-sm font-medium mt-2 border border-primary/20">
            <span className="text-primary font-bold">Note:</span> Your email address is permanently linked to your Kreon account and cannot be changed.
          </div>
        </CardHeader>
        <CardContent className="grid gap-8">
          
          {/* Avatar Section */}
          <div className="space-y-3">
            <Label className="text-base">Profile Picture</Label>
            <div className="flex items-center gap-6">
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="h-24 w-24 rounded-full bg-accent flex flex-col items-center justify-center text-muted-foreground font-bold border-2 border-dashed border-primary/30 hover:border-primary hover:bg-primary/5 transition-colors cursor-pointer relative overflow-hidden group"
              >
                {avatarPreview ? (
                  <img src={avatarPreview} alt="Avatar preview" className="w-full h-full object-cover" />
                ) : (
                  <>
                    <Camera className="h-8 w-8 mb-1 group-hover:scale-110 transition-transform text-primary/60" />
                    <span className="text-xs">Upload</span>
                  </>
                )}
              </div>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                accept="image/*" 
                className="hidden" 
              />
              <p className="text-sm text-muted-foreground max-w-sm">Choose a cool avatar or a picture of yourself. (Max size 5MB)</p>
            </div>
          </div>

          {/* Basic Details */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg border-b pb-2">Basic Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Username</Label>
                <Input id="username" type="text" placeholder="e.g. shadow_kreon" value={formData.username} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label>Phone Number</Label>
                <Input id="phone" type="tel" placeholder="+91 98765 43210" value={formData.phone} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label>College Name <span className="text-red-500">*</span></Label>
                <Input id="college" type="text" placeholder="Full college name" value={formData.college} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label>Batch Number</Label>
                <Input id="batch" type="text" placeholder="e.g. Batch 15" value={formData.batch} onChange={handleChange} />
                <p className="text-[10px] text-muted-foreground">Optional identifier if applicable</p>
              </div>
            </div>
          </div>

          {/* About Section */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg border-b pb-2">About You</h3>
            <div className="space-y-2">
              <Label>Bio / About</Label>
              <Textarea id="bio" placeholder="Passionate gamer, developer, community builder..." className="resize-none h-24" value={formData.bio} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label>Interests & Tags (Comma separated)</Label>
              <Input id="hobbies" type="text" placeholder="Gaming, Valorant, Sci-Fi Movies, Music" value={formData.hobbies} onChange={handleChange} />
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg border-b pb-2">Social Media Links</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Instagram</Label>
                <Input id="instagram_handle" type="text" placeholder="@username or URL" value={formData.instagram_handle} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label>LinkedIn</Label>
                <Input id="linkedin_url" type="url" placeholder="https://linkedin.com/in/..." value={formData.linkedin_url} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label>Twitter / X</Label>
                <Input id="twitter_handle" type="text" placeholder="@username" value={formData.twitter_handle} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label>YouTube</Label>
                <Input id="youtube_channel" type="url" placeholder="https://youtube.com/@..." value={formData.youtube_channel} onChange={handleChange} />
              </div>
            </div>
          </div>

        </CardContent>
        <CardFooter className="flex justify-end border-t pt-6">
          <Button size="lg" className="px-10" onClick={handleSubmit} disabled={loading || !formData.college}>
            {loading ? "Saving..." : "Complete Setup"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
