import { useNavigate } from "react-router-dom";
var defaultPlayers;
var defaultDecks;

function Play(){
    const navigate = useNavigate();
    const HandleSubmit = (e) => {        
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);

        const formJson = Object.fromEntries(formData.entries());

        const data = formJson;
        
        defaultDecks = data["deckNum"]
        defaultPlayers = data["playerNum"]
        navigate('../game', {state: {data}})
      }
    return (
        <div>
            <form method="post" onSubmit={HandleSubmit}>

                <table width="100%">
                    <tbody>
                        <tr valign="top">
                            <td >
                                Сколько Игроков&nbsp;
                                <select name="playerNum" defaultValue={defaultPlayers}>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5 </option>
                                </select>
                            </td>
                            <td >
                                Сколько кололд&nbsp;
                                <select name="deckNum" defaultValue={defaultDecks} >
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5 </option>
                                </select>
                            </td> 
                        </tr>
                    </tbody>
                </table>

                <main align="center">
                    <button type="submit">Start Game</button>
                </main>

            </form>
        </div>
    );
}

export default Play;