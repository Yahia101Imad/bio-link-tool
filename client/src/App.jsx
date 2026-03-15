import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
// import DashboardPage from "./pages/DashboardPage";
// import PublicProfilePage from "./pages/PublicProfilePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        {/* <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/:username" element={<PublicProfilePage />} /> */}
      </Routes>
    </Router>
  );
}

export default App;