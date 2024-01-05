import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WelcomePage from "./pages/welcome_page/WelcomePage";
import { HomePage } from "./pages/home_page/HomePage";
import { GroupPage } from "./pages/group_page/GroupPage";

const App = () => {
  return (
    <div id="root" style={{ height: "100vh" }}>
      <Router>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/grouppage" element={<GroupPage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
