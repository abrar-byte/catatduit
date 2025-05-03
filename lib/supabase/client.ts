import { toast } from "@/hooks/use-toast";
import { createBrowserClient } from "@supabase/ssr";
import { useEffect } from "react";

export const createClient = () => {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
};

export const supabase=createClient();

export const supabaseSignout = async () => {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();
  if (error){
    toast({
      description: error.message,
      variant: "destructive",})
  } 
  window.location.href="/"
};

