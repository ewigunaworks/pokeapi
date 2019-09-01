import React from "react";
import ReactDOM from "react-dom";
import Main from "./Main";
import { BrowserRouter } from 'react-router-dom'
import "./style.css";
import 'bootstrap/dist/css/bootstrap.css';
import 'rc-collapse/assets/index.css';
 
ReactDOM.render(
	<BrowserRouter>
  		<Main/>
  	</BrowserRouter>, 
  document.querySelector("#root")
);