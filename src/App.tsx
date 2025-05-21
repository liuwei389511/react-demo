/** @format */
import type { ComponentType } from "react";
import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home/index";
import Deepseek from "./pages/Deepseek/index";
import WeatherAgent from "./pages/WeatherAgent/index";

import "./App.css";

function App() {
  const ListLink: { name: string; path: string; cname: string }[] = [
    {
      name: "Home",
      cname: "首页",
      path: "/",
    },
    {
      name: "Deepseek",
      cname: "Deepseek",
      path: "/deepseek",
    },
    {
      name: "WeatherAgent",
      cname: "WeatherAgent",
      path: "/weatherAgent",
    },
  ];
  const componentMap: Record<string, ComponentType> = {
    Home,
    Deepseek,
    WeatherAgent,
  };

  const [activedClassName, setActivedClassName] = useState("/home");

  const handleActive = (path: string) => {
    console.log(path);
    setActivedClassName(path);
  };
  return (
    <BrowserRouter>
      {/* 导航链接 */}
      <nav className="nav">
        {ListLink.map((item: { name: string; path: string; cname: string }) => {
          return (
            <div
              key={item.path}
              className={`${activedClassName === item.path ? "active" : ""}`}
              onClick={() => handleActive(item.path)}
            >
              <Link to={item.path}>{item.cname}</Link>
            </div>
          );
        })}
      </nav>
      <div className="content">
        <Routes>
          {ListLink.map(
            (item: { name: string; path: string; cname: string }) => {
              // 从映射表中获取组件
              const Component = componentMap[item.name];
              // 返回带有动态组件的 Route
              return (
                <Route
                  key={item.path}
                  path={item.path}
                  element={<Component />}
                />
              );
            }
          )}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
