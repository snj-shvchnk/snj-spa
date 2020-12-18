import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "../src/Components/App";
import "../src/style.css";

// Server data predefinition (defaults)
window._frontConfig = 
window._frontConfig || {
    DEBUG: true,
    apiBaseUrl: '/api/',
    someFrontEndData: '12343523512',
};

ReactDOM.render(
    <Router>
        <App />
    </Router>,
    document.getElementById("root")
);
