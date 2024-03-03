import { createClient } from "@supabase/supabase-js";
import { Database } from "../types/supabase";

const supabaseUrl = "https://rxjiaclblqpaxkteqced.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ4amlhY2xibHFwYXhrdGVxY2VkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk0NzI3MDgsImV4cCI6MjAyNTA0ODcwOH0.nJ3PVj-5xgEbU6ttpepJeoTyAgyZN81iA2nXhPgWRPQ";
export const supabase = createClient<Database>(supabaseUrl, supabaseKey);
