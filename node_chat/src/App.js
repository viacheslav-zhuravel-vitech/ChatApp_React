import { HashRouter, Switch, Route, Redirect } from 'react-router-dom'
import appStyle from './App.module.scss'
import MainPage from './pages/MainPage/MainPage'
import LoginPage from './pages/LoginPage/LoginPage'
import React,{ useEffect } from 'react'

const App = () => {
const currentUser = true
  return (
      <HashRouter>
        <div className={appStyle.body}>
          <Switch>
            <Route path='/login' render = {() => currentUser ? (<Redirect to='/' />) : (<LoginPage/>)} />
            <Route path='/' render = {() => !currentUser ? (<Redirect to='/login' />) : (<MainPage/>)} />
            <Route path='/*' render = {() => <h1> 404 page not found </h1>} />
          </Switch>
        </div>
      </HashRouter>
  )
}

export default App
