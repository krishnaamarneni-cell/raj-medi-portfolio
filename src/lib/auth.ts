import { createClient } from "@/lib/supabase/server";

export async function verifySession(): Promise<boolean> {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  return !!data.user;
}
