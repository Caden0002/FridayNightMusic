import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Hero from "./components/Hero.jsx"; // Import dynamic Hero component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/:themeName" element={<Hero />} /> {/* Dynamic Route */}
      </Routes>
    </Router>
  );
}

export default App;
