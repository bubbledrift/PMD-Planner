import {Button} from "react-bootstrap";
import React, {useEffect} from "react";
import "./PokemonBox.css"
import {useLocalStorage} from "./Helpers";

function PokemonBox(props) {

    const [pokemon, setPokemon] = useLocalStorage(props.boxNumber,null)

    const addPokePopup = () => {
        //If the destination box is the same as the last deleted box's number, don't show the undo popup.
        if (props.deletedBox === props.boxNumber) {
            props.setShowUndo(false)
            props.setLastDeleted(null)
            props.setDeletedBox(0)
        }

        props.setShowPopupAdd(true)
        props.setDestinationBox(props.boxNumber)
        props.setPokeToAdd(null)
    }

    const deletePoke = (e) => {
        props.setLastDeleted(pokemon)
        props.setDeletedBox(props.boxNumber)
        setPokemon(null)
        props.setShowUndo(true)
        e.stopPropagation();
    }

    const editPoke = () => {
        props.setShowPopupEdit(true)
        props.setDestinationBox(props.boxNumber)
        props.setPokeToEdit(pokemon)
    }


    //When pokeToAdd changes, create a blank template of that pokemon.
    useEffect(() => {
        if (props.boxNumber === props.destinationBox && props.pokeToAdd !== null) {
            setPokemon(props.pokeToAdd)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.pokeToAdd])


    //When pokeToEdit changes and it's different from our current pokemon, change to that pokemon
    useEffect(() => {
        if (props.boxNumber === props.destinationBox) {
            setPokemon(props.pokeToEdit)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.pokeToEdit, props.showPopupEdit])

    //When undo changes, set this box's pokemon to the last deleted pokemon.
    useEffect(() => {
        if (props.boxNumber === props.deletedBox) {
            setPokemon(props.lastDeleted)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.undo])


    if (pokemon === null) {
        return (
            <div className='EmptyBox'>
                <Button variant="secondary" className='AddPokeButton' onClick={addPokePopup}>
                    + Add Pokémon
                </Button>
            </div>
        )
    } else {

        let type1Src = '/images/types/' + pokemon.Type1.toLowerCase() + '.gif'

        let type2Src = ''
        if (pokemon.Type2 !== "") {
            type2Src = '/images/types/' + pokemon.Type2.toLowerCase() + '.gif'
        }

        let portraitSrc = '/images/portraits/' + pokemon.Number.substring(1) + '.png'

        return (
            <div className='OuterBox'>
                <Button variant="secondary" className='EditButton' onClick={editPoke}>

                    <div className='PokemonBox'>

                        {pokemon.Nickname === '' &&
                        <div className='Name'>{pokemon.Name}</div>
                        }

                        {pokemon.Nickname !== '' &&
                        <div className='Name'>{pokemon.Nickname}</div>
                        }


                        <div className='TypeAndPic'>

                            <img id="portrait" src={process.env.PUBLIC_URL + portraitSrc} alt={pokemon.Name}/>

                            <div className='Type'>
                                <img src={process.env.PUBLIC_URL + type1Src} alt={pokemon.Type1}/>
                                <img src={process.env.PUBLIC_URL + type2Src} alt={pokemon.Type2}/>
                            </div>

                        </div>

                        <div className="LeftAlign">
                            <img src={process.env.PUBLIC_URL + "images/other/rarequality.png"}
                                 alt="Rare Quality"/> {pokemon.RareQuality}
                        </div>

                        <div className="LeftAlign">
                            <img src={process.env.PUBLIC_URL + "images/other/scarf.png"}
                                 alt="Item"/> {pokemon.Item}
                        </div>

                        <div className="Move">
                            {pokemon.Move1}
                        </div>

                        <div className="Move">
                            {pokemon.Move2}
                        </div>

                        <div className="Move">
                            {pokemon.Move3}
                        </div>

                        <div className="Move">
                            {pokemon.Move4}
                        </div>

                    </div>
                </Button>
                <Button variant="outline-danger" className='Delete' onClick={deletePoke}>
                    <img id="trash" src={process.env.PUBLIC_URL + 'images/other/delete.png'} alt="Delete"/>
                </Button>
            </div>
        )
    }

}

export default PokemonBox