
import "./Main.css"
import React, {useState} from "react";
import Popup from "./Popup";
import TeamBox from "./TeamBox";

function Main() {

    const [showPopup, setShowPopup] = useState(false);

    /**
     * When adding pokemon, we need to know what pokemon to add and where to add it.
     */
    const [pokeToAdd, setPokeToAdd] = useState('')
    const [destinationBox, setDestinationBox] = useState(0)

    let teams = [];
    for (let i = 1; i < 8; i++) {
        teams.push(
            <TeamBox
                setShowPopup={setShowPopup}
                setDestinationBox={setDestinationBox}
                destinationBox={destinationBox}
                pokeToAdd={pokeToAdd}
                teamNumber={i}
            />
        );
    }

    return (
        <div>
            <div>
                <Popup showPopup={showPopup} setShowPopup={setShowPopup} setPokeToAdd={setPokeToAdd}/>

                <h1>TITLE TBD</h1>

                {teams}

            </div>
        </div>
    )

}

export default Main;