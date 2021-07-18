import Main from "./Main/Main";
import './App.css';
import {Route, Switch} from "react-router-dom";


const Router = () => {
  return (
      <Switch> {/* The Switch decides which component to show based on the current URL.*/}
          <Route exact path='/' component={Main}></Route>
      </Switch>
  );
}

function App() {
  return (
    <div className="App">
        {Router()}
    </div>
  );
}

export default App;
