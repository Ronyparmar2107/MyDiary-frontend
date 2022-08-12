import './App.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Login from './Pages/Login/Login';
import Home from './Pages/Home/Home';
import Header from './Components/Header/Header';


function App() {

  const login = false
  return (
    <Router>
      <Header />
      <Switch>
        <Route path='/'>
          {login ? <Home /> : <Login />}
        </Route>
        <Route path='/login'>
          {login ? <Home /> : <Login />}
        </Route>
        <Redirect to="/" />
      </Switch>

    </Router>
  );
}

export default App;
