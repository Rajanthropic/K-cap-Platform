import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Camera } from "lucide-react"
import Link from "next/link"

export default function SetupPage() {
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
              <div className="h-24 w-24 rounded-full bg-accent flex flex-col items-center justify-center text-muted-foreground font-bold border-2 border-dashed border-primary/30 hover:border-primary hover:bg-primary/5 transition-colors cursor-pointer relative overflow-hidden group">
                <Camera className="h-8 w-8 mb-1 group-hover:scale-110 transition-transform text-primary/60" />
                <span className="text-xs">Upload</span>
              </div>
              <p className="text-sm text-muted-foreground max-w-sm">Choose a cool avatar or a picture of yourself. (Max size 5MB)</p>
            </div>
          </div>

          {/* Basic Details */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg border-b pb-2">Basic Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Username</Label>
                <Input type="text" placeholder="e.g. shadow_kreon" />
              </div>
              <div className="space-y-2">
                <Label>Phone Number</Label>
                <Input type="tel" placeholder="+91 98765 43210" />
              </div>
              <div className="space-y-2">
                <Label>College Name</Label>
                <Input type="text" placeholder="Full college name" />
              </div>
              <div className="space-y-2">
                <Label>Batch Number</Label>
                <Input type="text" placeholder="e.g. Batch 15" disabled value="Batch 15" className="bg-muted" />
                <p className="text-[10px] text-muted-foreground">Assigned by Management</p>
              </div>
            </div>
          </div>

          {/* About Section */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg border-b pb-2">About You</h3>
            <div className="space-y-2">
              <Label>Bio / About</Label>
              <Textarea placeholder="Passionate gamer, developer, community builder..." className="resize-none h-24" />
            </div>
            <div className="space-y-2">
              <Label>Interests & Tags (Comma separated)</Label>
              <Input type="text" placeholder="Gaming, Valorant, Sci-Fi Movies, Music" />
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg border-b pb-2">Social Media Links</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Instagram</Label>
                <Input type="url" placeholder="https://instagram.com/..." />
              </div>
              <div className="space-y-2">
                <Label>LinkedIn</Label>
                <Input type="url" placeholder="https://linkedin.com/in/..." />
              </div>
              <div className="space-y-2">
                <Label>Twitter / X</Label>
                <Input type="url" placeholder="https://twitter.com/..." />
              </div>
              <div className="space-y-2">
                <Label>YouTube</Label>
                <Input type="url" placeholder="https://youtube.com/@..." />
              </div>
              <div className="space-y-2">
                <Label>Steam Profile</Label>
                <Input type="url" placeholder="https://steamcommunity.com/id/..." />
              </div>
              <div className="space-y-2">
                <Label>GitHub</Label>
                <Input type="url" placeholder="https://github.com/..." />
              </div>
            </div>
          </div>

        </CardContent>
        <CardFooter className="flex justify-end border-t pt-6">
          <Link href="/dashboard">
            <Button size="lg" className="px-10">Complete Setup</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
