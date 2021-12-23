import './App.css';
import Body from "../src/components/Body/Body"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory
} from "react-router-dom";
import React, {useState} from 'react'
import SignUp from "./components/SignUp/SignUp"
import Login from "./components/Login/Login"
import DashBoard from "./components/DashBoard/DashBoard"
import Medias from "./components/Medias/Medias"

import "./App.css"
// import ProjectEdit from './components/ProjectEdit/ProjectEdit';
import Projects from './components/Projects/Projects';
import ProjectEditor from './components/ProjectEditor/ProjectEditor'
import PortfolioEdit from './components/PortfolioEdit/PortFolioEdit'
import PrivateRoute from './components/PrivateRoute/PrivateRoute'
import PageNotFound from './components/PageNotFound/PageNotFound'



function App() {
  let [user, setUser] = useState(null)
  let history = useHistory()
  console.log("=====> USERRR", user )
  return (
    <Router history={history}>
      <Switch>

        {/* PUBLIC ROUTES */}
        <Route exact path="/signup" render={() => <SignUp/>}/>
        <Route exact path="/login" render={(props) => <Login {...props} setUser={setUser} />}/>
        <Route 
          exact 
          path={["/", "/projects/:project_name", "/about"]} 
          render={(props) => <Body {...props} user={user}/>}
        />
        {/* END PUBLIC ROUTES */}

        {/* PRIVATE ROUTES */}
        <PrivateRoute exact path="/admin/dashboard"  user={user} component={DashBoard}/>
        <PrivateRoute exact path="/admin/medias" user={user} component={Medias}/>
        <PrivateRoute exact path="/admin/portfolio" user={user} component={PortfolioEdit}/>
        <PrivateRoute path="/admin/projects" user={user} component={Projects}/>
        <PrivateRoute path="/edit/:projectId" user={user} component={ProjectEditor}/>
        {/* END PRIVATE ROUTES */}

        <Route path="*" component={PageNotFound}/>

      </Switch>
    </Router>
  );
}

export default App;
