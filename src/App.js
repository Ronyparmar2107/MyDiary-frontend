import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Login from './Pages/Login/Login';
import Home from './Pages/Home/Home';
import Header from './Components/Header/Header';


function App() {

  const [logIn, setLogIn] = useState(false)
  const logInHandler = () => {
    setLogIn(true)
  }
  return (
    <Router>
      <Header />
      <Switch>
        <Route path='/'>
          {/* {logIn ? <Home /> : <Login login={logInHandler} />} */}
          <Home />
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
