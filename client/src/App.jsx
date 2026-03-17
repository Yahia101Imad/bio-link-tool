import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import PublicProfilePage from "./pages/PublicProfilePage";
import ErrorBoundary from './components/ErrorBoundary'

function App() {
  return (
    <Router>
      <Routes>
        <ErrorBoundary>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/:username" element={<PublicProfilePage />} />
        </ErrorBoundary>
      </Routes>
    </Router>
  );
}

export default App;
