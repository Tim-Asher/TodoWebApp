// Import the CSS file for styling the App component
import "./App.css";
// Import the Header component to be displayed at the top of the application
import Header from "./features/layout/Header";
// Import the Items component to display the list of items
import Items from "./features/items/Items";
// Import the Provider component for context management
import { Provider } from "./context/todos";
// Import the LoginModal component for user login functionality
import LoginModal from "./features/layout/LoginModal";
// Import the LoginButton component to trigger the login modal
import LoginButton from "./features/layout/LoginButton";

// Define the App component
function App() {
  return (
    // Wrap the application in the Provider to provide context to all child components
    <Provider>
      <LoginModal /> {/* Render the LoginModal component */}
      <div className="App pt-5 container">
        <LoginButton /> {/* Render the LoginButton component */}
        <div className="row d-flex justify-content-around">
          <Header /> {/* Render the Header component */}
          <Items /> {/* Render the Items component */}
        </div>
      </div>
    </Provider>
  );
}

// Export the App component for use in other parts of the application
export default App;
