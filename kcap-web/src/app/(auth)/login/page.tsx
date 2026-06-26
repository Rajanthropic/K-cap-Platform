"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button, buttonVariants } from "@/components/ui/button"
import Link from "next/link"
import { useState } from "react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { login } from "@/app/actions/auth"

export default function LoginPage() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleEmailLogin = async (formData: FormData) => {
    setLoading(true)
    
    const result = await login(formData);

    if (result?.error) {
      toast.error(result.error)
      setLoading(false)
    } else {
      toast.success("Logged in successfully!")
      router.push("/dashboard")
    }
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-muted/40 p-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login to KCAP</CardTitle>
          <CardDescription>Enter your email and password to log in.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <form action={handleEmailLogin} className="grid gap-4">
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
              />
            </div>
            <Button className="w-full" type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <div className="relative w-full mt-2">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">
                New to KCAP?
              </span>
            </div>
          </div>
          <Link href="/register" className={buttonVariants({ variant: "secondary", className: "w-full border shadow-sm" })}>
            Sign Up
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
