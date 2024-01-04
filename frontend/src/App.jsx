import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { WelcomePage } from "./pages/welcome_page/WelcomePage";
import { CreateAccountPage } from "./pages/welcome_page/CreateAccountPage"
import { HomePage } from "./pages/welcome_page/HomePage";

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/create-account" element={<CreateAccountPage/>}/>
          <Route path="/home" element={<HomePage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
