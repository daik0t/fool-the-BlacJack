import Main from './Main';
import Play from './Play';
import Instructions from './Instructions';
import Leaderboard from './Leaderboard';
import Game from './Game';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App(){
    return (
        <Router>
            <Routes>
                <Route 
                    exact
                    path="/"
                    element={<Main />}
                />
                <Route
                    exact
                    path="/Play"
                    element={<Play/>}
                />
                <Route
                    exact
                    path="/Instructions"
                    element={<Instructions/>}
                />
                <Route
                    exact
                    path="/Leaderboard"
                    element={<Leaderboard/>}
                />
                <Route
                    exact
                    path="/Game"
                    element={<Game/>}
                />
            </Routes>
        </Router>
    );
}

export default App;