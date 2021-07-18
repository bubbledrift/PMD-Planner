import {Button} from "react-bootstrap";
import JSONDATA from '../data/mockpmd.json'
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
        props.setDestinationBox(props.boxNumber)
        props.setPokeToEdit(pokemon)
    }


    //When pokeToAdd changes, create a blank template of that pokemon.
    useEffect(() => {

        if (props.boxNumber === props.destinationBox && props.pokeToAdd !== '') {


            let pokemonData = JSONDATA.filter((val) => {
                if (val.Name === props.pokeToAdd) {
                    return val
                }
            })[0]

            let poke = {
                "Name": props.pokeToAdd,
                "Nickname": "",
                "Type1": pokemonData.Type1,
                "Type2": pokemonData.Type2,
                "RareQuality": "RareQuality",
                "Item": "Item",
                "Move1": "Move1",
                "Move2": "Move2",
                "Move3": "Move3",
                "Move4": "Move4"
            }

            setPokemon(poke)
        }

    }, [props.pokeToAdd])

    //When pokeToEdit changes and it's different from our current pokemon, change to that pokemon
    useEffect(() => {

        if (props.boxNumber === props.destinationBox && props.pokeToEdit !== pokemon) {
            setPokemon(props.pokeToEdit)
        }

    }, [props.pokeToEdit])


    if (pokemon === null) {
        return (
            <div className='EmptyBox'>
                <Button variant="secondary" className='AddPokeButton' onClick={addPokePopup}>
                    + Add Pokemon
                </Button>
            </div>
        )
    } else {

        let type1Src = '/images/types/' + pokemon.Type1.toLowerCase() + '.gif'

        let type2Src = ''
        if (pokemon.Type2 !== "") {
            type2Src = '/images/types/' + pokemon.Type2.toLowerCase() + '.gif'
        }

        return (
            <div className='PokemonBox'>
                <div>

                    {pokemon.Nickname === '' &&
                        pokemon.Name
                    }

                    {pokemon.Nickname !== '' &&
                        <div>{pokemon.Nickname} ({pokemon.Name})</div>
                    }

                    <img src={process.env.PUBLIC_URL + type1Src} alt={pokemon.Type1}/>
                    <img src={process.env.PUBLIC_URL + type2Src} alt={pokemon.Type2}/>

                </div>

                <div>
                    Rare Quality: {pokemon.RareQuality}

                    Item: {pokemon.Item}
                </div>

                <div>
                    Move 1: {pokemon.Move1}
                    Move 2: {pokemon.Move2}
                    Move 3: {pokemon.Move3}
                    Move 4: {pokemon.Move4}
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