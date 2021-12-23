import React from 'react'
import {Redirect, Route} from 'react-router-dom'

function PrivateRoute({user, component: Component, location, ...rest}) {
	return(
		user ? 
			<Route 
				{...rest}
				render={routeProps => (
					<Component {...routeProps}/>
				)}
			/>			
		:
			<Redirect        
				to={{
					pathname: '/login',
					state: { from: location }
				}}
			/>
	)
}

export default PrivateRoute;