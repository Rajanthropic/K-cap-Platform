"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";

type Post = {
  id: string;
  content: string;
  likes: number;
  created_at: string;
  author: {
    id: string;
    full_name: string;
    role: string;
  };
};

export default function CommunityFeed({ currentUser }: { currentUser: any }) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState("");
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from("community_posts")
      .select(`
        id, content, likes, created_at,
        author:author_id ( id, full_name, role )
      `)
      .order("created_at", { ascending: false })
      .limit(50);
      
    if (data && !error) {
      setPosts(data as any);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handlePost = async () => {
    if (!newPost.trim()) return;
    setLoading(true);

    const { error } = await supabase.from("community_posts").insert({
      author_id: currentUser.id,
      content: newPost,
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Update posted!");
      setNewPost("");
      fetchPosts();
    }
    setLoading(false);
  };

  const handleLike = async (postId: string, currentLikes: number) => {
    const { error } = await supabase
      .from("community_posts")
      .update({ likes: currentLikes + 1 })
      .eq("id", postId);
      
    if (!error) {
      setPosts((prev) => prev.map(p => p.id === postId ? { ...p, likes: currentLikes + 1 } : p));
    }
  };

  return (
    <div className="mt-8 space-y-4">
      <h2 className="text-xl font-bold border-b pb-2">Community Feed</h2>
      
      <Card className="bg-muted/30">
        <CardContent className="p-4">
          <div className="flex gap-4">
            <div className="h-10 w-10 rounded-full bg-accent flex items-center justify-center font-bold text-muted-foreground shrink-0">
              {currentUser?.full_name ? currentUser.full_name.charAt(0).toUpperCase() : 'U'}
            </div>
            <div className="flex-1 space-y-3">
              <textarea 
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                placeholder="Share what you played today, an idea, or an update!" 
                className="w-full bg-transparent border-b border-primary/20 focus:border-primary outline-none resize-none p-2 text-sm"
                rows={2}
              />
              <div className="flex justify-end">
                <Button size="sm" onClick={handlePost} disabled={loading || !newPost.trim()}>Post Update</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4 pt-4">
        {posts.length > 0 ? posts.map(post => (
          <Card key={post.id}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold ${post.author?.role === 'management' || post.author?.role === 'admin' ? 'bg-orange-500/20 text-orange-600' : 'bg-primary/20 text-primary'}`}>
                    {post.author?.full_name ? post.author.full_name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <div>
                    <div className="font-semibold text-sm">
                      {post.author?.full_name || 'Kreon'}
                      {(post.author?.role === 'admin' || post.author?.role === 'management') && (
                        <Badge variant="secondary" className="ml-2 text-[10px] h-4">Management</Badge>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-sm whitespace-pre-wrap">{post.content}</p>
              <div className="flex items-center gap-4 mt-4 pt-3 border-t">
                <button onClick={() => handleLike(post.id, post.likes)} className="text-muted-foreground hover:text-primary text-xs font-medium flex items-center gap-1 transition-colors">
                  ❤️ Like ({post.likes})
                </button>
              </div>
            </CardContent>
          </Card>
        )) : (
          <div className="text-center text-muted-foreground py-12 border rounded-xl border-dashed">
            No posts yet. Be the first to share an update!
          </div>
        )}
      </div>
    </div>
  );
}