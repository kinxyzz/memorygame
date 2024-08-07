import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./UI/templates/Dashboard";
import Game from "./UI/templates/Game";
import Giveaway from "./UI/templates/Giveaway";
import JudTest from "./UI/templates/JudTest";
import { GameProvider } from "./context/GameContext";

function App() {
  const queryClient = new QueryClient();

  return (
    //this overflow hidden to handle motion fade

    <QueryClientProvider client={queryClient}>
      <GameProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Game />} key="game" />
            <Route path="/giveaway" element={<Giveaway />} key="game" />
            <Route path="/dashboard" element={<Dashboard />} key="dashboard" />
            <Route path="/testing" element={<JudTest />} key="dashboard" />
          </Routes>
        </BrowserRouter>
      </GameProvider>
    </QueryClientProvider>
  );
}
export default App;
