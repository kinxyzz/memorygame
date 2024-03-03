import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Game from "./UI/templates/Game";

function App() {
  const queryClient = new QueryClient();

  return (
    //this overflow hidden to handle motion fade
    <QueryClientProvider client={queryClient}>
      <div className="overflow-hidden">
        <Game />
      </div>
    </QueryClientProvider>
  );
}
export default App;
