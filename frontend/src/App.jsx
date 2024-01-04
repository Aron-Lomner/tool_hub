import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { WelcomePage } from "./pages/welcome_page/WelcomePage";
import { CreateAccountPage } from "./pages/welcome_page/CreateAccountPage"

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/create-account" element={<CreateAccountPage/>}/>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
