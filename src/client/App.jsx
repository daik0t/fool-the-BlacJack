import Main from './Main';
import Play from './Play';
import Instructions from './Instructions';
import Leaderboard from './Leaderboard';
import Signup from "./SignUp";
import Login from "./Login";
import AuthFlipCard from './components/AuthFlipCard';
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
import Button from './components/LogoutButton';
import Shuffle from './components/Shuffle'; 
import TextType from './components/TextType';
import Layout from './components/Layout';

const StyledLink = styled(Link)`
  color: black;
  text-decoration: none;
`;

function App(){
    const { user, logout } = useAuth();

    return ( 
        <Router>
            <Layout> 
            <div>
                <h1 className='template'>
                    <StyledLink to="/">
                        <Shuffle
                        text="Fool the blackjack"
                        shuffleDirection="right"
                        duration={0.35}
                        animationMode="evenodd"
                        shuffleTimes={6}
                        ease="power3.out"
                        stagger={0.02}
                        threshold={0.1}
                        triggerOnce={true}
                        triggerOnHover={true}
                        respectReducedMotion={true}
                        loop={false}
                        tag="span"
                        textAlign="center"
                        />
                    </StyledLink>
                </h1>
            </div>
            {user && (
                <div style={{ position: 'fixed', top: "90vh", right: "2vw" }}>
                    <TextType
                        text={[
                            `Hello, ${user.username}`,
                            `Welcome back!`,
                            `Ready to play?`,
                            `Let's shuffle!`
                        ]}
                        typingSpeed={50}
                        pauseDuration={5000}
                        showCursor={true}
                        cursorCharacter=""
                        loop={true}
                        as="span"
                        className="greeting-text"
                        />
                    <button className="logout" onClick={logout}>    
                        <Button/>
                    </button>
                </div>
            )}
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/instructions" element={<Instructions />} />
                <Route path="/register" element={<AuthFlipCard defaultSide="register"/>} />
                <Route path="/login" element={<AuthFlipCard defaultSide="login"/>} />
                <Route path="/play" element={<PrivateRoute><Play /></PrivateRoute>} />
                <Route path="/game" element={<PrivateRoute><Game /></PrivateRoute>} />
                <Route path="/leaderboard" element={<Leaderboard />} />
            </Routes>
            </Layout>
        </Router>
    );
}

export default App;