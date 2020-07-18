import React from 'react'
import './App.css'
import 'bootswatch/dist/slate/bootstrap.min.css'
import HomePage from './pages/HomePage'
import { HashRouter, Switch, Route } from 'react-router-dom'

function App() {
  return (
    <div>
      <HashRouter>
        <main className="container pt-5">
          <Switch>
            <Route path="/" component={HomePage} />
          </Switch>
        </main>
      </HashRouter>
    </div>
  )
}

export default App
