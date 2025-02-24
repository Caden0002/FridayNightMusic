import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Hero from "./components/Hero.jsx"; // Import dynamic Hero component

function App() {
  return (
    <Router>
      <Routes>
        {/* Default route redirects to /work */}
        <Route path="/" element={<Navigate replace to="/work" />} />

        {/* Dynamic Route */}
        <Route path="/:themeName" element={<Hero />} />
      </Routes>
    </Router>
  );
}

export default App;
