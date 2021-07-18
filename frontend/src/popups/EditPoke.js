import './EditPoke.css'
import {Button} from "react-bootstrap";
import React, {useState, useRef, useEffect} from "react";
import itemdata from "../data/HeldItems.json";
import RQdata from "../data/RareQualities.json"

function EditPoke(props) {

    //Make our own, disconnected copy of the pokemon from pokeToEdit
    const pokemonRef = useRef(JSON.parse(JSON.stringify(props.pokeToEdit)))
    let pokemon = pokemonRef.current


    let defaultItemText = ''
    let defaultRQText = ''
    //Determines if pokemon's field is default or not
    if (pokemon.Item !== 'Item') {
        defaultItemText = pokemon.Item
    }
    if (pokemon.RareQuality !== 'RareQuality') {
        defaultRQText = pokemon.RareQuality
    }

    /**
     * The are 2 types of variables we need
     * one for keeping track of the text in the html input, and one for the actual pokemon's attribute
     */

    //Saving the text input fields
    const [nickname, setNickname] = useState(pokemon.Nickname)
    const [item, setItem] = useState(pokemon.Item)
    const [rq, setRQ] = useState(pokemon.RareQuality)
    const [itemText, setItemText] = useState(defaultItemText)
    const [rqText, setRQText] = useState(defaultRQText)

    //Checks if item input has changed in order to tell results to filter or not
    const [itemInputChanged, setItemInputChanged] = useState(false)
    const [RQInputChanged, setRQInputChanged] = useState(false)

    //Determines which result set to show
    const [resultType, setResultType] = useState('')
    const [results, setResults] = useState([])
    //Keeps track of if the mouse is in the results div area
    const [mouseInResults, setMouseInResults] = useState(false)

    //TODO: Maybe extract out this code into separate file and just make a helper method?
    let type1Src = '/images/types/' + pokemon.Type1.toLowerCase() + '.gif'
    let type2Src = ''
    if (pokemon.Type2 !== "") {
        type2Src = '/images/types/' + pokemon.Type2.toLowerCase() + '.gif'
    }

    //Saves our changes to the pokemon, and closes the edit popup
    const savePoke = () => {
        pokemon.Nickname = nickname
        pokemon.Item = item
        pokemon.RareQuality = rq

        props.setPokeToEdit(pokemon)
        props.setShowPopupEdit(false)
    }

    //Search Filter
    let itemResults = itemdata.filter((val) => {
        if (itemText === "" || !itemInputChanged) {
            return val
        } else if (val.Name.toLowerCase().includes(itemText.toLowerCase())) {
            return val
        }
    })

    let rqResults = RQdata.filter((val) => {
        if (rqText === "" || !RQInputChanged) {
            return val
        } else if (val.Name.toLowerCase().includes(rqText.toLowerCase())) {
            return val
        }
    })


    //This use effect should happen every time the result type changes or text input changes
    useEffect(() => {
        if (resultType === 'Item') {
            setResults(itemResults)
        } else if (resultType === "Rare Quality") {
            setResults(rqResults)
        } else {
            setResults([])
        }
    }, [resultType, itemText, rqText])


    return (
        <div>
            <div>
                Pokemon
                <input
                    type="text"
                    defaultValue={pokemon.Name}
                    onChange={(event) => {
                        //setSearchTerm(event.target.value)
                    }}
                />

                Nickname
                <input
                    type="text"
                    value={nickname}
                    maxLength="11"
                    onChange={(event) => {
                        setNickname(event.target.value)
                    }}
                />

                <img src={process.env.PUBLIC_URL + type1Src} alt={pokemon.Type1}/>
                <img src={process.env.PUBLIC_URL + type2Src} alt={pokemon.Type2}/>
            </div>
            <div>
                Rare Quality
                <input
                    type="text"
                    value={rqText}
                    onFocus={() => {
                        setResultType('Rare Quality')
                        setRQInputChanged(false)
                    }}
                    onChange={(event) => {
                        setRQText(event.target.value)
                        setRQInputChanged(true)
                    }}
                />


                Item
                <input
                    type="text"
                    value={itemText}
                    onFocus={() => {
                        setResultType('Item')
                        setItemInputChanged(false)
                    }}
                    onChange={(event) => {
                        setItemText(event.target.value)
                        setItemInputChanged(true)
                    }}
                />

            </div>

            <div className='Moves'>
                Moves
                {pokemon.Move1}
                {pokemon.Move2}
                {pokemon.Move3}
                {pokemon.Move4}
            </div>

            <div className='ResultHeader'>
                {resultType}
            </div>

            <div className="Results"
                 // onMouseEnter={() => {
                 //     setMouseInResults(true)
                 // }}
                 // onMouseLeave={() => {
                 //     setMouseInResults(false)
                 // }}
            >
                {results.map((val, key) => {
                    return (
                        <div className="listElement">
                            <Button
                                style={{padding: '0px', border: '0px'}}
                                variant="secondary" block
                                onClick={() => {

                                    if (resultType === "Item") {
                                        setItem(val.Name)
                                        setItemText(val.Name)
                                        setItemInputChanged(false)
                                    } else if (resultType === 'Rare Quality') {
                                        setRQ(val.Name)
                                        setRQText(val.Name)
                                        setRQInputChanged(false)
                                    }

                                }}
                            >
                                {val.Name}
                            </Button>
                        </div>
                    )
                })}
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