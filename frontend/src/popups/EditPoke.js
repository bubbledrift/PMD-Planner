import './EditPoke.css'
import {Button} from "react-bootstrap";
import React, {useState, useRef} from "react";

function EditPoke(props) {

    //Make our own, disconnected copy of the pokemon from pokeToEdit
    const pokemonRef = useRef(JSON.parse(JSON.stringify(props.pokeToEdit)))
    let pokemon = pokemonRef.current

    //Saving the text input fields
    const [nickname, setNickname] = useState(pokemon.Nickname)

    //TODO: Maybe extract out this code into separate file and just make a helper method?
    let type1Src = '/images/types/' + pokemon.Type1.toLowerCase() + '.gif'
    let type2Src = ''
    if (pokemon.Type2 !== "") {
        type2Src = '/images/types/' + pokemon.Type2.toLowerCase() + '.gif'
    }

    //Saves our changes to the pokemon, and closes the edit popup
    const savePoke = () => {
        pokemon.Nickname = nickname

        props.setPokeToEdit(pokemon)
        props.setShowPopupEdit(false)
    }

    let nicknamePlaceholder = 'Nickname'
    if (pokemon.Nickname !== '') {
        nicknamePlaceholder = pokemon.Nickname
    }

    return (
        <div>

            <div>


                <input
                    type="text"
                    placeholder={pokemon.Name}
                    onChange={(event) => {
                        //setSearchTerm(event.target.value)
                    }}
                />

                <input
                    type="text"
                    placeholder={nicknamePlaceholder}
                    maxlength="11"
                    onChange={(event) => {
                        setNickname(event.target.value)
                    }}
                />

                <img src={process.env.PUBLIC_URL + type1Src} alt={pokemon.Type1}/>
                <img src={process.env.PUBLIC_URL + type2Src} alt={pokemon.Type2}/>
            </div>
            <div>
                Rare Quality: {pokemon.RareQuality}

                Item: {pokemon.Item}
            </div>

            <div className='Moves'>
                Move 1: {pokemon.Move1}
                Move 2: {pokemon.Move2}
                Move 3: {pokemon.Move3}
                Move 4: {pokemon.Move4}
            </div>

            <div >
                <Button variant="secondary" className='SaveButton' onClick={savePoke}>
                    Save
                </Button>
            </div>
        </div>
    )


}

export default EditPoke