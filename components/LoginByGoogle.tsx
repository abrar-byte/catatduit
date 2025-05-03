import Image from "next/image";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { Button } from "./ui/button";

export default function LoginByGoogle() {
  const signIn = async () => {
    "use server";

    // 1. Create a Supabase client
    const supabase = await createClient();
    const headerStore=await headers()
    const origin = headerStore.get("origin");
    // 2. Sign in with GitHub
    const { error, data } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${origin}/auth/callback`,
      },
    });

    if (error) {
      console.log(error);
    } else {
      return redirect(data.url);
    }
    // 3. Redirect to landing page
  };

  return (
    <form
      action={signIn}
      className="flex-1 flex justify-center items-center"
    >
      <Button >
        <img
          className=" w-4 h-4"
          src="/svg/google-fill.svg"
       
          alt="Google"
        />
        Sign in with Google
      </Button>
    </form>
  );
}
