// Import React library for building user interfaces
import React from "react";
// Import ReactDOM for rendering the React application
import ReactDOM from "react-dom/client";
// Import global styles for the application
import "./index.css";
// Import the root component of the application
import App from "./App";
// Import the function to measure performance in the app
import reportWebVitals from "./reportWebVitals";
// Import Bootstrap CSS for styling
import "bootstrap/dist/css/bootstrap.min.css";

// Import the Redux store and the Provider component
import store from "./store";
import { Provider } from "react-redux";

// Create a root element for rendering the React application
const root = ReactDOM.createRoot(document.getElementById("root"));

// Render the React application
root.render(
  <React.StrictMode>
    {/* Wrap the application in the Redux Provider to pass the store to all components */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// Call reportWebVitals to start measuring performance in the app
// Pass a function to log results or send them to an analytics endpoint
reportWebVitals();
