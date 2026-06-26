"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";
import { ImagePlus, MessageSquare, Send, X } from "lucide-react";

type Comment = {
  id: string;
  content: string;
  created_at: string;
  author: {
    id: string;
    full_name: string;
    role: string;
  };
};

type Post = {
  id: string;
  content: string;
  media_url: string | null;
  likes: number;
  created_at: string;
  author: {
    id: string;
    full_name: string;
    role: string;
  };
  community_comments: Comment[];
};

export default function CommunityFeed({ currentUser }: { currentUser: any }) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState("");
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [activeCommentPost, setActiveCommentPost] = useState<string | null>(null);
  const [newComment, setNewComment] = useState("");
  const [commentLoading, setCommentLoading] = useState(false);

  const supabase = createClient();

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from("community_posts")
      .select(`
        id, content, media_url, likes, created_at,
        author:author_id ( id, full_name, role ),
        community_comments (
          id, content, created_at,
          author:author_id ( id, full_name, role )
        )
      `)
      .order("created_at", { ascending: false })
      .limit(50);
      
    if (data && !error) {
      // Sort comments by created_at ascending
      const sortedData = data.map((post: any) => ({
        ...post,
        community_comments: post.community_comments.sort((a: any, b: any) => 
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        )
      }));
      setPosts(sortedData as any);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size must be less than 5MB");
        return;
      }
      setMediaFile(file);
      setMediaPreview(URL.createObjectURL(file));
      e.target.value = '';
    }
  };

  const clearMedia = () => {
    setMediaFile(null);
    setMediaPreview(null);
  };

  const handlePost = async () => {
    if (!newPost.trim() && !mediaFile) return;
    setLoading(true);

    let finalMediaUrl = null;

    if (mediaFile) {
      const fileExt = mediaFile.name.split('.').pop();
      const fileName = `${currentUser.id}-${Math.random()}.${fileExt}`;
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('feed_media')
        .upload(fileName, mediaFile);
        
      if (uploadError) {
        toast.error("Failed to upload media: " + uploadError.message);
        setLoading(false);
        return;
      }
      const { data: publicUrlData } = supabase.storage.from('feed_media').getPublicUrl(fileName);
      finalMediaUrl = publicUrlData.publicUrl;
    }

    const { error } = await supabase.from("community_posts").insert({
      author_id: currentUser.id,
      content: newPost,
      media_url: finalMediaUrl
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Update posted!");
      setNewPost("");
      clearMedia();
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

  const handleComment = async (postId: string) => {
    if (!newComment.trim()) return;
    setCommentLoading(true);
    
    const { error } = await supabase.from("community_comments").insert({
      post_id: postId,
      author_id: currentUser.id,
      content: newComment,
    });
    
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Comment added!");
      setNewComment("");
      fetchPosts();
    }
    setCommentLoading(false);
  };

  return (
    <div className="mt-8 space-y-4">
      <h2 className="text-xl font-bold border-b pb-2">Community Feed</h2>
      
      <Card className="bg-muted/30">
        <CardContent className="p-4">
          <div className="flex gap-4">
            <div className="h-10 w-10 rounded-full bg-accent flex items-center justify-center font-bold text-muted-foreground shrink-0 overflow-hidden">
              {currentUser?.avatar_url ? (
                <img src={currentUser.avatar_url} className="w-full h-full object-cover" />
              ) : (
                currentUser?.full_name ? currentUser.full_name.charAt(0).toUpperCase() : 'U'
              )}
            </div>
            <div className="flex-1 space-y-3">
              <textarea 
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                placeholder="Share a meme, an idea, or an update!" 
                className="w-full bg-transparent border-b border-primary/20 focus:border-primary outline-none resize-none p-2 text-sm"
                rows={2}
              />
              
              {mediaPreview && (
                <div className="relative w-48 h-48 rounded-md overflow-hidden border border-border">
                  <img src={mediaPreview} className="w-full h-full object-cover" />
                  <button onClick={clearMedia} className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-1 hover:bg-black/70 transition">
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}
              
              <div className="flex justify-between items-center pt-2">
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleMediaChange} 
                  accept="image/*" 
                  className="hidden" 
                />
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary" onClick={() => fileInputRef.current?.click()}>
                  <ImagePlus className="h-5 w-5" />
                </Button>
                <Button size="sm" onClick={handlePost} disabled={loading || (!newPost.trim() && !mediaFile)}>
                  {loading ? "Posting..." : "Post Update"}
                </Button>
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
                  <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold overflow-hidden ${post.author?.role === 'management' || post.author?.role === 'admin' ? 'bg-orange-500/20 text-orange-600' : 'bg-primary/20 text-primary'}`}>
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
              <p className="text-sm whitespace-pre-wrap mb-3">{post.content}</p>
              
              {post.media_url && (
                <div className="rounded-lg overflow-hidden border border-border/50 mb-3 bg-black/5">
                  <img src={post.media_url} alt="Post media" className="w-full h-auto max-h-96 object-contain" />
                </div>
              )}
              
              <div className="flex items-center gap-4 mt-2 pt-3 border-t">
                <button onClick={() => handleLike(post.id, post.likes)} className="text-muted-foreground hover:text-primary text-xs font-medium flex items-center gap-1 transition-colors">
                  ❤️ Like ({post.likes})
                </button>
                <button onClick={() => setActiveCommentPost(activeCommentPost === post.id ? null : post.id)} className="text-muted-foreground hover:text-primary text-xs font-medium flex items-center gap-1 transition-colors">
                  <MessageSquare className="h-3.5 w-3.5" /> Comment ({post.community_comments?.length || 0})
                </button>
              </div>
              
              {/* Comments Section */}
              {activeCommentPost === post.id && (
                <div className="mt-4 space-y-3 bg-muted/20 p-3 rounded-lg border border-border/50">
                  {post.community_comments && post.community_comments.length > 0 ? (
                    <div className="space-y-3 mb-3 max-h-60 overflow-y-auto pr-2">
                      {post.community_comments.map(comment => (
                        <div key={comment.id} className="flex gap-2">
                          <div className="h-6 w-6 rounded-full bg-accent flex items-center justify-center font-bold text-[10px] shrink-0">
                            {comment.author?.full_name ? comment.author.full_name.charAt(0).toUpperCase() : 'U'}
                          </div>
                          <div className="flex-1 bg-background border border-border/50 p-2 rounded-lg text-sm">
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-semibold text-xs">{comment.author?.full_name}</span>
                              <span className="text-[10px] text-muted-foreground">{formatDistanceToNow(new Date(comment.created_at))} ago</span>
                            </div>
                            <p className="text-muted-foreground leading-snug">{comment.content}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-muted-foreground text-center py-2">No comments yet. Be the first!</p>
                  )}
                  
                  <div className="flex gap-2 items-center">
                    <input 
                      type="text" 
                      placeholder="Write a comment..." 
                      className="flex-1 bg-background border border-border rounded-full px-3 py-1.5 text-sm outline-none focus:border-primary"
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleComment(post.id)}
                    />
                    <Button size="icon" className="h-8 w-8 rounded-full shrink-0" onClick={() => handleComment(post.id)} disabled={!newComment.trim() || commentLoading}>
                      <Send className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              )}
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