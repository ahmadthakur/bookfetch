import { Routes, Route } from "react-router-dom";
import BookInfo from "./Pages/BookInfo";
import Home from "./Pages/Home";
import Feedback from "./Pages/Feedback";
import SearchResults from "./Pages/SearchResults";
import NotFound from "./Pages/NotFound";
import { SearchProvider } from "./SearchContext";

function App() {
  return (
    <div className="overflow-hidden">
      <SearchProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/book/:name" element={<BookInfo />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </SearchProvider>
    </div>
  );
}

export default App;
