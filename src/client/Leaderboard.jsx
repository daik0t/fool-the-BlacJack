import { useEffect, useState } from "react";
import React from "react";

function Leaderboard(){

    const [state, setState] = useState(null);

    const callBackendAPI = async () => {
        const response = await fetch('/api/users');
        const body = await response.json();

        if (response.status() !== 200) {
            throw Erorr(body.message);
        }
        
        return body;
    }

    useEffect(() => {
        callBackendAPI()
        .then(res = setState(res.express))
        .catch(err => console.log(err)
        );
    }, [])

    return (
        <div>
            до
            {state}
            после
        </div>
    );
}

export default Leaderboard;