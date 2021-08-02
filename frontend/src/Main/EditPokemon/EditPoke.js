import './EditPoke.css'
import {Button} from "react-bootstrap";
import React, {useState, useRef, useEffect} from "react";
import itemdata from "../../data/HeldItems.json";
import RQdata from "../../data/RareQualities.json"

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
    const [itemText, setItemText] = useState(pokemon.Item)
    const [rqText, setRQText] = useState(pokemon.RareQuality)

    //Checks if item input has changed in order to tell results to filter or not
    const [itemInputChanged, setItemInputChanged] = useState(false)
    const [RQInputChanged, setRQInputChanged] = useState(false)

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

    //Autosaves any changes when fields that should be saved change.
    useEffect(() => {
        pokemon.Nickname = nickname
        pokemon.Item = item
        pokemon.RareQuality = rq

        props.setPokeToEdit(pokemon)
    }, [nickname, rq, item])

    //This use effect should happen every time the result type changes or text input changes
    useEffect(() => {
        if (resultType === 'Items') {
            setResults(itemResults)
        } else if (resultType === "Rare Qualities") {
            setResults(rqResults)
        } else {
            setResults([])
        }
    }, [resultType, itemText, rqText])

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
                    defaultValue={pokemon.Move1}
                    onChange={(event) => {
                        //setSearchTerm(event.target.value)
                    }}
                />
                <input
                    className='EditInfoElement'
                    id='Move2'
                    type="text"
                    defaultValue={pokemon.Move2}
                    onChange={(event) => {
                        //setSearchTerm(event.target.value)
                    }}
                />
                <input
                    className='EditInfoElement'
                    id='Move3'
                    type="text"
                    defaultValue={pokemon.Move3}
                    onChange={(event) => {
                        //setSearchTerm(event.target.value)
                    }}
                />
                <input
                    className='EditInfoElement'
                    id='Move4'
                    type="text"
                    defaultValue={pokemon.Move4}
                    onChange={(event) => {
                        //setSearchTerm(event.target.value)
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