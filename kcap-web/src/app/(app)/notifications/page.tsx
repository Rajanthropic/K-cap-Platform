"use client";

import { useState } from "react";
import { CheckCircle2, Trophy, Megaphone } from "lucide-react";

type Notification = {
  id: string;
  title: string;
  description: string;
  time: string;
  type: "success" | "alert" | "info";
  reaction: string | null;
};

const initialNotifications: Notification[] = [
  {
    id: "1",
    title: "Welcome to KCAP! 🎉",
    description: "You've been awarded 50 Kreds for signing up. Head over to the Missions tab to earn more!",
    time: "Just now",
    type: "success",
    reaction: null,
  }
];

const emojis = ["🔥", "❤️", "👍", "👏", "🎉"];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);

  const handleReact = (id: string, emoji: string) => {
    setNotifications((prev) =>
      prev.map((notif) => {
        if (notif.id === id) {
          // If clicking the same emoji, remove it (toggle off), otherwise set it
          return { ...notif, reaction: notif.reaction === emoji ? null : emoji };
        }
        return notif;
      })
    );
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
        <p className="text-muted-foreground mt-2">
          Stay updated on your missions, Kreds, and community events.
        </p>
      </div>

      <div className="space-y-4">
        {notifications.map((notif) => (
          <div
            key={notif.id}
            className="flex flex-col sm:flex-row gap-4 p-4 border rounded-xl bg-card hover:bg-accent/10 transition-colors"
          >
            <div className="mt-1">
              {notif.type === "success" && <CheckCircle2 className="h-6 w-6 text-green-500" />}
              {notif.type === "alert" && <Megaphone className="h-6 w-6 text-yellow-500" />}
              {notif.type === "info" && <Trophy className="h-6 w-6 text-blue-500" />}
            </div>
            
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">{notif.title}</h3>
                <span className="text-xs text-muted-foreground">{notif.time}</span>
              </div>
              <p className="text-sm text-muted-foreground">{notif.description}</p>
              
              <div className="pt-3 flex gap-2">
                {emojis.map((emoji) => (
                  <button
                    key={emoji}
                    onClick={() => handleReact(notif.id, emoji)}
                    className={`h-8 w-8 rounded-full flex items-center justify-center text-sm transition-transform hover:scale-110 ${
                      notif.reaction === emoji ? "bg-primary/20 ring-2 ring-primary scale-110" : "bg-muted"
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}

        {notifications.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No new notifications.
          </div>
        )}
      </div>
    </div>
  );
}