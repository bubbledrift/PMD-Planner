import {Button} from "react-bootstrap";
import React, {useRef} from "react";
import "./PokemonBox.css"

function PokemonBox(props) {

    const addPokePopup = () => {
        props.setShowPopup(true);
        props.setDestinationBox(props.boxNumber)
    }

    const pokemon = useRef('')

    if (props.boxNumber === props.destinationBox && props.pokeToAdd !== '') {
        pokemon.current = props.pokeToAdd
    }

    return (
        <div className='PokemonBox'>

            {pokemon.current === '' &&
                <Button variant="secondary" className='AddPokeButton' onClick={addPokePopup}>
                    + Add Pokemon
                </Button>
            }

            {pokemon.current !== '' &&
                <div>
                    {pokemon.current}
                </div>
            }

        </div>
    )
}

export default PokemonBox