import './EditPoke.css'
import {Button} from "react-bootstrap";
import React, {useState, useRef, useEffect} from "react";
import itemdata from "../../data/HeldItems.json";
import RQdata from "../../data/RareQualities.json"
import movedata from "../../data/AllMoves.json"

function EditPoke(props) {

    //Make our own, disconnected copy of the pokemon from pokeToEdit
    const pokemonRef = useRef(JSON.parse(JSON.stringify(props.pokeToEdit)))
    let pokemon = pokemonRef.current

    /**
     * The are 2 types of variables we need
     * one for keeping track of the text in the html input, and one for the actual pokemon's attribute
     */

    //Saving the text input fields
    const [nickname, setNickname] = useState(pokemon.Nickname)
    const [item, setItem] = useState(pokemon.Item)
    const [rq, setRQ] = useState(pokemon.RareQuality)
    const [move1, setMove1] = useState(pokemon.Move1)
    const [move2, setMove2] = useState(pokemon.Move2)
    const [move3, setMove3] = useState(pokemon.Move3)
    const [move4, setMove4] = useState(pokemon.Move4)

    const [itemText, setItemText] = useState(pokemon.Item)
    const [rqText, setRQText] = useState(pokemon.RareQuality)
    const [move1Text, setMove1Text] = useState(pokemon.Move1)
    const [move2Text, setMove2Text] = useState(pokemon.Move2)
    const [move3Text, setMove3Text] = useState(pokemon.Move3)
    const [move4Text, setMove4Text] = useState(pokemon.Move4)
    //Keeps track of which of the 4 moves is the most recently selected
    const [activeMove, setActiveMove] = useState(0)

    //Checks if item input has changed in order to tell results to filter or not
    const [itemInputChanged, setItemInputChanged] = useState(false)
    const [RQInputChanged, setRQInputChanged] = useState(false)
    const [moveInputChanged, setMoveInputChanged] = useState(false)

    //Determines which result set to show
    const [resultType, setResultType] = useState('')
    const [results, setResults] = useState([])

    //TODO: Maybe extract out this code into separate file and just make a helper method?
    let type1Src = '/images/types/' + pokemon.Type1.toLowerCase() + '.gif'
    let type2Src = ''
    if (pokemon.Type2 !== "") {
        type2Src = '/images/types/' + pokemon.Type2.toLowerCase() + '.gif'
    }

    //closes the edit popup
    const savePoke = () => {
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

    let moveResults = movedata.filter((val) => {

        if (activeMove === 0) {
            if (move1Text === "" || !moveInputChanged) {
                return val
            } else if (val.Name.toLowerCase().includes(move1Text.toLowerCase())) {
                return val
            }
        } else if (activeMove === 1) {
            if (move2Text === "" || !moveInputChanged) {
                return val
            } else if (val.Name.toLowerCase().includes(move2Text.toLowerCase())) {
                return val
            }
        } else if (activeMove === 2) {
            if (move3Text === "" || !moveInputChanged) {
                return val
            } else if (val.Name.toLowerCase().includes(move3Text.toLowerCase())) {
                return val
            }
        } else {
            if (move4Text === "" || !moveInputChanged) {
                return val
            } else if (val.Name.toLowerCase().includes(move4Text.toLowerCase())) {
                return val
            }
        }



    })



    //Autosaves any changes when fields that should be saved change.
    useEffect(() => {
        pokemon.Nickname = nickname
        pokemon.Item = item
        pokemon.RareQuality = rq
        pokemon.Move1 = move1
        pokemon.Move2 = move2
        pokemon.Move3 = move3
        pokemon.Move4 = move4

        props.setPokeToEdit(pokemon)
    }, [nickname, rq, item, move1, move2, move3, move4])

    //This use effect should happen every time the result type changes or text input changes
    useEffect(() => {
        if (resultType === 'Items') {
            setResults(itemResults)
        } else if (resultType === "Rare Qualities") {
            setResults(rqResults)
        } else if (resultType === "Moves") {
            setResults(moveResults)
        } else {
            setResults([])
        }
    }, [resultType, itemText, rqText, move1Text, move2Text, move3Text, move4Text])

    let portraitSrc = '/images/portraits/' + pokemon.Number.substring(1) + '.png'

    return (
        <div className="EditPage">
            <div className='EditInfo'>

                <div className='EditInfoElement' id='EditImage'>
                    <img id="EditPortrait" src={process.env.PUBLIC_URL + portraitSrc} alt={pokemon.Name}/>

                    <div id='EditTypes'>
                        <img src={process.env.PUBLIC_URL + type1Src} alt={pokemon.Type1}/>
                        <img src={process.env.PUBLIC_URL + type2Src} alt={pokemon.Type2}/>
                    </div>

                </div>

                <div className='EditInfoElement' id='EditPokemon'>
                    Pokemon
                    <input
                        type="text"
                        defaultValue={pokemon.Name}
                        onChange={(event) => {
                            //setSearchTerm(event.target.value)
                        }}
                    />
                </div>

                <div className='EditInfoElement' id='EditNickname'>
                    Nickname
                    <input
                        type="text"
                        value={nickname}
                        maxLength="11"
                        onChange={(event) => {
                            setNickname(event.target.value)
                        }}
                    />
                </div>

                <div className='EditInfoElement' id='EditRQ'>

                    <div className='ItemAndRQLabel'>
                        <img src={process.env.PUBLIC_URL + "images/other/rarequality.png"}
                             alt="Rare Quality" id='RQIcon'/>
                        <div className='ItemAndRQLabelText'>
                            Rare Quality
                        </div>
                    </div>

                    <input
                        type="text"
                        value={rqText}
                        onFocus={() => {
                            setResultType('Rare Qualities')
                            setRQInputChanged(false)
                        }}
                        onChange={(event) => {
                            setRQText(event.target.value)
                            setRQInputChanged(true)
                        }}
                    />
                </div>

                <div className='EditInfoElement' id='EditItem'>

                    <div className='ItemAndRQLabel'>
                        <img src={process.env.PUBLIC_URL + "images/other/scarf.png"}
                             alt="Item" id='ItemIcon'/>
                        <div className='ItemAndRQLabelText'>
                            Item
                        </div>
                    </div>

                    <input
                        type="text"
                        value={itemText}
                        onFocus={() => {
                            setResultType('Items')
                            setItemInputChanged(false)
                        }}
                        onChange={(event) => {
                            setItemText(event.target.value)
                            setItemInputChanged(true)
                        }}
                    />
                </div>

                <div className='EditInfoElement' id='EditMoves'>
                    Moves (WIP)
                </div>

                <input
                    className='EditInfoElement'
                    id='Move1'
                    type="text"
                    value={move1Text}
                    onFocus={() => {
                        setResultType('Moves')
                        setMoveInputChanged(false)
                        setActiveMove(0)
                    }}
                    onChange={(event) => {
                        setMove1Text(event.target.value)
                        setMoveInputChanged(true)
                    }}
                />
                <input
                    className='EditInfoElement'
                    id='Move2'
                    type="text"
                    value={move2Text}
                    onFocus={() => {
                        setResultType('Moves')
                        setMoveInputChanged(false)
                        setActiveMove(1)
                    }}
                    onChange={(event) => {
                        setMove2Text(event.target.value)
                        setMoveInputChanged(true)
                    }}
                />
                <input
                    className='EditInfoElement'
                    id='Move3'
                    type="text"
                    value={move3Text}
                    onFocus={() => {
                        setResultType('Moves')
                        setMoveInputChanged(false)
                        setActiveMove(2)
                    }}
                    onChange={(event) => {
                        setMove3Text(event.target.value)
                        setMoveInputChanged(true)
                    }}
                />
                <input
                    className='EditInfoElement'
                    id='Move4'
                    type="text"
                    value={move4Text}
                    onFocus={() => {
                        setResultType('Moves')
                        setMoveInputChanged(false)
                        setActiveMove(3)
                    }}
                    onChange={(event) => {
                        setMove4Text(event.target.value)
                        setMoveInputChanged(true)
                    }}
                />

                <div className='EditInfoElement' id='EditResultHeader'>
                    {resultType}
                </div>
            </div>

            <div className="EditResults">
                {results.map((val, key) => {
                    return (
                        <div className="listElement">
                            <Button
                                style={{padding: '0px', border: '0px'}}
                                variant="secondary" block
                                onClick={() => {
                                    if (resultType === "Items") {
                                        setItem(val.Name)
                                        setItemText(val.Name)
                                        setItemInputChanged(false)
                                    } else if (resultType === 'Rare Qualities') {
                                        setRQ(val.Name)
                                        setRQText(val.Name)
                                        setRQInputChanged(false)
                                    } else if (resultType === 'Moves') {
                                        if (activeMove === 0) {
                                            setMove1(val.Name)
                                            setMove1Text(val.Name)
                                        } else if (activeMove === 1) {
                                            setMove2(val.Name)
                                            setMove2Text(val.Name)
                                        } else if (activeMove === 2) {
                                            setMove3(val.Name)
                                            setMove3Text(val.Name)
                                        } else {
                                            setMove4(val.Name)
                                            setMove4Text(val.Name)
                                        }
                                        setMoveInputChanged(false)
                                    }

                                }}
                            >
                                {val.Name}
                            </Button>
                        </div>
                    )
                })}
            </div>


            <div className='EditSave'>
                <Button variant="success" className='SaveButton' onClick={savePoke}>
                    Save
                </Button>
            </div>
        </div>
    )


}

export default EditPoke