import './App.css';
import Home from "../src/components/Home/Home"
import About from "../src/components/About/About"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import ProjectPage from "./components/ProjectPage/ProjectPage"

function App() {
  return (
    
    <Router>
      <Switch>
        <Route exact path="/">
          <Home/>
        </Route>
        <Route exact path="/about" render={(props) => <About {...props}/>}/>
        <Route path="/projects/:project_name" render={(props) => <ProjectPage {...props}/>}/>
      </Switch>
    </Router>
  );
}

export default App;
