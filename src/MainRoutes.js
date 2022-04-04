import HomePage from 'screens/HomePage/HomePage'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useHistory,
} from 'react-router-dom'
import React, { useState } from 'react'
import SignUp from 'screens/SignUp/SignUp'
import Login from 'screens/Login/Login'
import Medias from 'screens/Medias/Medias'

import Projects from 'screens/HomePage/components/Projects/Projects'
import ProjectEditor from 'screens/ProjectEditor/ProjectEditor'
import PortfolioEdit from 'screens/PortfolioEdit/PortFolioEdit'
import PrivateRoute from 'components/PrivateRoute/PrivateRoute'
import PageNotFound from 'screens/PageNotFound/PageNotFound'

function MainRoutes() {
    let [user, setUser] = useState(null)
    let history = useHistory()
    return (
        <Router history={history}>
            <Switch>
                {/* PUBLIC ROUTES */}
                <Route exact path="/signup" render={() => <SignUp />} />
                <Route
                    exact
                    path="/login"
                    render={props => <Login {...props} setUser={setUser} />}
                />
                <Route
                    exact
                    path={['/', '/projects/:project_name', '/about']}
                    render={props => <HomePage {...props} user={user} />}
                />
                {/* END PUBLIC ROUTES */}

                {/* PRIVATE ROUTES */}
                <PrivateRoute
                    exact
                    path="/admin/medias"
                    user={user}
                    component={Medias}
                />
                <PrivateRoute
                    exact
                    path="/admin/portfolio"
                    user={user}
                    component={PortfolioEdit}
                />
                <PrivateRoute
                    path="/admin/projects"
                    user={user}
                    component={Projects}
                />
                <PrivateRoute
                    path="/edit/:projectId"
                    user={user}
                    component={ProjectEditor}
                />
                {/* END PRIVATE ROUTES */}

                <Route path="*" component={PageNotFound} />
            </Switch>
        </Router>
    )
}

export default MainRoutes
