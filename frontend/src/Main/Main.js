import "./Main.css"
import React, {useState} from "react";
import PopupAdd from "./AddPokemon/PopupAdd";
import TeamBox from "./TeamBox";
import PopupUndo from "./PopupUndo";
import PopupEdit from "./EditPokemon/PopupEdit";
import MyNavbar from "./MyNavbar";


function Main() {

    //Booleans that determine if popups should be rendered or not.
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

    //Keeps track of the last deleted pokemon to re-add if the user undoes the deletion.
    const [lastDeleted, setLastDeleted] = useState(null)
    //Keeps track of the box location of the last deleted pokemon
    const [deletedBox, setDeletedBox] = useState(0)
    //A boolean switch that is switched when the last deleted pokemon should be re-added.
    const [undo, setUndo] = useState(false)

    let teams = [];
    for (let i = 1; i < 10; i++) {
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
                lastDeleted={lastDeleted}
                setLastDeleted={setLastDeleted}
                deletedBox={deletedBox}
                setDeletedBox={setDeletedBox}
                undo={undo}
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
                    undo={undo}
                    setUndo={setUndo}
                    lastDeleted={lastDeleted}
                />
                <PopupEdit
                    showPopupEdit={showPopupEdit}
                    setShowPopupEdit={setShowPopupEdit}
                    pokeToEdit={pokeToEdit}
                    setPokeToEdit={setPokeToEdit}
                />

                <MyNavbar/>

                <div id='teams'>{teams}</div>


            </div>
        </div>
    )

}

export default Main;