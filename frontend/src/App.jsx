import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WelcomePage from "./pages/welcome_page/WelcomePage";
import { HomePage } from "./pages/home_page/HomePage";
import FindGroupPage from "./pages/find_group/FindGroupPage";

const App = () => {
  return (
    <div id="root" style={{ height: "100vh" }}>
      <Router>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/find-groups" element={<FindGroupPage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
