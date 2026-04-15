import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Hero from "./components/Hero.jsx"; // Dynamic Hero component
import Landing from "./components/Landing.jsx"; // New Landing Page

function App() {
  return (
    <Router>
      <Routes>
        {/* Default Route - Landing Page */}
        <Route path="/" element={<Landing />} />

        {/* Dynamic Route for music themes */}
        <Route path="/:themeName" element={<Hero />} />
      </Routes>
    </Router>
  );
}

export default App;
