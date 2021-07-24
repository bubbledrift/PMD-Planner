import "./TeamBox.css"
import PokemonBox from "./PokemonBox";
import React from "react";

/**
 * TODO: make teams nameable, make team box collapsible.
 */
function TeamBox(props) {

    let boxes = [];
    for (let i = 1; i < 4; i++) {
        boxes.push(
            <PokemonBox
                setShowPopupAdd={props.setShowPopupAdd}
                setDestinationBox={props.setDestinationBox}
                destinationBox={props.destinationBox}
                pokeToAdd={props.pokeToAdd}
                setPokeToAdd={props.setPokeToAdd}
                boxNumber={props.teamNumber * 10 + i}
                setShowUndo={props.setShowUndo}
                setShowPopupEdit={props.setShowPopupEdit}
                pokeToEdit={props.pokeToEdit}
                setPokeToEdit={props.setPokeToEdit}
                lastDeleted={props.lastDeleted}
                setLastDeleted={props.setLastDeleted}
                deletedBox={props.deletedBox}
                setDeletedBox={props.setDeletedBox}
                undo={props.undo}
            />
        );
    }

    return (
        <div className='TeamBox'>
            <div className='BoxHeader'>
                Team {props.teamNumber}
            </div>

            <div className='Pokemon'>
                {boxes}
            </div>


        </div>
    )
}

export default TeamBox