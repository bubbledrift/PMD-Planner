
import "./Main.css"
import React, {useState} from "react";
import PopupAdd from "./PopupAdd";
import TeamBox from "./TeamBox";
import PopupUndo from "./PopupUndo";

function Main() {

    const [showPopupAdd, setShowPopupAdd] = useState(false);
    const [showUndo, setShowUndo] = useState(false);

    /**
     * When adding pokemon, we need to know what pokemon to add and where to add it.
     */
    const [pokeToAdd, setPokeToAdd] = useState('')
    const [destinationBox, setDestinationBox] = useState(0)

    let teams = [];
    for (let i = 1; i < 8; i++) {
        teams.push(
            <TeamBox
                setShowPopupAdd={setShowPopupAdd}
                setDestinationBox={setDestinationBox}
                destinationBox={destinationBox}
                pokeToAdd={pokeToAdd}
                setPokeToAdd={setPokeToAdd}
                teamNumber={i}
                setShowUndo={setShowUndo}
            />
        );
    }

    return (
        <div>
            <div>
                <PopupAdd showPopupAdd={showPopupAdd} setShowPopupAdd={setShowPopupAdd} setPokeToAdd={setPokeToAdd}/>
                <PopupUndo showUndo={showUndo} setShowUndo={setShowUndo} />

                <h1>TITLE TBD</h1>

                {teams}

            </div>
        </div>
    )

}

export default Main;