import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WelcomePage from "./pages/welcome_page/WelcomePage";
import { HomePage } from "./pages/home_page/HomePage";

const App = () => {
  return (
    <div id="root" style={{ height: "100vh" }}>
      <Router>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/home" element={<HomePage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
