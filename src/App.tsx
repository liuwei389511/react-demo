/** @format */

import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home/index";
import Deepseek from "./pages/Deepseek/index";

import "./App.css";

function App() {
  const ListLink: { name: string; path: string }[] = [
    {
      name: "首页",
      path: "/home",
    },
    {
      name: "deepseek",
      path: "/deepseek",
    },
  ];

  const [activedClassName, setActivedClassName] = useState("/home");

  const handleActive = (path: string) => {
    console.log(path);
    setActivedClassName(path);
  };
  return (
    <BrowserRouter>
      {/* 导航链接 */}
      <nav className="nav">
        {ListLink.map((item: { name: string; path: string }) => {
          return (
            <div
              key={item.path}
              className={`${activedClassName === item.path ? "active" : ""}`}
              onClick={() => handleActive(item.path)}
            >
              <Link to={item.path}>{item.name}</Link>
            </div>
          );
        })}
      </nav>
      <div className="content">
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/deepseek" element={<Deepseek />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
