import Main from "./Main/Main";
import About from "./Main/SidePages/About";
import faq from "./Main/SidePages/faq";
import './App.css';
import {Route, Switch} from "react-router-dom";


const Router = () => {
  return (
      <Switch> {/* The Switch decides which component to show based on the current URL.*/}
          <Route exact path='/' component={Main}></Route>
          <Route exact path='/about' component={About}></Route>
          <Route exact path='/faq' component={faq}></Route>
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
