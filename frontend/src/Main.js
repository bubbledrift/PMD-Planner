
import "./Main.css"
import React, {useState} from "react";
import PopupAdd from "./popups/PopupAdd";
import TeamBox from "./TeamBox";
import PopupUndo from "./popups/PopupUndo";
import PopupEdit from "./popups/PopupEdit";

function Main() {

    const [showPopupAdd, setShowPopupAdd] = useState(false);
    const [showUndo, setShowUndo] = useState(false);
    const [showPopupEdit, setShowPopupEdit] = useState(false);

    /**
     * When adding pokemon, we need to know what pokemon to add and where to add it.
     */
    const [pokeToAdd, setPokeToAdd] = useState('')
    const [destinationBox, setDestinationBox] = useState(0)

    /**
     * When editing pokemon, we need to hold that pokemon's info to put into the popup.
     */
    const [pokeToEdit, setPokeToEdit] = useState(null)


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
                setShowPopupEdit={setShowPopupEdit}
                pokeToEdit={pokeToEdit}
                setPokeToEdit={setPokeToEdit}
            />
        );
    }

    return (
        <div>
            <div>
                <PopupAdd
                    showPopupAdd={showPopupAdd}
                    setShowPopupAdd={setShowPopupAdd}
                    setPokeToAdd={setPokeToAdd}
                />
                <PopupUndo
                    showUndo={showUndo}
                    setShowUndo={setShowUndo}
                />
                <PopupEdit
                    showPopupEdit={showPopupEdit}
                    setShowPopupEdit={setShowPopupEdit}
                    pokeToEdit={pokeToEdit}
                    setPokeToEdit={setPokeToEdit}
                />

                <h1>TITLE TBD</h1>

                {teams}

            </div>
        </div>
    )

}

export default Main;