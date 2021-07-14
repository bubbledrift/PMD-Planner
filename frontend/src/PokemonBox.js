import {Button} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import "./PokemonBox.css"

function PokemonBox(props) {

    const [pokemon, setPokemon] = useState('')

    const addPokePopup = () => {
        props.setShowPopupAdd(true)
        props.setDestinationBox(props.boxNumber)
        props.setPokeToAdd('')
    }

    const deletePoke = () => {
        setPokemon('')
        props.setShowUndo(true)
    }


    useEffect(() => {

        if (props.boxNumber === props.destinationBox && props.pokeToAdd !== '') {
            setPokemon(props.pokeToAdd)
        }
        
    }, [props.pokeToAdd])


    if (pokemon === '') {
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
                {pokemon}
                <Button variant="secondary" className='DeleteButton' onClick={deletePoke}>
                    Delete
                </Button>
            </div>
        )
    }

}

export default PokemonBox