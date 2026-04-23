import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import PlayersPage from "./pages/PlayersPage";
import TeamsPage from "./pages/TeamsPage";
import ReportsPage from "./pages/ReportsPage";
import ComparePage from "./pages/ComparePage";
import AdminPage from "./pages/AdminPage";
import NotFound from "./pages/NotFound";
import FavoritesPage from "./pages/FavoritesPage";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div style={{ padding: "20px" }}>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/players" element={<PlayersPage />} />
          <Route path="/teams" element={<TeamsPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/compare" element={<ComparePage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;