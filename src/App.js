import React from "react";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
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
        {false && <Header />}
        <div className="relative my-10 px-4">
          <Routes>
            <Route path="*" element={<Search />} />
            <Route path="/detail" element={<Detail />} />
          </Routes>
        </div>

        {/* <Footer /> */}
      </div>
    </Router>
  );
}

export default App;
