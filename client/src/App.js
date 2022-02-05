import {BrowserRouter as Router, Routes, Route, Redirect} from "react-router-dom";

import VirtualShelves from "./pages/VirtualShelves";
import Navigation from "./components/Navigation";
import VirtualShelf from "./pages/VirtualShelf";
import Book from "./pages/Book";

function App() {
  return (
    <>
      <Router>
        <Navigation/>
        {/* lista rute */}
        <Routes>
          <Route exact path="/" element={<VirtualShelves/>}/>
          <Route exact path ="/shelfview/:id" element={<VirtualShelf/>}></Route>
          {/* rutare pe baza id-ului de entitate copil */}
          <Route exact path ="/shelfview/:shelfId/book/:id" element={<Book/>}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
