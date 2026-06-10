"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Home, Compass, Trophy, ShoppingBag, User, Bell, LogOut } from 'lucide-react';
import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'sonner';

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [hasUnread, setHasUnread] = useState(true);
  const supabase = createClient();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error(error.message);
    } else {
      router.push('/login');
    }
  };

  // If we are currently on the notifications page, hide the dot
  // but we also keep state so if they navigate away, it stays hidden
  const showDot = hasUnread && pathname !== '/notifications';

  return (
    <div className="flex h-screen w-64 flex-col border-r bg-background">
      <div className="flex h-14 items-center border-b px-4 font-bold text-lg tracking-tight">
        KCAP
      </div>
      <nav className="flex-1 space-y-1 p-4 overflow-y-auto">
        <Link href="/dashboard" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground">
          <Home className="h-4 w-4" /> Dashboard
        </Link>
        <Link href="/timeline" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground">
          <Home className="h-4 w-4" /> Timeline
        </Link>
        <Link href="/missions" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground">
          <Compass className="h-4 w-4" /> Missions
        </Link>
        <Link href="/leaderboard" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground">
          <Trophy className="h-4 w-4" /> Leaderboard
        </Link>
        {/*
        <Link href="/shop" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground">
          <ShoppingBag className="h-4 w-4" /> Shop
        </Link>
        */}
        <Link 
          href="/notifications" 
          onClick={() => setHasUnread(false)}
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground relative"
        >
          <Bell className="h-4 w-4" /> 
          Notifications
          {showDot && (
            <span className="absolute right-4 top-1/2 -translate-y-1/2 flex h-2 w-2 rounded-full bg-red-500"></span>
          )}
        </Link>
        <Link href="/u/me" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground">
          <User className="h-4 w-4" /> Profile
        </Link>
      </nav>
      <div className="p-4 border-t">
        <button 
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-red-500 hover:bg-red-500/10 transition-colors"
        >
          <LogOut className="h-4 w-4" /> Logout
        </button>
      </div>
    </div>
  );
}
