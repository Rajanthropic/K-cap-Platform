import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Trophy, Zap } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function LeaderboardPage() {
  const leaders = [
    { rank: 1, name: "Alice Johnson", username: "alicej", college: "NIT Trichy", batch: "Batch 14", credits: 2450, overachiever: true },
    { rank: 2, name: "Bob Smith", username: "bobsmith", college: "IIT Delhi", batch: "Batch 14", credits: 2100, overachiever: false },
    { rank: 3, name: "Charlie Davis", username: "charlied", college: "BITS Pilani", batch: "Batch 15", credits: 1950, overachiever: true },
    { rank: 4, name: "Diana Prince", username: "dianap", college: "VIT Vellore", batch: "Batch 15", credits: 1800, overachiever: false },
    { rank: 5, name: "Eve Adams", username: "evea", college: "SRM Chennai", batch: "Batch 13", credits: 1650, overachiever: false },
    // ... skipping 6-11 for brevity
    { rank: 12, name: "John Doe", username: "johndoe", college: "IIT Bombay", batch: "Batch 15", credits: 1200, overachiever: false, isMe: true },
  ];

  return (
    <div className="max-w-[95%] 2xl:max-w-[1600px] mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Leaderboard</h1>
          <p className="text-muted-foreground">See how you stack up against other Kreons.</p>
        </div>
        <div className="flex bg-muted p-1 rounded-lg">
          <button className="px-4 py-1.5 text-sm font-medium bg-background shadow-sm rounded-md">All-Time</button>
          <button className="px-4 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground">Monthly</button>
        </div>
      </div>

      <Card>
        <CardHeader className="bg-primary/5 border-b pb-4">
          <CardTitle className="flex justify-between items-center text-lg font-medium">
            <span>Your Ranking</span>
            <span className="text-sm font-normal text-muted-foreground">You're 450 Kreds away from Top 5 — keep going!</span>
          </CardTitle>
          <div className="flex items-center gap-4 pt-4">
            <div className="text-3xl font-bold text-primary">#12</div>
            <div className="flex-1 bg-muted h-2 rounded-full overflow-hidden">
              <div className="bg-primary h-full w-[45%]" />
            </div>
            <div className="text-sm font-medium">1,200 Kreds</div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16 text-center">Rank</TableHead>
                <TableHead>Kreon</TableHead>
                <TableHead className="hidden md:table-cell">Batch</TableHead>
                <TableHead className="text-right">Kreds</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leaders.map((leader) => (
                <TableRow key={leader.rank} className={leader.isMe ? "bg-muted/50 font-medium" : ""}>
                  <TableCell className="text-center font-bold">
                    {leader.rank === 1 && <Trophy className="h-5 w-5 text-yellow-500 mx-auto" />}
                    {leader.rank === 2 && <Trophy className="h-5 w-5 text-gray-400 mx-auto" />}
                    {leader.rank === 3 && <Trophy className="h-5 w-5 text-amber-600 mx-auto" />}
                    {leader.rank > 3 && <span>#{leader.rank}</span>}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>{leader.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          {leader.name}
                          {leader.overachiever && <Zap className="h-3 w-3 text-yellow-500 fill-yellow-500" />}
                        </div>
                        <div className="text-xs text-muted-foreground hidden md:block">{leader.college}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Badge variant="outline">{leader.batch}</Badge>
                  </TableCell>
                  <TableCell className="text-right font-bold text-primary">
                    {leader.credits.toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
