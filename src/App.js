import './App.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Login from './Pages/Login/Login';
import Signup from './Pages/Signup/Signup';
import Home from './Pages/Home/Home';


function App() {

  const login = true
  return (
    <Router>
      <div className="App">
      </div>
      <Switch>
        <Route path='/'>
          {login ? <Home /> : <Login />}
        </Route>
        <Route path='/login'>
          {login ? <Home /> : <Login />}
        </Route>
        <Route path='/signup'>
          {login ? <Home /> : <Signup />}
        </Route>
        <Redirect to="/" />
      </Switch>

    </Router>
  );
}

export default App;
