import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WelcomePage from "./pages/welcome_page/WelcomePage";

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
