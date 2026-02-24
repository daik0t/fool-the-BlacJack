import { Link } from "react-router-dom";

function play(){
    return (
        <div>
            <setup>
                <table width="100%">
                    <tr valign="top">
                        <td >
                            Сколько Игроков&nbsp;
                            <select>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5 </option>
                            </select>
                        </td>
                        <td >
                            Сколько кололд&nbsp;
                            <select>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5 </option>
                            </select>
                        </td> 
                    </tr>
                </table>
            </setup>
            <main align="center">
                <Link to="../game">Start Game</Link>
            </main>
        </div>
    );
}

export default play;