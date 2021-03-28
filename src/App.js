import './App.css';
import Home from "../src/components/Home/Home"
import About from "../src/components/About/About"
import Body from "../src/components/Body/Body"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
  Link
} from "react-router-dom";

import "./App.css"



function App() {

  return (
    <Router>
      <Body/>
    </Router>
  );
}

export default App;
