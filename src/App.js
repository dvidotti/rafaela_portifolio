import './App.css';
import Body from "../src/components/Body/Body"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory
} from "react-router-dom";
import SignUp from "./components/SignUp/SignUp"
import Login from "./components/Login/Login"
import DashBoard from "./components/DashBoard/DashBoard"
import Medias from "./components/Medias/Medias"

import "./App.css"
// import ProjectEdit from './components/ProjectEdit/ProjectEdit';
import Projects from './components/Projects/Projects';
import ProjectEditor from './components/ProjectEditor/ProjectEditor'
import PortfolioEdit from './components/PortfolioEdit/PortFolioEdit'


function App() {
  let history = useHistory()
  return (
    <Router history={history}>
      <Switch>
       <Route exact path="/signup" render={() => <SignUp/>}/>
       <Route exact path="/login" render={() => <Login/>}/>
       <Route exact path="/admin/dashboard" render={() => <DashBoard /> }/>
       <Route exact path="/admin/medias" render={() => <Medias /> }/>
       <Route exact path="/admin/portfolio" render={() => <PortfolioEdit /> }/>
       <Route path="/admin/projects" render={() => <Projects/> }/>
       {/* <Route path="/admin/project-edit" render={() => <ProjectEdit/> }/> */}
       <Route path="/edit/:projectId" render={() => <ProjectEditor/>}/>
       <Body/>
      </Switch>
    </Router>
  );
}

export default App;
