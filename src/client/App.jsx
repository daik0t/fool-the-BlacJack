import Main from './Main';
import Play from './Play';
import Instructions from './Instructions';
import Leaderboard from './Leaderboard';
import Signup from "./SignUp";
import Login from "./Login";
import Game from './Game';
import './app.css'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import styled from 'styled-components';
import { PrivateRoute } from './components/PrivateRoute';
import { useAuth } from './context/AuthContext';

const StyledLink = styled(Link)`
  color: black;
  text-decoration: none;
`;

function App(){
    const { user, logout } = useAuth();

    return ( 
        <Router>
            <div>
                <h1 className='template'><StyledLink to="/">Fool the blackjack</StyledLink></h1>
            </div>
            {user && (
                <div style={{ position: 'fixed', top: 10, right: 20 }}>
                    <span>Hello, {user.username} | </span>
                    <button onClick={logout}>Logout</button>
                </div>
            )}
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/instructions" element={<Instructions />} />
                <Route path="/register" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/play" element={<PrivateRoute><Play /></PrivateRoute>} />
                <Route path="/game" element={<PrivateRoute><Game /></PrivateRoute>} />
                <Route path="/leaderboard" element={<Leaderboard />} />
            </Routes>
        </Router>
    );
}

export default App;