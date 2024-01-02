import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { WelcomePage } from "./pages/WelcomePage";
const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path={"/"} element={<WelcomePage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
