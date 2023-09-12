import { Routes, Route } from "react-router-dom";
import BookInfo from "./Pages/BookInfo/BookInfo";
import Home from "./Pages/Home/Home";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book/:id" element={<BookInfo />} />
      </Routes>
    </div>
  );
}

export default App;
