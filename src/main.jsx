import React from 'react'
// import ReactDOM from 'react-dom/client'
import 'lib-flexible/flexible'
import App from './App'
import './index.css'
import {  BrowserRouter as Router} from "react-router-dom";
import { createRoot } from "react-dom/client";
// 为提供的创建一个 React 根container并返回根。
const root = createRoot(document.getElementById("root"));
// 根可用于将 React 元素渲染到 DOM 中
root.render( <Router><App /></Router>);


// ReactDOM.createRoot(document.getElementById('root')).render(
//       <Router>
//           <App />
//       </Router>
// )
