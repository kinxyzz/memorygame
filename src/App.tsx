import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Game from "./UI/templates/Game";
import { GameProvider } from "./context/GameContext";

function App() {
  const queryClient = new QueryClient();

  return (
    //this overflow hidden to handle motion fade

    <QueryClientProvider client={queryClient}>
      <GameProvider>
        <div className="overflow-hidden">
          <Game />
        </div>
      </GameProvider>
    </QueryClientProvider>
  );
}
export default App;
