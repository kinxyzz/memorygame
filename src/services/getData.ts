import { useQuery } from "@tanstack/react-query";

async function getData() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  return response.json();
}

export function useData() {
  const { data, isLoading } = useQuery({
    queryKey: ["data"],
    queryFn: getData,
  });

  return { data, isLoading };
}
