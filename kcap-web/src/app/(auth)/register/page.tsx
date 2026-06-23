"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState } from "react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { register } from "@/app/actions/auth"

export default function RegisterPage() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleEmailRegister = async (formData: FormData) => {
    setLoading(true)
    
    const result = await register(formData);

    if (result?.error) {
      toast.error(result.error)
      setLoading(false)
    } else {
      toast.success("Account created! Logging you in...")
      router.push("/login")
    }
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-muted/40 p-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Create an account</CardTitle>
          <CardDescription>Enter your email and a password to register.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <form action={handleEmailRegister} className="grid gap-4">
            <div className="grid gap-2">
              <Input 
                id="email" 
                name="email"
                type="email" 
                placeholder="m@example.com" 
                required 
              />
            </div>
            <div className="grid gap-2">
              <Input 
                id="password" 
                name="password"
                type="password" 
                placeholder="Password" 
                required 
                minLength={6}
              />
            </div>
            <Button className="w-full" type="submit" disabled={loading}>
              {loading ? "Creating Account..." : "Create Account"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <div className="text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="underline">
              Login
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
