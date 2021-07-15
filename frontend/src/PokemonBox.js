import {Button} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import "./PokemonBox.css"

function PokemonBox(props) {

    const [pokemon, setPokemon] = useState(null)


    const addPokePopup = () => {
        props.setShowPopupAdd(true)
        props.setDestinationBox(props.boxNumber)
        props.setPokeToAdd('')
    }

    const deletePoke = () => {
        setPokemon(null)
        props.setShowUndo(true)
    }

    /**
     * Should bring up a popup for the editing of the specific pokemon.
     */
    const editPoke = () => {
        props.setShowPopupEdit(true)

    }


    useEffect(() => {

        if (props.boxNumber === props.destinationBox && props.pokeToAdd !== '') {

            //TODO: MAKE POKEMON OBJECT FROM props.pokeToAdd
            let poke = {
                "Name": props.pokeToAdd,
                "Nickname": "",
                "Type1": "",
                "Type2": "",
                "RareQuality": "",
                "Item": "",
                "Move1": "",
                "Move2": "",
                "Move3": "",
                "Move4": ""
            }

            setPokemon(poke)
        }

    }, [props.pokeToAdd])


    if (pokemon === null) {
        return (
            <div className='EmptyBox'>
                <Button variant="secondary" className='AddPokeButton' onClick={addPokePopup}>
                    + Add Pokemon
                </Button>
            </div>
        )
    } else {
        return (
            <div className='PokemonBox'>
                <div>


                    Nickname ({pokemon})

                    Typing
                </div>

                <div>
                    Rare Quality

                    Item
                </div>

                <div>
                    Move 1
                    Move 2
                    Move 3
                    Move 4
                </div>


                <Button variant="secondary" className='DeleteButton' onClick={deletePoke}>
                    Delete
                </Button>

                <Button variant="secondary" className='EditButton' onClick={editPoke}>
                    Edit
                </Button>

            </div>
        )
    }

}

export default PokemonBox