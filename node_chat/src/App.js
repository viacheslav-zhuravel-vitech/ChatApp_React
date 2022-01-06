import React, {useContext} from 'react'
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom'
import MainPage from './pages/MainPage/MainPage'
import Login from './pages/LoginPage/Login'
import {UserContext} from "./context/UserContext";



const App = () => {
  const userContext = useContext(UserContext);
  const user = userContext.user
  return (
      <HashRouter>
          <Switch>
            <Route path='/login' render = {() => user ? (<Redirect to='/' />) : (<Login/>)} />
            <Route path='/' render = {() => !user ? (<Redirect to='/login' />) : (<MainPage/>)} />
            <Route path='/*' render = {() => <h1> 404 page not found </h1>} />
          </Switch>
      </HashRouter>
  )
}

export default App
