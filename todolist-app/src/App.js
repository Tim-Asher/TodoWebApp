import "./App.css";
import Header from "./features/layout/Header";
import Items from "./features/items/Items";
import { Provider } from "./context/todos";
import LoginModal from "./features/layout/LoginModal";
import LoginButton from "./features/layout/LoginButton";

function App() {
  return (
    <Provider>
      <LoginModal />
      <div className="App pt-5 container">
        <LoginButton />
        <div className="row d-flex justify-content-around">
          <Header />
          <Items />
        </div>
      </div>
    </Provider>
  );
}

export default App;
