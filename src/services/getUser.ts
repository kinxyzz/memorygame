import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "./supabase";

export default async function insertUser({
  name,
  score,
}: {
  name: string;
  score?: number;
}) {
  const { data: existingUsers, error } = await supabase
    .from("user")
    .select("id")
    .eq("name", name);

  if (error) {
    console.error("Error checking existing user:", error.message);
    return null;
  }

  if (existingUsers && existingUsers.length > 0) {
    const { data } = await supabase
      .from("user")
      .update({ score: score })
      .eq("id", existingUsers[0].id)
      .select();

    return data;
  } else {
    const { data } = await supabase
      .from("user")
      .insert([{ name: name, score: score }])
      .select();

    return data;
  }
}

export function createUser() {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: insertUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
  return { mutate };
}

async function getUser() {
  const { data, error } = await supabase
    .from("user")
    .select("id,name, score")
    .order("score", { ascending: false })
    .limit(10);

  if (error) {
    console.error("Error fetching user:", error.message);
    return null;
  }

  return data;
}

export function useUser() {
  const { data } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });

  return { data };
}
