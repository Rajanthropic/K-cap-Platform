"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Home, Compass, Trophy, ShoppingBag, User, Bell, LogOut } from 'lucide-react';
import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'sonner';

export function MobileNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [hasUnread, setHasUnread] = useState(true);
  const showDot = hasUnread && pathname !== '/notifications';
  const supabase = createClient();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error(error.message);
    } else {
      router.push('/login');
    }
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-background border-t flex items-center justify-around z-50 px-2 pb-safe">
      <Link href="/dashboard" className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${pathname === '/dashboard' ? 'text-primary' : 'text-muted-foreground'}`}>
        <Home className="h-5 w-5" />
        <span className="text-[10px]">Home</span>
      </Link>
      <Link href="/missions" className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${pathname === '/missions' ? 'text-primary' : 'text-muted-foreground'}`}>
        <Compass className="h-5 w-5" />
        <span className="text-[10px]">Missions</span>
      </Link>
      <Link href="/leaderboard" className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${pathname === '/leaderboard' ? 'text-primary' : 'text-muted-foreground'}`}>
        <Trophy className="h-5 w-5" />
        <span className="text-[10px]">Ranks</span>
      </Link>
      <Link href="/shop" className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${pathname === '/shop' ? 'text-primary' : 'text-muted-foreground'}`}>
        <ShoppingBag className="h-5 w-5" />
        <span className="text-[10px]">Shop</span>
      </Link>
      <Link 
        href="/notifications" 
        onClick={() => setHasUnread(false)}
        className={`flex flex-col items-center justify-center w-full h-full space-y-1 relative ${pathname === '/notifications' ? 'text-primary' : 'text-muted-foreground'}`}
      >
        <div className="relative">
          <Bell className="h-5 w-5" />
          {showDot && (
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5 rounded-full bg-red-500 border-2 border-background"></span>
          )}
        </div>
        <span className="text-[10px]">Alerts</span>
      </Link>
      <button onClick={handleLogout} className="flex flex-col items-center justify-center w-full h-full space-y-1 text-muted-foreground hover:text-red-500 transition-colors">
        <LogOut className="h-5 w-5" />
        <span className="text-[10px]">Logout</span>
      </button>
    </div>
  );
}
