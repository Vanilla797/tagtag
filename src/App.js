
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Login from './Login'

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/'>
          <Login />
        </Route>
      </Switch>
    </Router>
    
  );
}

export default App;
