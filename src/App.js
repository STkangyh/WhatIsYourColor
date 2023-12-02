import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./routes/Home";

function App() {
  return (
    <Router>
      {/* Link를 화면에 표시 */}
      <nav>
        <ul>
          <li>
            <Link to="/home">처음으로</Link>
          </li> 
          {/* 다른 링크들을 추가할 수 있음 */}
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* 다른 라우트들을 추가할 수 있음 */}
      </Routes>
    </Router>
  );
}

export default App;
