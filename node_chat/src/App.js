import React from 'react'
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom'
import MainPage from './pages/MainPage/MainPage'
import Login from './pages/LoginPage/Login'


const App = () => {
const currentUser = true
  return (
      <HashRouter>
          <Switch>
            <Route path='/login' render = {() => currentUser ? (<Redirect to='/' />) : (<Login/>)} />
            <Route path='/' render = {() => !currentUser ? (<Redirect to='/login' />) : (<MainPage/>)} />
            <Route path='/*' render = {() => <h1> 404 page not found </h1>} />
          </Switch>
      </HashRouter>
  )
}

export default App
