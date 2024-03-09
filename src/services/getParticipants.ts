import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "./supabase";

export async function getParticipants() {
  let { data: temenGiveaway } = await supabase
    .from("temenGiveaway")
    .select("*");

  return temenGiveaway;
}

export async function insertParticipants({
  name,
  discord,
}: {
  name: string;
  discord: string;
}) {
  const { data } = await supabase
    .from("temenGiveaway")
    .insert([{ IGN: name, Discord: discord }])
    .select();

  return data;
}

export function createParticipants() {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: insertParticipants,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["participant"] });
    },
  });
  return { mutate };
}

export function useParticipants() {
  const { data } = useQuery({
    queryKey: ["participant"],
    queryFn: getParticipants,
  });

  return { data };
}
