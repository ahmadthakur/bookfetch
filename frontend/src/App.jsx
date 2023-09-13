import { Routes, Route } from "react-router-dom";
import BookInfo from "./Pages/BookInfo/BookInfo";
import Home from "./Pages/Home/Home";
import Feedback from "./Pages/Feedback/Feedback";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book/:name" element={<BookInfo />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="*">404 Not Found</Route>
      </Routes>
    </div>
  );
}

export default App;
