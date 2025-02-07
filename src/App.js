import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Login from './Pages/Login/Login';
import Home from './Pages/Home/Home';
import Header from './Components/Header/Header';


function App() {

  const [logIn, setLogIn] = useState(false)

  useEffect(() => {
    let token = localStorage.getItem('authtoken')
    console.log(token)
    if (token !== undefined && token !== null) {
      setLogIn(true)
    }
  }, [])

  const logInHandler = () => {
    setLogIn(true)
  }
  return (

    <Router>
      <Header />
      <Switch>
        <Route path='/'>
          {logIn ? <Home /> : <Login login={logInHandler} />}
        </Route>
        <Route path='/login'>
          {logIn ? <Home /> : <Login login={logInHandler} />}
        </Route>
        <Redirect to="/" />
      </Switch>

    </Router>

  );
}

export default App;
