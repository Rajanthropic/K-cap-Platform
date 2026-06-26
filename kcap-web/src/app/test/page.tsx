import { createClient } from "@/lib/supabase/server";

export default async function TestPage() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) return <div>No User</div>;

    const { data: profile } = await supabase.from('users').select('*').eq('id', user.id).single();
    
    return <div>User: {user.email}, Role: {profile?.role}, Full Name: {profile?.full_name}</div>;
  } catch (e: any) {
    return <div>Error: {e.message}</div>;
  }
}