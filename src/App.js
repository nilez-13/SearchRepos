import React from "react";
import "./App.css";
import Header from "./layouts/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Search from "./containers/Search";
import Detail from "./containers/Detail";
import Footer from "./layouts/Footer";

function App() {
  return (
    <Router>
      <div>
        <Header />
        <div className="relative my-10 px-4">
          <Routes>
            <Route exact path="/" element={<Search />} />
            <Route exact path="/detail/:user/:repo" element={<Detail />} />
          </Routes>
        </div>

        {/* <Footer /> */}
      </div>
    </Router>
  );
}

export default App;
