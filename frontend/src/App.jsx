import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { WelcomePage } from "./pages/WelcomePage";
import { GroupPage } from "./pages/group_page/GroupPage";
const App = () => {
  return (
    <div id="root" style={{ height: '100vh' }}>
      <Router>
        <Routes>
          <Route path={"/"} element={<WelcomePage />} />
          <Route path={"/groupPage"}element={<GroupPage/>}/>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
